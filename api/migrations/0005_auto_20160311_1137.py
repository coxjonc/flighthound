# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-11 11:37
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_airport'),
    ]

    operations = [
        migrations.AddField(
            model_name='flight',
            name='max_price',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='flight',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='flights', to=settings.AUTH_USER_MODEL),
        ),
    ]