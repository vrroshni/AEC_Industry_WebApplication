from django.apps import AppConfig


class AecAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'aec_app'

    def ready(self):
        import aec_app.signals

