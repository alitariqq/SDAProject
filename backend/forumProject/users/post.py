from abc import abstractmethod
from .models import UpvotePosts, Post, DownvotePosts,BookmarkPosts, ReportPosts
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class PostHandling:
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete_post(request):
        try:
            deletePostId = request.data.get('postId')
            deletePost = Post.objects.get(id=deletePostId)
            user = request.user
            if not deletePost.username == user:
                if not user.is_superuser:
                    return Response({'error':'You dont have permission to remove this post!'}, status=403)
            
            # Find and delete the post
            deletePost.delete()
            return Response({'message': 'Post deleted successfully'}, status=200)
        except deletePost.DoesNotExist:
            return Response({'error': 'Post not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class ratePosts:
    #POST requests, gets postId from the frontend via a axios post request
    #used for upvoting, downvoting and reporting posts
    @abstractmethod
    def post(request):
        pass

    @abstractmethod
    def status(request): #returns 201 status code if status is valid, and 202 status code if invalid
        pass

    @abstractmethod
    def delete(request):
        pass

class upvotePost(ratePosts):

    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def post(request):
        postId = request.data.get('postId') #get the postId
        username = request.user #fetch the currently logged in user.

        #check if the post to be upvoted exists
        if not Post.objects.filter(id=postId).exists():
            return Response({'error': 'Post does not exist'}, status=400)
        
        #fetch the post to be upvoted
        post = Post.objects.get(id = postId)
        
        #check if the user has already upvoted this post
        if UpvotePosts.objects.filter(username=username, postId=post).exists():
            return Response({'error': 'This user has already upvoted this post'}, status=400)

        #create a new entry for this upvote
        UpvotePosts.objects.create(username=username, postId=post)

        #update the posts's upvoteCount
        post.upvoteCount = UpvotePosts.objects.filter(postId=postId).count()
        post.save()

        #return a successful message
        return Response({'message': 'Upvoted successfully', 'upvote': post.upvoteCount}, status=201)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def status(request):
        postId = request.data.get('postId') #get the postId
        username = request.user #fetch the currently logged in user

        # Check if the user has upvoted this post
        if UpvotePosts.objects.filter(username=username, postId=postId).exists():
            return Response({'message': 'User has upvoted this post'}, status=201) #return 201 if user has upvoted
        else:
            return Response({'message': 'Not upvoted by this user'}, status=202) #return 202 if user hasn't upvoted
        
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete(request):
        try:
            postId = request.data.get('postId') #get the postId
            username = request.user #fetch the currently logged in user

            #check if the post exists
            if not Post.objects.filter(id=postId).exists():
                return Response({'error': 'Post does not exist'}, status=400)

            post = Post.objects.get(id=postId)

            # Find and delete the upvote
            upvote = UpvotePosts.objects.get(username=username, postId=post)
            upvote.delete()

            #update the upvoteCount for the post
            post.upvoteCount = UpvotePosts.objects.filter(id=postId).count()
            post.save()

            return Response({'message': 'Upvote deleted successfully'}, status=200)
        except UpvotePosts.DoesNotExist:
            return Response({'error': 'Upvote not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        



class downvotePost(ratePosts):

    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def post(request):
        postId = request.data.get('postId')  # get the postId
        username = request.user  # fetch the currently logged in user

        # Check if the post exists
        if not Post.objects.filter(id=postId).exists():
            return Response({'error': 'Post does not exist'}, status=400)

        post = Post.objects.get(id = postId)

        # Check if the user has already downvoted the post
        if DownvotePosts.objects.filter(username=username, postId=post).exists():
            return Response({'error': 'This user has already downvoted this post'}, status=400)

        # Create the downvote
        DownvotePosts.objects.create(username=username, postId=post)

        #update the downvoteCount for the Post
        post.downvoteCount = DownvotePosts.objects.filter(postId=postId).count()
        post.save()

        return Response({'message': 'Downvoted successfully', 'upvote': post.downvoteCount}, status=201)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def status(request):
        postId = request.data.get('postId') #get the postId
        username = request.user #fetch the currently logged in user

        # Check if the user has downvoted the post
        if DownvotePosts.objects.filter(username=username, postId=postId).exists():
            return Response({'message': 'User has downvoted this post'}, status=201)
        else:
            return Response({'message': 'Not downvoted by this user'}, status=202)
        
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete(request):
       try:
            postId = request.data.get('postId') #get the postId
            username = request.user #fetch the currently logged in user

            # Check if the post exists
            if not Post.objects.filter(id=postId).exists():
                return Response({'error': 'Post does not exist'}, status=400)
            
            post = Post.objects.get(id=postId)

            # Find and delete the upvote
            downvote = DownvotePosts.objects.get(username=username, postId=post)
            downvote.delete()

            #update posts downvoteCount
            post.downvoteCount = DownvotePosts.objects.filter(id=postId).count()
            post.save()
            return Response({'message': 'Downvote deleted successfully'}, status=200)
       except DownvotePosts.DoesNotExist:
            return Response({'error': 'Downvote not found'}, status=404)
       except Exception as e:
            return Response({'error': str(e)}, status=400)
       

class bookmarkPost(ratePosts):

    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def post(request):
        postId = request.data.get('postId')  #gets postId
        username = request.user  #fetches the currently logged in user

        # Check if the post exists
        if not Post.objects.filter(id=postId).exists():
            return Response({'error': 'Post does not exist'}, status=400)
        
        post = Post.objects.get(id = postId)

        # Check if the user has already bookmarked the post
        if BookmarkPosts.objects.filter(username=username, postId=post).exists():
            return Response({'error': 'This user has already bookmarked this post'}, status=400)

        # Create the Bookmark
        BookmarkPosts.objects.create(username=username, postId=post)
        return Response({'message': 'bookmarked successfully'}, status=201)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def status(request):
        postId = request.data.get('postId') #get the postId
        username = request.user #fetch the currently logged in user

        # Check if the user has bookmarked the post
        if BookmarkPosts.objects.filter(username=username, postId=postId).exists():
            return Response({'message': 'User has bookmarked this post'}, status=201) #returns status 201 if the post has been bookmarked
        else:
            return Response({'message': 'Not bookmarked by this user'}, status=202) #returns status 202 if the post hasn't been bookmarked
        
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete(request):
       try:
            postId = request.data.get('postId') #gets the postId
            username = request.user #fetches the currently logged in user

            # Check if the post exists
            if not Post.objects.filter(id=postId).exists():
                return Response({'error': 'Post does not exist'}, status=400)
            post = Post.objects.get(id=postId) 

            # Find and delete the bookmark
            bookmark = BookmarkPosts.objects.get(username=username, postId=post)
            bookmark.delete()
            return Response({'message': 'Bookmark deleted successfully'}, status=200)
       except BookmarkPosts.DoesNotExist:
            return Response({'error': 'Bookmark not found'}, status=404)
       except Exception as e:
            return Response({'error': str(e)}, status=400)
       

class reportPost(ratePosts):

    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def post(request):
        postId = request.data.get('postId')  #gets the postId
        username = request.user  #fetches the logged in user

        # Check if the post exists
        if not Post.objects.filter(id=postId).exists():
            return Response({'error': 'Post does not exist'}, status=400)
        post = Post.objects.get(id = postId)

        # Check if the user has already reported the post
        if ReportPosts.objects.filter(username=username, postId=post).exists():
            return Response({'error': 'This user has already reported this post'}, status=400)

        # Create the Report
        ReportPosts.objects.create(username=username, postId=post)
        return Response({'message': 'reported successfully'}, status=201)
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def status(request):
        postId = request.data.get('postId') #gets the postId
        username = request.user #fetch the currently logged in user

        # Check if the user has reported the post
        if ReportPosts.objects.filter(username=username, postId=postId).exists():
            return Response({'message': 'User has reported this post'}, status=201)
        else:
            return Response({'message': 'Not reported by this user'}, status=202)
        
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def delete(request):
       try:
            postId = request.data.get('postId') #gets the postId
            username = request.user #fetches the currently logged in user

            # Check if the post exists
            if not Post.objects.filter(id=postId).exists():
                return Response({'error': 'Post does not exist'}, status=400)
            post = Post.objects.get(id=postId)

            #check if the user deleting is a admin (superuser) or not
            if not username.is_superuser:
                return Response({'error:':'You dont have permission to delete this report'}, status=403)
            
            # Find and delete the report
            report = ReportPosts.objects.get(username=username, postId=post)
            report.delete()
            return Response({'message': 'Report deleted successfully'}, status=200)
       except ReportPosts.DoesNotExist:
            return Response({'error': 'Report not found'}, status=404)
       except Exception as e:
            return Response({'error': str(e)}, status=400)
        
        