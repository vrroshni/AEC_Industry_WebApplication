# Generated by Django 4.0.7 on 2022-11-28 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0010_profileverification_date_of_birth_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileverification',
            name='role',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
