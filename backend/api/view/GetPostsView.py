from rest_framework import generics, permissions, status
from rest_framework.response import Response
from ..models import Post, AuthorProfile
from ..serializers import PostSerializer, AuthorProfileSerializer
from .Util import *


class GetPostsView(generics.GenericAPIView):
    serializer_class = AuthorProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, authorid):
        author_id = self.kwargs['authorid']
        if(author_id == ""):
            status_code = status.HTTP_400_BAD_REQUEST
            return Response("Error: no author id was specified", status_code)
        else:
            try:
                author_profile = AuthorProfile.objects.get(id=author_id)
                author_posts = Post.objects.filter(author=author_profile, ).order_by("-published")
                posts = None
                isOwnPostsAuthor = str(author_id) == str(request.user.authorprofile.id)
                posts = PostSerializer(author_posts, many=True).data
                posts_response = []

                user_profile = AuthorProfile.objects.get(user=request.user)
                request_user_full_id = get_author_id(user_profile, False)
                for post in posts:
                    sorted_comments= sorted(post["comments"], key=lambda k: k['published'], reverse=True)
                    post["comments"] = sorted_comments
                    if(can_read(request_user_full_id, post) or isOwnPostsAuthor):
                        posts_response.append(post)

                    response_data = {
                        "query": "posts",
                        "count": len(posts_response),
                        "posts": posts_response
                    }
                return Response(response_data, status.HTTP_200_OK)

            except:
                return Response("Error: Author does not exist!", status.HTTP_400_BAD_REQUEST)
