from django.db import models
from django.contrib.auth.models import User

class Flight(models.Model):
    user = models.ForeignKey(User, related_name='flights')
    origin_name = models.CharField(max_length=200)
    origin_iata = models.CharField(max_length=200)
    destination_name = models.CharField(max_length=200)
    destination_iata = models.CharField(max_length=200)
    depart_date = models.DateField()
    return_date = models.DateField()
    round_trip = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    
    class Meta:
        ordering = ['depart_date']

    def __unicode__(self):
        return '{} to {}'.format(self.origin_name, self.destination_name)
