import requests
from flask import Blueprint, jsonify
import json
bandsintown = Blueprint("bandsintown", __name__)


#*************************************AUTHORIZATION FOR Bandsintown API*************************************#
#Setting-up Application Details
APP_ID = '4065c748e821bd17f026e5340fb780d6'

#Set Base URL of all Bandsintown API endpoints
BASE_URL = 'http://rest.bandsintown.com/'


#*************************************Get Artist info with provided name*************************************#
#Inputted Artist name
@bandsintown.route('/api/bandsintown/<artistInput>')
def getArtistInfo(artistInput = None):
    result = requests.get(BASE_URL + "artists/"+artistInput, params={'app_id' : APP_ID})
    result = result.json()
    futureEventCount = result["upcoming_event_count"]
    artistImage = result["image_url"]

    result = {'futureEventCount': futureEventCount, "artistImage" : artistImage}
    writeToFile(result,"artistInfo")
    return jsonify(result)

#*************************************Get Past Artist Events with provided name*************************************#
@bandsintown.route('/api/bandsintown/<artistInput>/events/past')
def getPastArtistEvents(artistInput = None):
    pastEvents = requests.get(BASE_URL + "artists/"+artistInput+"/events", params={'app_id' : APP_ID, 'date' : "past"})
    pastEvents = pastEvents.json()

    #Parse result and get all past events of artist
    dateArrayPast = []
    descriptionArrayPast = []
    venueArrayPast = [] #{"Venue","City","Region", "Country"}
    titleArrayPast = []

    for i in pastEvents:
        dateArrayPast.append(i["datetime"][0:10])
        descriptionArrayPast.append([i["description"]])
        venueArrayPast.append({"venue" : i["venue"]["name"], "city" : i["venue"]["city"], "region" : i["venue"]["region"],
                               "country" : i["venue"]["country"]})
        titleArrayPast.append(i["title"])

    result = {"dateArrayPast" : dateArrayPast, "descriptionArrayPast": descriptionArrayPast,
                    "venueArrayPast" : venueArrayPast, "titleArrayPast" : titleArrayPast }
    writeToFile(result,"pastEvents")
    return jsonify(result)


#*************************************Get Future Artist Events with provided name*************************************#
@bandsintown.route('/api/bandsintown/<artistInput>/events/future')
def getFutureArtistEvents(artistInput = None):
    futureEvents = requests.get(BASE_URL + "artists/" + artistInput + "/events",
                                params={'app_id': APP_ID, 'date': "upcoming"})
    futureEvents = futureEvents.json()

    # Parse result and get all future events of artist
    ticketDateArrayFuture = []
    dateArrayFuture = []
    descriptionArrayFuture = []
    venueArrayFuture = []
    cityArrayFuture = []
    countryArrayFuture = []
    titleArrayFuture = []
    ticketURLFuture = []

    for i in futureEvents:
        dateArrayFuture.append(i["datetime"][0:10])
        descriptionArrayFuture.append([i["description"]])
        venueArrayFuture.append(i["venue"]["name"])
        cityArrayFuture.append(i["venue"]["city"] + ', ' + i["venue"]["region"] + ', ' + i["venue"]["country"])
        countryArrayFuture.append(i["venue"]["country"])
        titleArrayFuture.append(i["title"])
        ticketDateArrayFuture.append(i["on_sale_datetime"][0:10])

        found = False
        for j in i["offers"]:
            if j["type"] == "Tickets":
                ticketURLFuture.append(j["url"])
                found = True
        if not found:
            ticketURLFuture.append(None)
    # print(ticketDateArrayFuture)


    result = []
    if(len(dateArrayFuture) != 0):
        for i in range(len(dateArrayFuture)):
            if(countryArrayFuture[i] == "United States"):
                result.append({"dateArrayFuture": dateArrayFuture[i], "descriptionArrayFuture": descriptionArrayFuture[i],
                               "venueArrayFuture" : venueArrayFuture[i], "cityArrayFuture" : cityArrayFuture[i],
                               "titleArrayFuture": titleArrayFuture[i], "ticketDateArrayFuture" : ticketDateArrayFuture[i],
                               "ticketURLFuture" : ticketURLFuture[i]})
    else:
        result.append({"venueArrayFuture" : "No Concerts Found for that artist", "ticketURLFuture" :
                       "https://i.ytimg.com/vi/hAq443fhyDo/maxresdefault.jpg"})
    writeToFile(result, "futureEvents")
    return jsonify(result)


# #*************************************Printing statements to test code*************************************#
# print("#*************************************Past Events*************************************#")
# for i in range(len(dateArrayPast)):
#     print(("Date: " + dateArrayPast[i]).ljust(20),("Venue Name: " + venueArrayPast[i]["venue"].ljust(65)),
#           ("Venue City:" + venueArrayPast[i]["city"].ljust(20)),("Venue State: " + venueArrayPast[i]["region"].ljust(10)),
#           ("\tVenue Country: " + venueArrayPast[i]["country"]))
#
# print("\n#*************************************Future Events*************************************#")
# for i in range(len(dateArrayFuture)):
#     print(("Date: " + dateArrayFuture[i]).ljust(20), ("Venue Name: " + venueArrayFuture[i]["venue"].ljust(65)),
#           ("Venue City:" + venueArrayFuture[i]["city"].ljust(20)),
#           ("Venue State: " + venueArrayFuture[i]["region"].ljust(10)),
#           ("Venue Country: " + venueArrayFuture[i]["country"]).ljust(30), ("Tickets Sale Time: " +
#                                                                            ticketDateArrayFuture[i]).ljust(40),
#           ("Tickets Sale URL: " + str(ticketURLFuture[i])))


def writeToFile(result,name):
    # print(result,"hello")
    name = "src/data/"+name+".json"
    with open(name, 'w') as outfile:
        json.dump(result, outfile)


@bandsintown.route('/api/bandsintown/reset')
def resetConcerts():
    result = []
    result.append({"venueArrayFuture" : "Please Search for an Artist to find concerts", "ticketURLFuture" :
                       "https://i.ytimg.com/vi/hAq443fhyDo/maxresdefault.jpg"})
    writeToFile(result, "futureEvents")
    return jsonify(result)
