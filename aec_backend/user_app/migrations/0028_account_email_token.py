# Generated by Django 4.1.3 on 2022-12-26 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0027_account_is_email_verified_account_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='email_token',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
