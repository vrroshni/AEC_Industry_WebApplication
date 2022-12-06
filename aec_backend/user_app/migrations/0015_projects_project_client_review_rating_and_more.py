# Generated by Django 4.0.7 on 2022-12-04 16:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0014_alter_account_date_joined_projects_network'),
    ]

    operations = [
        migrations.AddField(
            model_name='projects',
            name='project_client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='project_client_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Review_Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_desc', models.CharField(max_length=200, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('rated_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rated_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='projects',
            name='review',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='review_project', to='user_app.review_rating'),
        ),
    ]