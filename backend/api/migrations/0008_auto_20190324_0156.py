# Generated by Django 2.1.5 on 2019-03-24 01:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20190324_0118'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serveruser',
            name='password',
        ),
        migrations.RemoveField(
            model_name='serveruser',
            name='username',
        ),
    ]
