# Generated by Django 4.1.3 on 2022-12-22 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0023_account_projects'),
    ]

    operations = [
        migrations.AddField(
            model_name='projects',
            name='posted_on',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='projects',
            name='reviewed_on',
            field=models.DateTimeField(null=True),
        ),
    ]
