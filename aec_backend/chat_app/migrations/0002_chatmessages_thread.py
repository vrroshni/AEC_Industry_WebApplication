# Generated by Django 4.1.3 on 2023-01-03 12:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmessages',
            name='thread',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chat_thread', to='chat_app.chatmodel'),
        ),
    ]
