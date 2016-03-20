#!usr/bin/python

import os
import requests
import json
import time

from django.core.management.base import BaseCommand
from django.core.mail import send_mail

from api.models import Flight

class Command(BaseCommand):

    def handle(self, *args, **options):
        for flight in Flight.objects.all(): 
            origin = flight.origin_iata
            destination = flight.destination_iata
            depart_date = flight.depart_date
            max_price = flight.max_price

            req = {
                'request': {
                    'passengers': {
                        'adultCount': 1
                    },    
                    'slice': [
                        {
                            'origin': origin,
                            'destination': destination,
                            'date': depart_date.strftime('%Y-%m-%d')
                        }    
                    ],
                    'solutions': '1'
                }
            }

            if flight.round_trip:
                req['request']['slice'].append({
                    'origin': destination,
                    'destination': origin,
                    'date': flight.return_date.strftime('%Y-%m-%d')
                    })    

            url = 'https://www.googleapis.com/qpxExpress/v1/trips/search'
            r = requests.post(
                url = url,
                params = {'key': os.environ.get('QPX_API_KEY')}, 
                headers = {'Content-Type': 'application/json'},
                data = json.dumps(req)
            )
            data = json.loads(r.text)
            price = data['trips']['tripOption'][0]['saleTotal']
            
            message = (
                "The price of a flight to {} from {} has dropped " 
                "to {}. This is below your maximum price of " 
                "USD{}".format(origin, destination, price, max_price))

            print message
            
            if max_price >= price[3:]:
                send_mail(
                    'Flight price alert', 
                    message,
                    'flighthound@flighthound.com',
                    flight.user.email,
                    fail_silently = False
                )
