from django.db import models
from datetime import date


class Author(models.Model):
    name = models.CharField(max_length=100)
    bio= models.TextField(max_length = 400, help_text = "Enter details here", default ='')


class Blog(models.Model):
    title=models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    description=models.TextField(max_length=2000, help_text="Enter blog description here",default='')
    post_date = models.DateField(default=date.today)

    class Meta:
        ordering= ['-post_date']