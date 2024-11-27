from rest_framework import serializers
from .models import Answers, Post
from rest_framework import generics
from abc import abstractmethod
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class AnswerSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Answers
        fields = ['username', 'postId', 'body']

################################################################

class AnswerListCreate(generics.ListCreateAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        post_id = self.kwargs['postId']
        post = Post.objects.get(id=post_id)
        return Answers.objects.filter(postId=post)
    
    def perform_create(self, serializer):
        predefined_username = self.request.user
        try:
            post_id = self.request.data.get('postId')
            post = Post.objects.get(id=post_id)
            serializer.save(username=predefined_username, postId=post)
        except Post.DoesNotExist:
            raise serializers.ValidationError({"postId": "Invalid Post ID"})

class AnswerDetail(generics.RetrieveAPIView):
    queryset = Answers.objects.all()
    serializer_class = AnswerSerializer

class rateAnswer:
    @abstractmethod
    def answer(request):
        pass

    @abstractmethod
    def status(request):
        pass

    @abstractmethod
    def delete(request):
        pass

class upvoteAnswer(rateAnswer):
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def answer(request):
        answerId = request.data.get('answerId') #get the answerId
        user = request.user #fetch currently logged in user

        #check if the answer exists
        if not Answers.objects.filter(id = answerId).exists():
            return Response({'error': 'Answer does not exist'}, status=400)
        
        answer = Answers.objects.get(id = answerId)

        #check if user has already upvoted the post
        if upvoteAnswer.objects.filter(answerId = answer, username = user).exists():
            return Response({'error': 'This user has already upvoted this answer'}, status=400)
        
        #create the upvote
        upvoteAnswer.objects.create(username=user, answerId=answer)

        answer.upvoteCount = Answers.objects.filter(answerId=answer).count()
        answer.save()

        return Response({'message': 'Upvoted successfully', 'upvote': answer.upvoteCount}, status=201)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def status(request):
        answerId = request.data.get('answerId') #get the answerId
        user = request.user #fetch the currently logged in user

        # Check if the user has upvoted this answer
        if upvoteAnswer.objects.filter(username=user, answerId=answerId).exists():
            return Response({'message': 'User has upvoted this answer'}, status=201) #return 201 if user has upvoted
        else:
            return Response({'message': 'Not upvoted by this user'}, status=202) #return 202 if user hasn't upvoted
        
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete(request):
        try:
            answerId = request.data.get('answerId') #get the answerId
            user = request.user #fetch the currently logged in user

            #check if the answer exists
            if not Answers.objects.filter(id=answerId).exists():
                return Response({'error': 'Answer does not exist'}, status=400)

            answer = Answers.objects.get(id=answerId)

            # Find and delete the upvote
            upvote = upvoteAnswer.objects.get(username=user, answerId=answer)
            upvote.delete()

            #update the upvoteCount for the post
            answer.upvoteCount = upvoteAnswer.objects.filter(id=answerId).count()
            answer.save()

            return Response({'message': 'Upvote deleted successfully'}, status=200)
        except upvoteAnswer.DoesNotExist:
            return Response({'error': 'Upvote not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        
class downvoteAnswer(rateAnswer):
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def answer(request):
        answerId = request.data.get('answerId') #get the answerId
        user = request.user #fetch currently logged in user

        #check if the answer exists
        if not Answers.objects.filter(id = answerId).exists():
            return Response({'error': 'Answer does not exist'}, status=400)
        
        answer = Answers.objects.get(id = answerId)

        #check if user has already downvoted the post
        if downvoteAnswer.objects.filter(answerId = answer, username = user).exists():
            return Response({'error': 'This user has already downvoted this answer'}, status=400)
        
        #create the downvote
        downvoteAnswer.objects.create(username=user, answerId=answer)

        answer.downvoteCount = Answers.objects.filter(answerId=answer).count()
        answer.save()

        return Response({'message': 'downvoted successfully', 'downvote': answer.downvoteCount}, status=201)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def status(request):
        answerId = request.data.get('answerId') #get the answerId
        user = request.user #fetch the currently logged in user

        # Check if the user has downvoted this answer
        if downvoteAnswer.objects.filter(username=user, answerId=answerId).exists():
            return Response({'message': 'User has downvoted this answer'}, status=201) #return 201 if user has downvoted
        else:
            return Response({'message': 'Not downvoted by this user'}, status=202) #return 202 if user hasn't downvoted
        
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete(request):
        try:
            answerId = request.data.get('answerId') #get the answerId
            user = request.user #fetch the currently logged in user

            #check if the answer exists
            if not Answers.objects.filter(id=answerId).exists():
                return Response({'error': 'Answer does not exist'}, status=400)

            answer = Answers.objects.get(id=answerId)

            # Find and delete the downvote
            downvote = downvoteAnswer.objects.get(username=user, answerId=answer)
            downvote.delete()

            #update the upvoteCount for the post
            answer.downvoteCount = downvoteAnswer.objects.filter(id=answerId).count()
            answer.save()

            return Response({'message': 'Downvote deleted successfully'}, status=200)
        except downvoteAnswer.DoesNotExist:
            return Response({'error': 'Downvote not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)