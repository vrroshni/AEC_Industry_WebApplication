# Generated by Django 4.1.3 on 2022-12-09 05:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0018_network_followed_at_network_is_rejected_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileverification',
            name='premium_amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='profileverification',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
