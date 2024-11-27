from django.shortcuts import render
from .user import UserHandling
from .forms2 import PostCreateView
from .user import UserHandling,modifyUser
from .forms2 import PostCreateView
from .post import PostHandling, ratePosts, upvotePost, downvotePost, bookmarkPost, reportPost
from .viewPost import PostDetail,PostSerializer
from .answers import AnswerListCreate,AnswerDetail,upvoteAnswer,downvoteAnswer,AnswerHandling
from .viewPost2 import PostList