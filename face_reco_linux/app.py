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
import subprocess

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:4400", "http://127.0.0.1:5000"]}}, methods=['GET', 'POST', 'OPTIONS'])

# Read Redis configuration from environment variables
redis_host = os.getenv('REDIS_HOST', 'localhost')
redis_port = int(os.getenv('REDIS_PORT', 6379))

data_store = {}
consecutive_matches = 0

is_picture_loaded = False
known_faces = []
known_ids = []

# Initialize Redis client
try:
    redis_client = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)
except redis.ConnectionError:
    print("Could not connect to Redis")


#fanombohana...................................................................
#cree connection amn Redis
def check_redis_connection():
    try:
        r = redis.Redis(host='redis', port=6379, db=0)  # Use 'redis' as the hostname
        r.ping()
        return r
    except redis.ConnectionError:
        return None
    

#atsoin angular rhf adefa le data json
@app.route('/api/fiche-presence', methods=['POST'])
def fiche_presence():
    dropDataRedis()
    # known_faces, known_ids = load_known_faces_from_redis()  # Reload faces after adding new data to Redis
    global data_store
    data = request.get_json()  # Get the JSON data sent from Angular
    print(data)  # For debugging, print the received data
    data_store = data

    #mapiditra data
    addOnRedis(data_store)

    # Check if both 'id_salle' and 'id_edt' exist in the session
    if 'id_salle' not in session or 'id_edt' not in session:
        # If either doesn't exist, initialize both from data_store
        session['id_salle'] = data_store[0]['salle']
        session['id_edt'] = data_store[0]['id_edt']

    return jsonify({"message": "Data received successfully"}), 200


#atsoin angular ko adefasa id salle, tsy de ilaina be satria efa azo id salle amle le data json
@app.route('/api/set_id_salle', methods=['POST'])
def set_id_salle():
    id_salle = request.get_json()
    if id_salle is not None:
        session['id_salle'] = id_salle
        return {'message': 'Session variable set!', 'id_salle': id_salle}, 200
    else:
        return {'message': 'No id_salle provided'}, 400


def fetch_prenom_from_api(id_classe_etudiant):
    api_url = f"http://host.docker.internal:8082/etudiants/prenom?idClasseEtudiant={id_classe_etudiant}"

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
    
#presence (nalaina tany amn spring boot via ws)
def present(idEdt, idClasseEtudiant, tempsArriver):
    api_url = "http://host.docker.internal:8082/presences"
    
    # Data to be sent in the POST request
    payload = {
        "idEdt": idEdt,
        "idClasseEtudiant": idClasseEtudiant,
        "tempsArriver": tempsArriver
    }

    print(payload)

    try:
        # Send the POST request with the JSON data
        response = requests.post(api_url, json=payload)
        
        if response.status_code == 200:
            return response.json()  # Return the response data if needed
        else:
            print(f">>presence eto : Error: Received status code {response.status_code}")
            return None

    except requests.RequestException as e:
        print(f"Misy error occurred: {e}")
        return None
    

# Function to add data to Redis
def addOnRedis(data_store):
    try:
        # Connect to Redis
        r = check_redis_connection()  # Ensure the port matches your Redis configuration

        if not r:
            print("Redis tsy mety.")
            return

        for item in data_store:
            id_classe_etudiant = item.get('id_classe_etudiant')
            image_path = item.get('imagePath')  # Example: \\192.168.1.8\bevazaha$\Photo9353.jpg

            if not id_classe_etudiant or not image_path:
                print("Tsy voaray 'id_classe_etudiant' or 'imagePath' in data_store item.")
                continue

            # Convert network path for Windows
            network_path = image_path.replace('\\', '/')
            print(image_path)

            try:
                print(network_path)
                response = requests.get(network_path)

                if response.status_code == 200:
                    image_data = response.content  # Image data in binary form

                    # Store image content in Redis
                    r.set(id_classe_etudiant, image_data)
                    print(f"Stored image data for ID: {id_classe_etudiant}")

                    # Verification: Check if the data is stored in Redis
                    if r.exists(id_classe_etudiant):
                        stored_data = r.get(id_classe_etudiant)
                        if stored_data == image_data:
                            print(f"Verification successful: Data for ID {id_classe_etudiant} is correctly stored in Redis.")
                        else:
                            print(f"Verification failed: Data mismatch for ID {id_classe_etudiant}.")
                    else:
                        print(f"Verification failed: No data found in Redis for ID {id_classe_etudiant}.")
                else:
                    print(f"Failed to fetch the image. HTTP Status Code: {response.status_code}")
                    
            except requests.RequestException as e:
                print(f"Tsy voavaky le sary avy amin'ny URL {network_path}: {e}")

        print("NETY TSARA NY REDIS")

        # Load known faces
        load_known_faces_from_redis()


    except redis.RedisError as e:
        print(f"Redis tsy mety: {e}")


#mamafa anaty redis
def dropDataRedis():
    # Connect to Redis
    r = check_redis_connection()
    r.flushdb()
    print("vider na lou redis")


#mamafa data store rhf miverina any fichePresence
@app.route('/api/drop-data-store', methods=['POST'])
def drop_data_store():
    global data_store
    data_store = []  # Clear the data_store
    print(f"Data store after reset: {data_store}")  # Add this line to verify it's empty
    print("data redis voafafa tsara daholoooooooooooooooooooooo")
    return jsonify({"message": "Data store dropped successfully"}), 200



#eto amzay reconnaissance facial...................................
# Initialize global counter
consecutive_matches = 0

def load_known_faces_from_redis():
    global known_faces
    global known_ids

    print("Connecting to Redis...")
    r = check_redis_connection()
    if not r:
        print("Unable to connect to Redis.")
        return [], []
    else:
        print("Connected to Redis.")



    # Get all keys from Redis
    keys = r.keys()
    print(f"Keys from Redis: {keys}")

    for key in keys:
        print(f"Key: {key}, Length of image data: {len(r.get(key))}")
        # Fetch image data from Redis
        image_data = r.get(key)
        if image_data is None:
            print(f"No image data for key: {key}")
            continue

        # Convert binary image data to a format that face_recognition can process
        image = Image.open(io.BytesIO(image_data))
        image_np = np.array(image.convert("RGB"))

        # Get face encodings
        encodings = face_recognition.face_encodings(image_np)
        
        if encodings:
            known_faces.append(encodings[0])
            known_ids.append(key.decode('utf-8'))  # Store id_classe_etudiant as a string
        else:
            print(f"No face found in image for ID: {key.decode('utf-8')}")
        print(f"Known faces loaded: {len(known_faces)}")
        print(f"Known IDs loaded: {len(known_ids)}")


# Sharpen the image to improve details
def sharpen_image(image):
    kernel = np.array([[0, -1, 0], [-1, 5,-1], [0, -1, 0]])
    sharpened = cv2.filter2D(image, -1, kernel)
    return sharpened

# Denoise the image to reduce noise in low-quality images
def denoise_image(image):
    return cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)

def get_madagascar_time():
    # Get the current UTC time
    utc_time = datetime.datetime.utcnow()

    # Manually adjust for Madagascar's timezone (+03)
    madagascar_time = utc_time + datetime.timedelta(hours=3)

    # Format the time as HH:MM:SS
    return madagascar_time.strftime("%H:%M:%S")



@socketio.on('frame')
def handle_frame(base64_image):

    global known_faces
    global known_ids
    global consecutive_matches
    
    # Decode the base64 image
    image_data = base64.b64decode(base64_image.split(',')[1])
    try:
        image = Image.open(io.BytesIO(image_data))
    except UnidentifiedImageError:
        print("Error with image, possibly corrupted or invalid.")
        return

    open_cv_image = np.array(image)
    open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB

    # Step 1: Denoise the image
    open_cv_image = denoise_image(open_cv_image)

    # Step 2: Sharpen the image
    open_cv_image = sharpen_image(open_cv_image)

    # Find all face locations and encodings in the current frame
    face_locations = face_recognition.face_locations(open_cv_image)
    face_encodings = face_recognition.face_encodings(open_cv_image, face_locations)

    detected_names = []

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        matches = face_recognition.compare_faces(known_faces, face_encoding)
        name = "Inconnue"
        
        # Check face match confidence
        face_distances = face_recognition.face_distance(known_faces, face_encoding)
        if len(face_distances) > 0:
            best_match_index = np.argmin(face_distances)
            print(f"bessssssssssssssssssst{face_distances}")
        else:
            # Handle the case where no faces were recognized
            best_match_index = None  # or any appropriate fallback value or logic
            
        if best_match_index is not None and len(matches) > 0 and matches[best_match_index]:
            if matches[best_match_index] and face_distances[best_match_index] < 0.6:  # Adjust threshold as needed
                id_classe_etudiant = known_ids[best_match_index]
                prenom = fetch_prenom_from_api(id_classe_etudiant)
                name = prenom if prenom else id_classe_etudiant

                print(f"Match found: {prenom} for ID: {id_classe_etudiant}")

                # Increase consecutive match counter
                consecutive_matches += 1
                
                # Check if we have reached 5 consecutive matches
                if consecutive_matches >= 25:

                    # Get the current time when the face is detected
                    detection_time = get_madagascar_time()
                    
                    # Call the present function
                    present(session['id_edt'], id_classe_etudiant, detection_time)
                    
                    # Reset counter after calling present function
                    consecutive_matches = 0

            else:
                # Reset counter if no match
                consecutive_matches = 0
        else:
            print("No valid match index found.")

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



#makany amn index
@app.route('/')
def index():

    # Check if both 'id_salle' and 'id_edt' exist in the session
    if 'id_salle' not in session or 'id_edt' not in session:
        # If either doesn't exist, initialize both from data_store
        session['id_salle'] = data_store[0]['salle']
        session['id_edt'] = data_store[0]['id_edt']

        # print(session.get('id_salle', 'Tsy mbola misy id salle'))
        # print(session.get('id_edt', 'Tsy mbola misy id edt'))
        # return jsonify({'redirect': True, 'message': 'Salle non designe'}), 403
        # return redirect('http://localhost:4400/programme')
    
    return render_template('index.html', listeFichePresence=data_store)



if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True, host='0.0.0.0')

