# Generated by Django 5.0 on 2024-08-20 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_course_approval_count_course_approved_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chapter',
            options={'ordering': ['created_at']},
        ),
    ]
