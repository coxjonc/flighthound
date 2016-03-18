from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

urlpatterns = [
    url(r'$', csrf_exempt(TemplateView.as_view(template_name='frontend/app.html')))
]
