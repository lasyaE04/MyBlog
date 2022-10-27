from rest_framework import serializers
from blogger.models import *


class BlogSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=200)
    author = serializers.IntegerField(required=False, source='author_id')
    description = serializers.CharField(required=False, allow_blank=True, max_length=2000)

    def create(self, validated_data):
        return Blog.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.author_id = validated_data.get('author_id', instance.author_id)
        instance.save()
        return instance

class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    bio = serializers.CharField(required=False, allow_blank=True, max_length=400)

    def create(self, validated_data):
        return Author.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        return instance


class AuthorBlogsSerializer(serializers.ModelSerializer):
    blog_set = BlogSerializer(many=True,read_only=True)

    class Meta:
        model = Author
        fields = ('id', 'name', 'bio', 'blog_set')
