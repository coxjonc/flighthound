from rest_framework.routers import DefaultRouter

from .views import UserViewSet, FlightViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'flights', FlightViewSet)

urlpatterns = router.urls
