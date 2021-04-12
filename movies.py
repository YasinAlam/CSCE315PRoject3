import requests
import datetime

#*************************************AUTHORIZATION FOR Bandsintown API*************************************#
#Setting-up Application Details
APP_ID = '4065c748e821bd17f026e5340fb780d6'


#Create Authorization Header
time = datetime.datetime.now()
ISO_8601_time = time.isoformat()
headers = {
    'client': 'TEXA_1',
    'x-api-key' : 'i4QRxvFIAR1fnfe2FGocd871ukDF3V6dahbxg6PG',
    'authorization' : 'Basic VEVYQV8xX1hYOlZLOTlHVHpyQWtwdA==',
    'territory' : 'XX',
    'api-version' :	'v200',
    'geolocation' :	'-22.0;14.0',
    'device-datetime' : ISO_8601_time
}


# *************************************Get all Cinemas nearby*************************************#
#Base URL
BASE_URL = "https://api-gate2.movieglu.com/"

#GET request with proper header for all cinemas in your area
result = requests.get(BASE_URL + 'cinemasNearby/', headers=headers, params={'n' : 25})
result = result.json()

#Parse result and get Cinema ID's, Distance, Names, Logos, and addresses
cinemaIDs = []
cinemaDistances = []
cinemaNames = []
cinemaLogos = []
cinemaAddresses = []

for i in result["cinemas"]:
    cinemaIDs.append(i["cinema_id"])
    cinemaNames.append(i["cinema_name"])
    cinemaDistances.append(i["distance"])
    cinemaLogos.append(i["logo_url"])
    cinemaAddresses.append({"address": i["address"], "city": i["city"], "state": i["state"]})


#*************************************Get all showtimes for provided cinemas*************************************#
filmsInCinemas = []
#Goes through every cinema and adds all information related to that cinema to an array
for cinema in cinemaIDs:
    #GET request with proper header for showtimes for every movie
    result = requests.get(BASE_URL + 'cinemaShowTimes/', headers=headers, params={"cinema_id" : cinema, "date" : ISO_8601_time[0:10]})
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

    filmsInCinemas.append((cinema,{"filmIDs" : filmIDs, "filmNames" : filmNames, "allFilmTimes" : allFilmTimes,
                                    "allFilmDates" : allFilmDates}))

# Print Results used for testing
for i in range(len(cinemaIDs)):
    print(filmsInCinemas[i],"\n")