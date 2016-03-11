from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework import filters

from .serializers import UserSerializer, AirportSerializer, FlightSerializer
from .models import Flight, Airport

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for listing or retrieving users
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

class FlightViewSet(viewsets.ModelViewSet):
    """
    A viewset for listing or retrieving flights
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()

class AirportViewSet(viewsets.ModelViewSet):
    """
    A viewset for listing airports
    """
    serializer_class = AirportSerializer
    queryset = Airport.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('city',)
