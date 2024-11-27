from django.urls import path
from .views import UserHandling,modifyUser
from .views import PostCreateView
from .views import PostHandling,ratePosts,upvotePost, downvotePost, bookmarkPost, reportPost
from .views import AnswerListCreate
from .views import PostDetail,PostList

urlpatterns = [
    path('register/', UserHandling.register, name='register'),
    path('signin/', UserHandling.signin, name='signin'),
    path('forms2/', PostCreateView.as_view(), name='post-create'),
    path('post/delete/', PostHandling.delete_post, name='post-delete'),
    path('session/', UserHandling.session_check, name='session_check'),
    path('logout/', UserHandling.logout, name='logout'),
    path('updateUser/',modifyUser.updateUser, name='updateUser'),
    path('dashboard/',UserHandling.dashboard, name='dashboard'),
    path('upvote/post/', upvotePost.post, name='upvote-post'),
    path('upvote/post/status/',upvotePost.status, name='upvote-status'),
    path('upvote/post/delete/',upvotePost.delete, name='upvote-delete'),
    path('downvote/post/', downvotePost.post, name='downvote-post'),
    path('downvote/post/status/',downvotePost.status, name='downvote-status'),
    path('downvote/post/delete/',downvotePost.delete, name='downvote-delete'),
    path('bookmark/post/', bookmarkPost.post, name='bookmark-post'),
    path('bookmark/post/status/',bookmarkPost.status, name='bookmark-status'),
    path('bookmark/post/delete/',bookmarkPost.delete, name='bookmark-delete'),
    path('report/post/', reportPost.post, name='report-post'),
    path('report/post/status/',reportPost.status, name='bookmark-status'),
    path('report/post/delete/',reportPost.delete, name='bookmark-delete'),
    path('viewPost/', PostList.as_view(), name='view-posts'),
    path('viewPost/<int:pk>/', PostDetail.as_view(), name='view-post-detail'),  # New detail view
    path('viewPost/<int:postId>/answers/', AnswerListCreate.as_view(), name='answer-list-create'),
]
