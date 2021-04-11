
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


#*************************************Get all Movies Playing right now*************************************#
#Base URL
BASE_URL = "https://api-gate2.movieglu.com/"

#GET request with proper header for all artists with provided name
result = requests.get(BASE_URL + 'filmsNowShowing/', headers=headers, params={'n' : 25})
result = result.json()

print(result)


