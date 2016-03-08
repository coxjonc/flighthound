import csv

from django.core.management.base import BaseCommand

from api.models import Airport

class Command(BaseCommand):

    def handle(self, *args, **options):
        f = open('airports.csv')
        csv_f = csv.reader(f)
        for row in csv_f:
            if len(row[4]) == 3:
                Airport.objects.create(city=row[2], iata=row[4])
