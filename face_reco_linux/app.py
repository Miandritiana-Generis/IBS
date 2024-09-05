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

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4400"}}, methods=['GET', 'POST', 'OPTIONS'])

data_store = {}

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
known_faces, known_names = load_known_faces("static/images")


def load_known_faces_from_redis():
    r = redis.Redis(host='localhost', port=5555, db=0)
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

# Load known faces and corresponding IDs
known_faces, known_ids = load_known_faces_from_redis()

@socketio.on('frame')
def handle_frame(base64_image):

    # Check if 'id_salle' exists in the session
    if 'id_salle' not in session:
        session['id_salle'] = data_store[0]['salle']
    
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

        # Check if there is a match
        if True in matches:
            first_match_index = matches.index(True)

            # Get the corresponding id_classe_etudiant from Redis
            id_classe_etudiant = known_ids[first_match_index]

            # Fetch prenom using the Spring Boot API
            prenom = fetch_prenom_from_api(id_classe_etudiant)

            # If prenom is found, set it as the name, otherwise use id_classe_etudiant
            if prenom:
                name = prenom
            else:
                name = id_classe_etudiant

            print(f"Match found: {prenom} for ID: {id_classe_etudiant}")

        # Get the current time when the face is detected
        detection_time = datetime.datetime.now().strftime("%H:%M:%S")

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

    # Check if 'id_salle' exists in the session
    if 'id_salle' not in session:
        session['id_salle'] = data_store[0]['salle']

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

    # Check if 'id_salle' exists in the session
    if 'id_salle' not in session:
        session['id_salle'] = data_store[0]['salle']
        print(session.get('id_salle', 'Tsy mbola misy'))
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


# def present(idEdt, idClasseEtudiant, tempsArriver)    

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)



