# Generated by Django 4.1.3 on 2023-01-05 11:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat_app', '0003_remove_chatmessages_thread_chatmessages_receiver_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification_text', models.TextField()),
                ('thread_name', models.CharField(blank=True, max_length=120, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('is_seen', models.BooleanField(default=False)),
                ('notify_count', models.IntegerField(default=0)),
                ('message_receiver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notify_receiver', to=settings.AUTH_USER_MODEL)),
                ('message_sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notify_sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]