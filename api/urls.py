from django.views.generic import TemplateView
from django.conf.urls import url

from rest_framework.routers import DefaultRouter

from .views import UserViewSet, FlightViewSet, AirportViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'airports', AirportViewSet)
urlpatterns = router.urls

urlpatterns += [
    url(r'^app/$', TemplateView.as_view(template_name='app.html')),
]

