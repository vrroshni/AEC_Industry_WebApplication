# Generated by Django 4.1.3 on 2022-12-20 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aec_app', '0009_aec_proposals_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='aec_proposals_user',
            name='description',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
