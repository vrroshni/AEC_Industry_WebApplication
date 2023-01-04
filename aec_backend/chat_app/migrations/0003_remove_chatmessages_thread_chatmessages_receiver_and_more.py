# Generated by Django 4.1.3 on 2023-01-04 11:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat_app', '0002_chatmessages_thread'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatmessages',
            name='thread',
        ),
        migrations.AddField(
            model_name='chatmessages',
            name='receiver',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reciever', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatmessages',
            name='sender',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatmessages',
            name='thread_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='chatmessages',
            name='message',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.DeleteModel(
            name='ChatModel',
        ),
    ]
