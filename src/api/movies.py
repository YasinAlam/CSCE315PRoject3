import requests
import datetime
from flask import Blueprint, jsonify
import json
movieglu = Blueprint("movieglu", __name__)

#*************************************AUTHORIZATION FOR Bandsintown API*************************************#
#Setting-up Application Details
APP_ID = '4065c748e821bd17f026e5340fb780d6'


#Create Authorization Header
time = datetime.datetime.now()
ISO_8601_time = time.isoformat()
#Sandbox Environment
headers = {
    'client': 'TEXA_1',
    'x-api-key' : 'i4QRxvFIAR1fnfe2FGocd871ukDF3V6dahbxg6PG',
    'authorization' : 'Basic VEVYQV8xX1hYOlZLOTlHVHpyQWtwdA==',
    'territory' : 'XX',
    'api-version' :	'v200',
    'geolocation' :	'-22.0;14.0',
    'device-datetime' : ISO_8601_time
}

# Normal Environment
# headers = {
#     'client': 'TEXA_1',
#     'x-api-key' : 'UI70SEkfbj7bKw0SUk3DiaAwk2PmsS8vaGlPYexW',
#     'authorization' : 'Basic VEVYQV8xOkxDNEZNRUpHc1Q4WQ==',
#     'territory' : 'US',
#     'api-version' :	'v200',
#     'geolocation' :	'',
#     'device-datetime' : ISO_8601_time
# }

#Base URL
BASE_URL = "https://api-gate2.movieglu.com/"


#*************************************Get all Movies Playing right now*************************************#
@movieglu.route('/api/movieglu/nowplaying')
def nowPlaying():
    #GET request with proper header for all artists with provided name
    result = requests.get(BASE_URL + 'filmsNowShowing/', headers=headers, params={'n' : 25})
    result = result.json()

    filmSynop = []
    filmName = []
    releaseDate = []
    filmRating = []
    filmID = []
    movieRating = []
    movieRuntime = []
    movieGenre = []
    movieImage = []

    for i in result["films"]:
        filmSynop.append(i["synopsis_long"])
        filmName.append(i["film_name"])
        releaseDate.append(i["release_dates"][0]["release_date"])
        filmRating.append(i["age_rating"][0]["rating"])
        filmID.append(i["film_id"])

    for i in filmID:
        result = requests.get(BASE_URL + 'filmDetails/', headers=headers, params={'n': 25, "film_id": i})
        result = result.json()

        movieRating.append(str(result["review_stars"])+'/5')
        movieRuntime.append(result["duration_mins"])
        movieGenre.append(result["genres"][0]["genre_name"])

        result = requests.get(BASE_URL + 'images/', headers=headers, params={"film_id": i})
        try:
            result = result.json()
            movieImage.append(result["poster"]["1"]["medium"]["film_image"])
        except:
            movieImage.append('https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/'
                              '000/105/089/datas/original.jpg')


    # print(filmSynop)
    # print(filmName)
    # print(releaseDate)
    # print(filmRating)
    # print(filmID)

    result = []
    for i in range(len(movieImage)):
        result.append({"filmSynop" : filmSynop[i], "filmName" : filmName[i], "releaseDate" : releaseDate[i],
                       "filmRating" : filmRating[i], "filmID" :filmID[i], "movieRating" : movieRating[i],
                       "movieGenre" : movieGenre[i], "movieRuntime" : movieRuntime[i], "movieImage" : movieImage[i]})
    writeToFile(result, "nowPlaying")
    return jsonify()

# *************************************Get all Cinemas nearby*************************************#
@movieglu.route('/api/movieglu/cinemas/<queryDate>')
def nearbyCinemas(queryDate):
    #GET request with proper header for all cinemas in your area
    result = requests.get(BASE_URL + 'cinemasNearby/', headers=headers, params={'n' : 10})
    result = result.json()

    #Parse result and get Cinema ID's, Distance, Names, Logos, and addresses
    cinemaIDs = []
    cinemaDistances = []
    cinemaNames = []
    cinemaLogos = []
    cinemaAddresses = []
    cinemaCities = []
    cinemaStates = []

    for i in result["cinemas"]:
        cinemaIDs.append(i["cinema_id"])
        cinemaNames.append(i["cinema_name"])
        cinemaDistances.append(int(i["distance"]))
        cinemaLogos.append(i["logo_url"])
        cinemaAddresses.append(i["address"])
        cinemaCities.append(i["city"])
        cinemaStates.append(i["state"])

    cinemaResult = []
    for i in range(len(cinemaStates)):
        cinemaResult.append({"cinemaIDs" : cinemaIDs[i], "cinemaDistances" : cinemaDistances[i],
                             "cinemaNames" : cinemaNames[i], "cinemaLogos" : cinemaLogos[i],
                             "cinemaAddresses" : cinemaAddresses[i], "cinemaCities" : cinemaCities[i],
                             "cinemaStates" : cinemaStates[i]})

    writeToFile(cinemaResult,"nearbyCinemas")

#*************************************Get all showtimes for provided cinemas*************************************#
    filmsInCinemas = {}
    queryDate = '2021-05-01' #Comment out when not using Sandbox
    #Goes through every cinema and adds all information related to that cinema to an array
    for cinema in cinemaIDs:
        #GET request with proper header for showtimes for every movie
        #Change 10636 to cinema when not using Sandbox
        result = requests.get(BASE_URL + 'cinemaShowTimes/', headers=headers, params={"cinema_id" : 10636,
                                                                                      "date" : queryDate})
        result = result.json()

        #Parse result and get Film ID's, Names, Times, and Dates
        filmIDs = []
        filmNames = []
        allFilmTimes = []
        allFilmDates = []
        for i in result["films"]:
            # Create temporary arrays to hold individual film times and showdates
            individualFilmTimes = []
            individualFilmDates = []

            # Add Film ID's and Names
            filmIDs.append(i["film_id"])
            filmNames.append(i["film_name"])

            # Add film timings to a temp array and then append that to an array with all the timings
            for j in i["showings"]:
                for k in i["showings"][j]["times"]:
                    individualFilmTimes.append((k["start_time"], k["end_time"]))
                    # print(k["start_time"], k["end_time"])
            allFilmTimes.append(individualFilmTimes)

            # Add film dates to a temp array and then append that to an array with all the dates
            for j in i["show_dates"]:
                individualFilmDates.append(j["date"])
                # print(j["date"])
            allFilmDates.append(individualFilmDates)

        filmsInCinemas[cinema] = {"filmIDs" : filmIDs, "filmNames" : filmNames, "allFilmTimes" : allFilmTimes,
                                        "allFilmDates" : allFilmDates}

    writeToFile(filmsInCinemas,"showTimes")
    return jsonify(cinemaResult)


#*************************************Get Purchase link given date *************************************#
@movieglu.route('/api/movieglu/films/purchase/<date>/<time>/<cinemaID>/<filmID>')
def getPurchaseLink(date,time,cinemaID,filmID):
    #Sandbox Information
    date = ISO_8601_time[0:10]
    time = "19:50"
    cinemaID = 10636
    filmID = 7772


    #GET request with proper header for showtimes for every movie
    result = requests.get(BASE_URL + 'purchaseConfirmation/', headers=headers, params={"cinema_id" : cinemaID,
                                                                                       "film_id" : filmID,
                                                                                       "date" : date,
                                                                                       "time" : time})
    result = result.json()
    purchaseURL = result["url"]

    result = {"URL" : purchaseURL}
    writeToFile(result,"purchaseURL")
    return jsonify(result)


#*************************************Get Purchase link given date *************************************#
@movieglu.route('/api/movieglu/updateLocation/<lat>/<longi>')
def updateHeaders(lat, longi):
    global headers
    # Create Authorization Header
    time = datetime.datetime.now()
    ISO_8601_time = time.isoformat()
    # Sandbox Environment
    headers = {
        'client': 'TEXA_1',
        'x-api-key': 'i4QRxvFIAR1fnfe2FGocd871ukDF3V6dahbxg6PG',
        'authorization': 'Basic VEVYQV8xX1hYOlZLOTlHVHpyQWtwdA==',
        'territory': 'XX',
        'api-version': 'v200',
        'geolocation': '-22.0;14.0',
        'device-datetime': ISO_8601_time
    }

    location = lat + ";" + longi
    # # Normal Environment
    # headers = {
    #     'client': 'TEXA_1',
    #     'x-api-key' : 'UI70SEkfbj7bKw0SUk3DiaAwk2PmsS8vaGlPYexW',
    #     'authorization' : 'Basic VEVYQV8xOkxDNEZNRUpHc1Q4WQ==',
    #     'territory' : 'US',
    #     'api-version' :	'v200',
    #     'geolocation' :	location,
    #     'device-datetime' : ISO_8601_time
    # }
    return jsonify({"Latitude" : lat, "Longitude" : longi})

@movieglu.route('/api/movieglu/selectMovie/<movie>')
def selectMovie(movie):
    oldData = json.load(open("src/data/nowPlaying.json"))

    newData = []
    found = False
    for i in range(len(oldData)):
        if(oldData[i]['filmName'].lower() == movie.lower()):
            newData.append(oldData[i])
            found = True

    if(not found):
        newData.append({"filmName" : "No Movies Found With That Name",
                        "movieImage" : "https://i.ytimg.com/vi/hAq443fhyDo/maxresdefault.jpg"})

    with open('src/data/nowPlaying.json', 'w') as newFile:
        json.dump(newData, newFile)

    return(jsonify({'Test' : 'Test'}))


def writeToFile(result,name):
    # print(result,"hello")
    name = "src/data/"+name+".json"
    with open(name, 'w') as outfile:
        json.dump(result, outfile)