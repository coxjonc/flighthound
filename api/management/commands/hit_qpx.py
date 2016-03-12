#!usr/bin/python

import os
import requests
import json

from django.core.management.base import BaseCommand

from api.models import Flight

class Command(BaseCommand):

    def handle(self, *args, **options):
        req = {
            'request': {
                'passengers': {
                    'adultCount': 1
                },    
                'slice': [
                    {
                        'origin': 'BOS',
                        'destination': 'LAX',
                        'date': '2016-04-13'
                    }    
                ]
            }
        }

        url = 'https://www.googleapis.com/qpxExpress/v1/trips/search'
        r = requests.post(
            url = url,
            params = {'key': os.environ.get('QPX_API_KEY')}, 
            headers = {'Content-Type': 'application/json'},
            data = json.dumps(req)
        )
        with open('qpx.txt', 'w') as f:
            f.write(r.text)
