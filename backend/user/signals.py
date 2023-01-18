
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_Token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        print("Signals çalıştı...")



@receiver(post_save, sender=User)
def create_Profile(sender, instance=None, created=False, **kwargs):
    if created:
        Profile.objects.create(user=instance)