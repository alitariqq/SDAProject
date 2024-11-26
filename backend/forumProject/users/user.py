from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import CustomUser
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from datetime import date
import re
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny

class UserHandling:
    @api_view(['POST'])
    def register(request):

        #Get all the required fields for registration from the post request
        username = request.data.get('username')
        password = request.data.get('password')
        dateOfBirth = request.data.get('dateOfBirth')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        if CustomUser.objects.filter(username=username).exists(): #return error if user with this username already exists
            return Response({'Username not available'}, status=400)
        
        elif CustomUser.objects.filter(email=email).exists(): #return error if user with this email already exists
            return Response({'An account associated with this email already exists.'},status=400)
    
        #checking for age
        age = modifyUser.calculateAge(dateOfBirth)
        if(age == -1):
                return Response({'error': 'Incorrect date forma.t'}, status=400)
        if(age < 16):
            return Response({'error': 'User must be atleast 16 years old.'}, status=400)
        
        #check if username contains any special characters
        if not re.match(r"^[a-zA-Z0-9_.]+$", username):
            return Response({'error': 'Username can only contain letters, numbers, underscores, and dots.'}, status=400)

        # Create the new user using CustomUser
        user = CustomUser.objects.create_user(username=username, 
                                            password=password,
                                            email=email, 
                                            dateOfBirth=dateOfBirth,
                                            first_name=first_name,
                                            last_name=last_name)
        
        return Response({'message': 'User registered successfully'}, status=201) #user registered successfully

    @api_view(['POST'])
    def signin(request):
        #get required fields from the post request
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate with db
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user) #login the user
            return Response({'message': f'{user.username} Logged in'}, status=200)
        return Response({'error': 'Invalid credentials'}, status=400)
    
    @api_view(['GET'])
    @login_required  # User must be logged in
    def session_check(request):
        user = request.user  # This will be the logged-in user
        return Response({
            'message': f'User {user.username} is logged in.',
            'username': user.username
        }, status=200)
    
    @api_view(['GET'])
    @login_required
    def dashboard(request):
        user = request.user
        age = modifyUser.calculateAge(str(user.dateOfBirth))
        return Response({
            'username':user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email' : user.email,
            'age' : age
        })
    
    @api_view(['POST'])
    @csrf_exempt
    @permission_classes([AllowAny])
    def logout(request):
        # Log out the user by clearing the session
        logout(request)
        return Response({'message': 'Successfully logged out.'}, status=200)
    

        
    
class modifyUser:
    def calculateAge(dateOfBirth):
        try:
            dob = date.fromisoformat(dateOfBirth)
            age = (date.today() - dob).days // 365
            return age
            
        except ValueError:
            return -1

    @api_view(['POST'])    
    def updateUser(request):
        user = request.user  # Get the logged-in user
        data = request.data

        # Update password if provided
        new_password = data.get('new_password')
        if new_password:
            user.set_password(new_password)  # Safely hash the password
            user.save()
            return Response({"message": "Password updated successfully"}, status=200)

        # Update other fields (e.g., email, first_name, last_name)
        if 'email' in data:
            user.email = data['email']
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']

        user.save()
        return Response({"message": "Profile updated successfully"}, status=200)
    
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete_user(request):
        try:
            deleteUsername = request.data.get('username')
            user = request.user
            if not user.is_superuser:
                return Response({'error': 'User does not have permission to delete this account!'}, status=403)

            # Find and delete the user
            deleteUser = CustomUser.objects.get(username=deleteUsername)
            deleteUser.delete()
            return Response({'message': 'User Account deleted successfully'}, status=200)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User Acoount not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)