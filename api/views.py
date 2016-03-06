from django.contrib.auth.models import User

from rest_framework import viewsets

from .serializers import UserSerializer, FlightSerializer
from .models import Flight

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
