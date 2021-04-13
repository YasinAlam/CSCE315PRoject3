import time
from flask import Flask, jsonify
from bandsintownBackend import bandsintown
# from location import location
from movies import movieglu
from spotifyBackend import spotify

app = Flask(__name__)
app.register_blueprint(bandsintown, url_prefix = "")
# app.register_blueprint(location, url_prefix = "")
app.register_blueprint(movieglu, url_prefix = "")
app.register_blueprint(spotify, url_prefix = "")

@app.route('/test')
def get_current_time():
    return jsonify({'time': time.time()})

