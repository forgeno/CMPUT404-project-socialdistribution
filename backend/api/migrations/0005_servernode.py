# Generated by Django 2.1.5 on 2019-03-13 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_authorprofile_isvalid'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServerNode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.URLField()),
            ],
        ),
    ]
