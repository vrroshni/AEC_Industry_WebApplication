# Generated by Django 4.1.3 on 2022-12-27 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aec_app', '0012_alter_aec_proposals_user_admin_proposal'),
    ]

    operations = [
        migrations.AddField(
            model_name='client_requests',
            name='is_rejected',
            field=models.BooleanField(default=False),
        ),
    ]