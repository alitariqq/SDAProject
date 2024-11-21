from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import CustomUser
from django.contrib.auth import authenticate, login
from datetime import date
import re

class UserHandling:
    @api_view(['POST'])
    def register(request):
        username = request.data.get('username')
        password = request.data.get('password')
        dateOfBirth = request.data.get('dateOfBirth')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')


        # Ensure you're checking against CustomUser, not User
        if CustomUser.objects.filter(username=username).exists():  # Replace User with CustomUser
            return Response({'Username not available'}, status=400)
        elif CustomUser.objects.filter(email=email).exists():
            return Response({'An account associated with this email already exists.'},status=400)
    
        try:
            dob = date.fromisoformat(dateOfBirth)
            age = (date.today() - dob).days // 365
            if age < 16:
                return Response({'error': 'You must be at least 16 years old to register.'}, status=400)
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
    
        if not re.match(r"^[a-zA-Z0-9_.]+$", username):
            return Response({'error': 'Username can only contain letters, numbers, underscores, and dots.'}, status=400)



        # Create the new user using CustomUser
        user = CustomUser.objects.create_user(username=username, password=password, email=email, dateOfBirth=dateOfBirth,first_name=first_name,last_name=last_name)
        return Response({'message': 'User registered successfully'}, status=201)

    @api_view(['POST'])
    def signin(request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate with CustomUser, not User
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': f'Hello, {user.username}, Your name is: {user.first_name}, {user.last_name}. You were born on {user.dateOfBirth}. The email associated with this account is {user.email}'}, status=200)
        return Response({'error': 'Invalid credentials'}, status=400)
