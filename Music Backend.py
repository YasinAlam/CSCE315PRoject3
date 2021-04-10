import requests

#Setting Application Details
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

#Artist name
artist = 'Taylor Swift'

#GET request with proper header for all artists with provided name
result = requests.get(BASE_URL + 'search/', headers=headers, params={'q' : artist,'type' : 'artist'})
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

#GET request with proper header to find all albums by chosen artist
result = requests.get(BASE_URL + 'artists/' + artistIDArray[1] + '/albums', headers=headers)
result = result.json()

print(result)