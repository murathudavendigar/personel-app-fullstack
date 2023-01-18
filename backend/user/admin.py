from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import UserAdmin
from  django.contrib.auth.forms import UserChangeForm
from .models import Profile

admin.site.register(Profile)

