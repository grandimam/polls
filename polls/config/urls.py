from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('', include('apps.polls.urls')),
    path('admin/', admin.site.urls),
    path('app/login/', include('apps.user.urls')),
]
