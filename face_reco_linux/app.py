import datetime
from flask import Flask, jsonify, render_template, request, session, redirect, flash
from flask_socketio import SocketIO, emit
import face_recognition
import cv2
import numpy as np
import io
import base64
from PIL import Image, UnidentifiedImageError
import os
from flask_cors import CORS
import redis
import requests
import os
from redis.exceptions import ConnectionError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4400"}}, methods=['GET', 'POST', 'OPTIONS'])

data_store = {}
consecutive_matches = 0

def check_redis_connection():
    try:
        r = redis.Redis(host='localhost', port=6379, db=0)
        # Attempt to ping Redis to check connectivity
        r.ping()
        return True
    except ConnectionError:
        return False
    
# Load known faces
def load_known_faces(folder_path):
    known_faces = []
    known_names = []

    for file_name in os.listdir(folder_path):
        if file_name.endswith(".jpg") or file_name.endswith(".png"):
            image_path = os.path.join(folder_path, file_name)
            image = face_recognition.load_image_file(image_path)
            encodings = face_recognition.face_encodings(image)
            if encodings:
                known_faces.append(encodings[0])
                known_names.append(os.path.splitext(file_name)[0])
            else:
                print(f"Tsy misy tarehy : {file_name}")


    return known_faces, known_names

# Load known faces
# known_faces, known_names = load_known_faces("static/images")


def load_known_faces_from_redis():
    if not check_redis_connection():
        print("Redis tsy mety made.")
        return [], []
    
    try:
        r = redis.Redis(host='localhost', port=6379, db=0)
        known_faces = []
        known_ids = []

        # Get all keys from Redis
        keys = r.keys()

        for key in keys:
            # Fetch image data from Redis
            image_data = r.get(key)

            # Convert binary image data to a format that face_recognition can process
            image = Image.open(io.BytesIO(image_data))
            image_np = np.array(image)

            # Get face encodings
            encodings = face_recognition.face_encodings(image_np)
            
            if encodings:
                known_faces.append(encodings[0])
                known_ids.append(key.decode('utf-8'))  # Store id_classe_etudiant as a string
            else:
                print(f"No face found in image for ID: {key.decode('utf-8')}")

        return known_faces, known_ids
    
    except ConnectionError as e:
        print(f"Tsy afaka ni connecte @ Redis: {e}")
        return [], []

# Load known faces and corresponding IDs
known_faces, known_ids = load_known_faces_from_redis()

@socketio.on('frame')
def handle_frame(base64_image):

    dropDataRedis(data_store)

    # Check if both 'id_salle' and 'id_edt' exist in the session
    if 'id_salle' not in session or 'id_edt' not in session:
        # If either doesn't exist, initialize both from data_store
        session['id_salle'] = data_store[0]['salle']
        session['id_edt'] = data_store[0]['id_edt']
    
    # Decode the base64 image
    image_data = base64.b64decode(base64_image.split(',')[1])
    try:
        image = Image.open(io.BytesIO(image_data))
    except UnidentifiedImageError:
        print("Misy error le image, corrupted na invalide @ face reco.")
        return

    open_cv_image = np.array(image)
    open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB

    # Find all face locations and encodings in the current frame
    face_locations = face_recognition.face_locations(open_cv_image)
    face_encodings = face_recognition.face_encodings(open_cv_image, face_locations)

    detected_names = []

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        matches = face_recognition.compare_faces(known_faces, face_encoding)
        name = "Inconnue"

        # Process matches for only the first detected face (or a specific face)
        if matches and True in matches:
            first_match_index = matches.index(True)
            id_classe_etudiant = known_ids[first_match_index]

            # Update consecutive_matches
            consecutive_matches += 1

            # Check if we have reached 5 consecutive matches
            if consecutive_matches >= 5:
                # Fetch prenom using the Spring Boot API
                prenom = fetch_prenom_from_api(id_classe_etudiant)
                name = prenom if prenom else id_classe_etudiant

                print(f"Match found: {prenom} for ID: {id_classe_etudiant}")

                # Get the current time when the face is detected
                detection_time = datetime.datetime.now().strftime("%H:%M:%S")

                # Call the present function here
                present(session['id_edt'], id_classe_etudiant, detection_time)

                # Reset counter after calling present function
                consecutive_matches = 0

        detected_names.append(name)

        # Draw a rectangle around the face and label it
        cv2.rectangle(open_cv_image, (left, top), (right, bottom), (0, 255, 0), 2)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(open_cv_image, name, (left + 6, bottom - 6), font, 0.5, (0, 0, 0), 1)

    # Encode frame as JPEG
    _, buffer = cv2.imencode('.jpg', open_cv_image)
    frame = buffer.tobytes()
    base64_frame = base64.b64encode(frame).decode('utf-8')
    response = {
        'image': 'data:image/jpeg;base64,' + base64_frame,
        'names': detected_names
    }

    emit('update', response)


@app.route('/api/fiche-presence', methods=['POST'])
def fiche_presence():

    global data_store
    data = request.get_json()  # Get the JSON data sent from Angular
    print(data)  # For debugging, print the received data
    data_store = data

    # Check if both 'id_salle' and 'id_edt' exist in the session
    if 'id_salle' not in session or 'id_edt' not in session:
        # If either doesn't exist, initialize both from data_store
        session['id_salle'] = data_store[0]['salle']
        session['id_edt'] = data_store[0]['id_edt']

    addOnRedis(data_store)

    return jsonify({"message": "Data received successfully"}), 200



@app.route('/api/set_id_salle', methods=['POST'])
def set_id_salle():
    id_salle = request.get_json()
    if id_salle is not None:
        session['id_salle'] = id_salle
        return {'message': 'Session variable set!', 'id_salle': id_salle}, 200
    else:
        return {'message': 'No id_salle provided'}, 400


def fetch_prenom_from_api(id_classe_etudiant):
    api_url = f"http://localhost:8082/etudiants/prenom?idClasseEtudiant={id_classe_etudiant}"
    
    try:
        response = requests.get(api_url, timeout=5)  # Timeout to avoid hanging
        response.raise_for_status()  # Raise an error for 4xx/5xx responses
        
        # Parse the JSON response
        data = response.json()
        
        # Return the 'prenom' if it exists, otherwise return 'Inconnue'
        return data.get('prenom', 'Inconnue')
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching prenom for id_classe_etudiant {id_classe_etudiant}: {e}")
        return 'Inconnue'


@app.route('/get_id_salle')
def get_session():
    id_salle = session.get('id_salle', 'Tsy mbola misy')
    return f'Tafiditra, {id_salle}!'


@app.route('/')
def index():

    # Check if both 'id_salle' and 'id_edt' exist in the session
    if 'id_salle' not in session or 'id_edt' not in session:
        # If either doesn't exist, initialize both from data_store
        session['id_salle'] = data_store[0]['salle']
        session['id_edt'] = data_store[0]['id_edt']

        print(session.get('id_salle', 'Tsy mbola misy id salle'))
        print(session.get('id_edt', 'Tsy mbola misy id edt'))
        # return jsonify({'redirect': True, 'message': 'Salle non designe'}), 403
        # return redirect('http://localhost:4400/programme')
    
    return render_template('index.html', listeFichePresence=data_store)
    
def addOnRedis(data_store):
    try:
        # Connect to Redis
        r = redis.Redis(host='localhost', port=6379, db=0)  # Ensure the port matches your Redis configuration

        for item in data_store:
            id_classe_etudiant = item.get('id_classe_etudiant')
            image_path = item.get('imagePath')  # Example: \\192.168.1.8\bevazaha$\Photo9353.jpg

            if not id_classe_etudiant or not image_path:
                print("Missing 'id_classe_etudiant' or 'imagePath' in data_store item.")
                continue

            # Convert network path for Windows
            network_path = image_path.replace('/', '\\')

            if os.path.exists(network_path):
                try:
                    # Read the image file in binary mode
                    with open(network_path, 'rb') as image_file:
                        image_data = image_file.read()

                    # Store image content in Redis
                    r.set(id_classe_etudiant, image_data)
                    print(f"Stored image data for ID: {id_classe_etudiant}")
                except IOError as e:
                    print(f"Tsy voavaky le sary file {network_path}: {e}")
            else:
                print(f"FTsy hita le sary file: {network_path}")

        print(f"NETY TSARA NY REDIS")

    except redis.RedisError as e:
        print(f"Redis tsy mety: {e}")


def present(idEdt, idClasseEtudiant, tempsArriver):
    api_url = "http://localhost:8082/presences"
    
    # Data to be sent in the POST request
    payload = {
        "idEdt": idEdt,
        "idClasseEtudiant": idClasseEtudiant,
        "tempsArriver": tempsArriver
    }

    try:
        # Send the POST request with the JSON data
        response = requests.post(api_url, json=payload)
        
        if response.status_code == 200:
            return response.json()  # Return the response data if needed
        else:
            print(f"Error: Received status code {response.status_code}")
            return None

    except requests.RequestException as e:
        print(f"An error occurred: {e}")
        return None

def dropDataRedis(data_store):
    # Connect to Redis
    r = redis.Redis(host='localhost', port=6379, db=0)
    
    # Convert `data_store['date']` and `data_store['fin']` to datetime objects
    data_date = datetime.datetime.strptime(data_store[0]['date'], "%Y-%m-%d")
    data_fin = datetime.datetime.strptime(data_store[0]['fin'], "%H:%M:%S")
    
    # Get the current date and time
    current_date_time = datetime.datetime.now()
    
    # Compare if both `data_store['date']` and `data_store['fin']` are greater than current time
    if data_date > current_date_time and data_fin > current_date_time:
        # If true, flush all data from Redis
        r.flushdb()  # This will delete all keys from the current Redis database
        print("All Redis data dropped (nofafana).")
    else:
        print("No data dropped Any Redis, mbola tsy depasse ny date fin edt")
    

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)



