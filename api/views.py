from django.contrib.auth.models import User

from rest_framework import viewsets, filters, authentication, permissions, response

from .serializers import UserSerializer, AirportSerializer, FlightSerializer
from .models import Flight, Airport


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for listing or retrieving users
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, pk=None):
        """
        If provided pk is 'i', then return the current User
        """
        if pk == 'i':
            return response.Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)

class FlightViewSet(viewsets.ModelViewSet):
    """
    A viewset for listing or retrieving flights
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AirportViewSet(viewsets.ModelViewSet):
    """
    A viewset for listing airports
    """
    serializer_class = AirportSerializer
    queryset = Airport.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('city',)
