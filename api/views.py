from django.contrib.auth.models import User

from rest_framework import viewsets, filters, authentication, permissions

from .serializers import UserSerializer, AirportSerializer, FlightSerializer
from .models import Flight, Airport

class DefaultsMixin(object):
    """
    Default settings for authentication and permissions
    """
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )

class UserViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """
    A viewset for listing or retrieving users
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        """
        If provided pk is 'i', then return the current User
        """
        if pk == 'i':
            return Response(UserSerializer(request.user).data)
        return super(UserViewSet, self).retrieve(request, pk)

class FlightViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """
    A viewset for listing or retrieving flights
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()

class AirportViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """
    A viewset for listing airports
    """
    serializer_class = AirportSerializer
    queryset = Airport.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('city',)
