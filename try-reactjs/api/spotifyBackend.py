import requests
from flask import Blueprint, jsonify
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


# #*************************************Get all Artists with provided name*************************************#
# #Set Base URL of all Spotify API endpoints
# BASE_URL = 'https://api.spotify.com/v1/'
#
# #Inputted Artist name
# artistInput = 'Drake'.lower()
#
# #GET request with proper header for all artists with provided name
# result = requests.get(BASE_URL + 'search/', headers=headers, params={'q' : artistInput,'type' : 'artist'})
# result = result.json()
#
# #Parse result and get artist Name, ID, Genres, and Image
# artistNameArray = []
# artistIDArray = []
# artistImageArray = []
# artistGenreArray = []
# for i in result['artists']['items']:
#     if(len(i['images'])!=0):
#         artistNameArray.append(i['name'])
#         artistIDArray.append(i['id'])
#         artistImageArray.append(i['images'][0]["url"])
#         if(len(i['genres'])!=0):
#             artistGenreArray.append(i['genres'])
#         else:
#             artistGenreArray.append(None)
#     else:
#         artistNameArray.append(i['name'])
#         artistIDArray.append(i['id'])
#         artistImageArray.append(None)
#         if (len(i['genres']) != 0):
#             artistGenreArray.append(i['genres'])
#         else:
#             artistGenreArray.append(None)
#
# # print(artistNameArray)
# # print(artistIDArray)
# # print(artistImageArray)
# # print(artistGenreArray)
#
#
# #*************************************Get all Albums related to chosen Artist*************************************#
# chosenArtistName = artistNameArray[0]
# chosenArtistID = artistIDArray[0]
#
# #GET request with proper header to find all albums by chosen artist
# result = requests.get(BASE_URL + 'artists/' + chosenArtistID + '/albums', headers=headers)
# result = result.json()
#
# #Parse result and get album Name and ID
# albumNameArray = []
# albumIDArray = []
# for i in result['items']:
#     albumNameArray.append(i['name'])
#     albumIDArray.append(i['id'])
#
# # print(albumNameArray)
# # print(albumIDArray)
#
#
# #*************************Get all Tracks related to all Albums related to chosen Artist*************************#
# #Convert Album ID Array to a string seperated by commas to be passed as a paramater below
# seperator = ','
# albumIDArrayToStr = seperator.join(albumIDArray)
# # print(albumIDArrayToStr)
#
# #GET request with proper header to find all songs given albums
# result = requests.get(BASE_URL + 'albums/', headers=headers, params={'ids':albumIDArrayToStr})
# result = result.json()
#
# #Parse result and get track Names and ID's
# trackNameArray = []
# trackIDArray = []
# for i in result["albums"]:
#     for j in i["tracks"]["items"]:
#         trackNameArray.append(j["name"])
#         trackIDArray.append(j["id"])
#
# # print(trackNameArray)
# # print(trackIDArray)
#
#
# #*************************Get Popularity score for each track*************************#
# #Convert track ID Array to a multiple TrackID string arrays seperated by commas to be passed as a paramater below
# seperator = ','
# combineTrackIDArray = []
# count = 0
# for i in range(0,len(trackIDArray),40):
#     tempTrackIDArray = trackIDArray[i:i+40]
#     combineTrackIDArray.append(seperator.join(tempTrackIDArray))
#
# # for i in combineTrackIDArray:
# #     print(i)
#
# #GET request with proper header to find all songs given albums
# trackResult = []
# for i in range(len(combineTrackIDArray)):
#     result = requests.get(BASE_URL + 'tracks/', headers=headers, params={'ids':combineTrackIDArray[i]})
#     trackResult.append(result.json())
#
# #Parse result and get popularity of each track
# trackPopularityArray = []
# for i in trackResult:
#     for j in i["tracks"]:
#         trackPopularityArray.append(j["popularity"])
#
# # print(trackPopularityArray)
#
# for i in range(len(trackNameArray)):
#     print(("Track Name: " + trackNameArray[i]).ljust(60),("\tPopularity Score: " + str(trackPopularityArray[i])).center(0),
#           ("\tArtist: " + chosenArtistName).rjust(0))