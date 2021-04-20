#Packages
import numpy as np
import pandas as pd
import json
from flask import Blueprint, jsonify
location = Blueprint("location", __name__)
import pgeocode as pg


def get_region(country_ = 'us'):
    return pg.Nominatim(country_)

@location.route('/api/location/<zipp>')
def get_info(zipp, country_ = 'us', full_info=False): # Get dataframe of info for a zip
    reg = get_region(country_)
    info = reg.query_postal_code(zipp) #df of all information
    if(full_info == True):
            return jsonify(info.to_dict())
    else:
            coord = {"latitude":info.latitude,"longitude":info.longitude}
            writeToFile(coord,"Location")
            return jsonify(coord)


def writeToFile(result,name):
    # print(result,"hello")
    name = "../src/data/"+name+".json"
    with open(name, 'w') as outfile:
        json.dump(result, outfile)

"""
Returns dictionary of full info or just latitude or longitude.
Use with get_info(<'zip code'>, <'country'>,<full_info = T/F>)
examples:
get_info('77433', full_info=True)
Output:
{'postal_code': '77433',
 'country_code': 'US',
 'place_name': 'Cypress',
 'state_name': 'Texas',
 'state_code': 'TX',
 'county_name': 'Harris',
 'county_code': 201.0,
 'community_name': nan,
 'community_code': nan,
 'latitude': 29.8836,
 'longitude': -95.7025,
 'accuracy': 4.0}
get_info('77433', full_info=False)
Output:
{'latitude': 29.8836, 'longitude': -95.7025}
"""
