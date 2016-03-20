from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Flight, Airport

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ('city', 'iata')

class FlightSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)

    class Meta:
        model = Flight
        fields = ('url', 'key', 'user', 'origin_city', 'max_price', 'origin_iata', 'destination_city', 'destination_iata',
            'depart_date', 'return_date', 'round_trip', 'created_at', 'updated_at')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    flights = FlightSerializer(many=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'flights')
