# Generated by Django 4.1.3 on 2022-12-09 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0019_profileverification_premium_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileverification',
            name='premium_amount',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
