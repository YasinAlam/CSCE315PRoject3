#Packages
import numpy as np
import pandas as pd
import pgeocode as pg
from flask import Blueprint, jsonify
location = Blueprint("location", __name__)

class Query:
    #Data
        def __init__(self, country = None, zipp = None): #Use shell = true to just use functions, else create object
            if(country and zipp == None):
                self.shell = True
            else:
                self.shell = False
            self.country = country
            self.zipp = zipp
            self.region = None
            self.info = None
            if(not self.shell):
                self.region = self.get_region(country)
                self.info = self.get_info(zipp, country)
                self.latitude = self.info.latitude
                self.longitude = self.info.longitude

        def get_region(self, country_ = None): #Get repo of country zips
            if(self.shell):
                return pg.Nominatim(country_)
            else:
                return pg.Nominatim(self.country)
            
        def get_info(self, zipp_ = None, country_ = None): # Get dataframe of info for a zip
            if(not self.shell):
                return self.region.query_postal_code(zipp_)
            else:
                reg = self.get_region(country_)
                return reg.query_postal_code(zipp_)

"""
Can use as object or just an engine
test = Query('us', '77433')
test.info for detailed info
test.latitude for latitude, etc

Alternatively, pass in functions
zip_engine = Query()
info = get_info('77433', 'us') 
"""
