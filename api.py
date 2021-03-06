import time
import sys, os
sys.path.append(os.path.abspath('src/api'))
from flask import Flask, jsonify
from bandsintownBackend import bandsintown
from location import location
from movies import movieglu
from spotifyBackend import spotify

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.register_blueprint(bandsintown, url_prefix = "")
app.register_blueprint(location, url_prefix = "")
app.register_blueprint(movieglu, url_prefix = "")
app.register_blueprint(spotify, url_prefix = "")

@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')

@app.route('/favicon.ico', methods=["GET"])
def favicon():
    return app.send_static_file('favicon.ico')


@app.route('/api/hidecss')
def resetCSS():
    oldData = open("src/original.css" , 'r')
    lines = oldData.readlines()
    # lines = lines[:-3]
    oldData.close()

    with open('src/App.css', 'w') as newFile:
        for item in lines:
            newFile.write("%s" % item)

    return (jsonify({'Test': 'Test'}))

@app.route('/api/seecss')
def toggleCSS():
    oldData = open("src/new.css", 'r')
    lines = oldData.readlines()
    oldData.close()

    with open('src/App.css', 'w') as newFile:
        for item in lines:
            newFile.write("%s" % item)

    return (jsonify({'Test': 'Test'}))