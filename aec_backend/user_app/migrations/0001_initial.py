# Generated by Django 4.1.3 on 2022-11-25 11:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('full_name', models.CharField(max_length=50)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('phone_number', models.CharField(max_length=50)),
                ('referral_code', models.CharField(blank=True, max_length=50, null=True)),
                ('ref_active', models.BooleanField(default=False, null=True)),
                ('code_reffered', models.CharField(blank=True, max_length=50, null=True)),
                ('followers', models.IntegerField(default=0)),
                ('following', models.IntegerField(default=0)),
                ('connections', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('CLIENT', 'CLIENT'), ('ARCHITECT', 'ARCHITECT'), ('ENGINEER', 'ENGINEER'), ('CONSTRUCTOR', 'CONSTRUCTOR')], default='CLIENT', max_length=100, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('last_login', models.DateTimeField(auto_now_add=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superadmin', models.BooleanField(default=False)),
                ('is_client', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProfileVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True, null=True)),
                ('location', models.CharField(max_length=50, null=True)),
                ('experience', models.IntegerField(default=0)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_premium', models.BooleanField(default=False)),
                ('cerificate', models.FileField(upload_to='')),
                ('cv', models.FileField(upload_to='')),
                ('id_proof', models.FileField(upload_to='')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
