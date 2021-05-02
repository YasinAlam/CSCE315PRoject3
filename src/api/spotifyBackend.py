import requests
from flask import Blueprint, jsonify
import json
spotify = Blueprint("spotify", __name__)

#*************************************AUTHORIZATION FOR SPOTIFY API*************************************#
#Setting- up Application Details
CLIENT_ID = '1b60decc28894577a21fbc138bfd5fd8'
CLIENT_SECRET = 'aca051263ed0473bb4e83a7e08e5e990'
scopes = 'user-read-private user-read-email'

AUTH_URL = 'https://accounts.spotify.com/api/token'

#POST
auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
})

#Convert the response to JSON
auth_response_data = auth_response.json()

#Save the access token
access_token = auth_response_data['access_token']

#Create Authorization Header
headers = {
    'Authorization': 'Bearer {token}'.format(token=access_token)
}
#Set Base URL of all Spotify API endpoints
BASE_URL = 'https://api.spotify.com/v1/'

#Set the name of the third Column
name = "Top Songs of the Month:"

#*************************************Get all Artists with provided name*************************************#
@spotify.route('/api/spotify/search/<artistInput>')
def getAllArtistsWithName(artistInput = None):
    #Inputted Artist name
    # artistInput = 'Drake'.lower()

    #GET request with proper header for all artists with provided name
    result = requests.get(BASE_URL + 'search/', headers=headers, params={'q' : artistInput,'type' : 'artist'})
    result = result.json()
    if('error' in result):
        updateHeaders()
        result = requests.get(BASE_URL + 'search/', headers=headers, params={'q': artistInput, 'type': 'artist'})
        result = result.json()

    #Parse result and get artist Name, ID, Genres, and Image
    artistNameArray = []
    artistIDArray = []
    artistImageArray = []
    artistGenreArray = []
    for i in result['artists']['items']:
        if(len(i['images'])!=0):
            artistNameArray.append(i['name'])
            artistIDArray.append(i['id'])
            artistImageArray.append(i['images'][0]["url"])
            if(len(i['genres'])!=0):
                artistGenreArray.append(i['genres'])
            else:
                artistGenreArray.append(None)
        else:
            artistNameArray.append(i['name'])
            artistIDArray.append(i['id'])
            artistImageArray.append(None)
            if (len(i['genres']) != 0):
                artistGenreArray.append(i['genres'])
            else:
                artistGenreArray.append(None)

    # print(artistNameArray)
    # print(artistIDArray)
    # print(artistImageArray)
    # print(artistGenreArray)
    result = {"artistNameArray" : artistNameArray, "artistIDArray" : artistIDArray,
                    "artistImageArray" : artistImageArray, "artistGenreArray" : artistGenreArray}

    artistID = artistIDArray[0]
    #GET request with proper header to find all albums by chosen artist
    result = requests.get(BASE_URL + 'artists/' + artistID + '/albums', headers=headers)
    result = result.json()

    if('error' in result):
        updateHeaders()
        result = requests.get(BASE_URL + 'artists/' + artistID + '/albums', headers=headers)
        result = result.json()

    #Parse result and get album Name and ID
    albumNameArray = []
    albumIDArray = []
    for i in result['items']:
        albumNameArray.append(i['name'])
        albumIDArray.append(i['id'])

    # print(albumNameArray)
    # print(albumIDArray)


    #*************************Get all Tracks related to all Albums related to chosen Artist*************************#
    #Convert Album ID Array to a string seperated by commas to be passed as a paramater below
    seperator = ','
    albumIDArrayToStr = seperator.join(albumIDArray)
    # print(albumIDArrayToStr)

    #GET request with proper header to find all songs given albums
    result = requests.get(BASE_URL + 'albums/', headers=headers, params={'ids':albumIDArrayToStr})
    result = result.json()

    if ('error' in result):
        updateHeaders()
        result = requests.get(BASE_URL + 'albums/', headers=headers, params={'ids': albumIDArrayToStr})
        result = result.json()

    #Parse result and get track Names and ID's
    trackNameArray = []
    trackIDArray = []
    for i in result["albums"]:
        for j in i["tracks"]["items"]:
            trackNameArray.append(j["name"])
            trackIDArray.append(j["id"])

    # print(trackNameArray)
    # print(trackIDArray)


    #*************************Get Popularity score for each track*************************#
    #Convert track ID Array to a multiple TrackID string arrays seperated by commas to be passed as a paramater below
    seperator = ','
    combineTrackIDArray = []
    count = 0
    for i in range(0,len(trackIDArray),40):
        tempTrackIDArray = trackIDArray[i:i+40]
        combineTrackIDArray.append(seperator.join(tempTrackIDArray))

    # for i in combineTrackIDArray:
    #     print(i)

    #GET request with proper header to find all songs given albums
    trackResult = []
    for i in range(len(combineTrackIDArray)):
        result = requests.get(BASE_URL + 'tracks/', headers=headers, params={'ids':combineTrackIDArray[i]})
        trackResult.append(result.json())

        if ('error' in result):
            updateHeaders()
            result = requests.get(BASE_URL + 'tracks/', headers=headers, params={'ids': combineTrackIDArray[i]})
            trackResult.append(result.json())

    #Parse result and get popularity of each track
    trackPopularityArray = []
    trackLength = []
    trackReleaseDate = []
    for i in trackResult:
        for j in i["tracks"]:
            trackPopularityArray.append(j["popularity"])
            minutes = int((j["duration_ms"] /(1000*60))%60)
            seconds = int((j["duration_ms"] / 1000) % 60)
            if(len(str(seconds))==1):
                seconds = '0' + str(seconds)
            trackLength.append(str(minutes)+":"+str(seconds))
            trackReleaseDate.append(j["album"]["release_date"])

    # print(trackPopularityArray)

    # for i in range(len(trackNameArray)):
    #     print(("Track Name: " + trackNameArray[i]).ljust(60),("\tPopularity Score: " + str(trackPopularityArray[i])).center(0),
    #           ("\tArtist: " + chosenArtistName).rjust(0))

    sortedTrackList = [trackNameArray for (trackPopularityArray, trackNameArray) in sorted(zip(
                        trackPopularityArray, trackNameArray), key=lambda pair: pair[0],reverse = True)]
    sortedTrackLength = [trackLength for (trackPopularityArray, trackLength) in sorted(zip(
                        trackPopularityArray, trackLength), key=lambda pair: pair[0],reverse = True)]
    sortedTrackReleaseDate = [trackReleaseDate for (trackPopularityArray, trackReleaseDate) in sorted(zip(
                        trackPopularityArray, trackReleaseDate), key=lambda pair: pair[0],reverse = True)]
    sortedpopularityList = sorted(trackPopularityArray,reverse=True)
    artistPopularity = int(sum(sortedpopularityList)/len(sortedpopularityList))

    result = []
    for i in range(len(sortedTrackReleaseDate)):
        result.append({"artistName" : artistNameArray[0], "artistImage" : artistImageArray[0],
                       "artistPopularity" : artistPopularity, "artistGenre" :artistGenreArray[0],
              "trackNameArray" : sortedTrackList[i], "trackPopularityArray" : sortedpopularityList[i],
              "trackLength" : sortedTrackLength[i], "trackReleaseDate" : sortedTrackReleaseDate[i], "n" : i+1})
    writeToFile(result,"allTracks")
    return jsonify(result)


#*************************************Get all Artists with provided name*************************************#
@spotify.route('/api/spotify/topresults')
def getTopCharts():
    # GET request with proper header for all playlists with provided name
    result = requests.get(BASE_URL + 'search/', headers=headers, params={'q': "Top 50 - USA", 'type': 'playlist'})
    result = result.json()

    if ('error' in result):
        updateHeaders()
        result = requests.get(BASE_URL + 'search/', headers=headers, params={'q': "Top 50 - USA", 'type': 'playlist'})
        result = result.json()

    writeToFile(result,"ignore")
    playlistID = result['playlists']['items'][0]['id']

    # GET request with proper header for all playlists with provided name
    result = requests.get(BASE_URL + 'playlists/'+playlistID, headers=headers)
    result = result.json()

    if ('error' in result):
        updateHeaders()
        result = requests.get(BASE_URL + 'playlists/' + playlistID, headers=headers)
        result = result.json()

    #Get top 5 results from playlist
    artistNames = []
    albumNames = []
    albumImages = []
    songNames= []
    songPopularities = []
    count = 0
    for i in result['tracks']['items']:
        if(count == 5):
            break
        artistNames.append(i['track']['artists'][0]['name'])
        albumNames.append("Album: " + i['track']['album']['name'])
        albumImages.append(i['track']['album']['images'][0]['url'])
        songNames.append(i['track']['name'])
        songPopularities.append(i['track']['popularity'])
        count+=1

    result = []
    for i in range(len(artistNames)):
        result.append({"artistName": artistNames[i], "albumName": albumNames[i], "albumImage": albumImages[i],
         "songName": songNames[i], "songPopularity": songPopularities[i]})

    writeToFile(result,"TopCharts")

    global name
    name = "Top Songs of the Month:"
    updateName()

    return jsonify()

def writeToFile(result,name):
    # print(result,"hello")
    name = "src/data/"+name+".json"
    with open(name, 'w') as outfile:
        json.dump(result, outfile)


@spotify.route('/api/spotify/select')
def selectArtist():
    oldData = json.load(open("src/data/allTracks.json"))

    newData = []
    genres = "Genres: "
    for i in oldData[0]["artistGenre"]:
        genres+=(i + ', ')
    newData.append({"artistName" : oldData[0]["artistName"], "songName" : oldData[0]["artistName"],
                    "songPopularity" : oldData[0]["artistPopularity"], "albumImage" : oldData[0]["artistImage"],
                    "albumName": genres.title()})


    with open('src/data/TopCharts.json', 'w') as newFile:
        json.dump(newData, newFile)

    global name
    name = "Search Results:"
    updateName()

    return(jsonify({'Test' : 'Test'}))


def updateName():
    global name
    result = {"name" : name}
    writeToFile(result,"thirdTitle")

def updateHeaders():
    global headers
    global access_token
    global CLIENT_ID
    global CLIENT_SECRET
    global scopes
    global AUTH_URL

    # POST
    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    })

    # Convert the response to JSON
    auth_response_data = auth_response.json()

    # Save the access token
    access_token = auth_response_data['access_token']

    # Create Authorization Header
    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }