from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView

urlpatterns = [
    url(r'$', TemplateView.as_view(template_name='frontend/app.html'))
]
