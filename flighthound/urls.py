from django.conf.urls import url, include

urlpatterns = [
    url(r'^api/', include('api.urls')),
    url(r'^app/', include('frontend.urls')), 
    url(r'^accounts/', include('allauth.urls'))
]
