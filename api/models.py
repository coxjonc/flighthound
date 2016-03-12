from django.db import models
from django.contrib.auth.models import User

class Airport(models.Model):
    city = models.CharField(max_length=200)
    iata = models.CharField(max_length=200)

class Flight(models.Model):
    user = models.ForeignKey(User, null=True, related_name='flights')
    max_price = models.IntegerField(null=True)
    origin_city = models.CharField(max_length=200, null=True)
    origin_iata = models.CharField(max_length=200)
    destination_city = models.CharField(max_length=200, null=True)
    destination_iata = models.CharField(max_length=200)
    depart_date = models.DateField(null=True)
    return_date = models.DateField(null=True)
    round_trip = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    
    class Meta:
        ordering = ['depart_date']

    def __unicode__(self):
        return '{} to {}'.format(self.origin_city, self.destination_city)
