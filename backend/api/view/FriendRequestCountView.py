from rest_framework import generics, permissions, status
from rest_framework.response import Response
from ..models import Follow
from .Util import *


class FriendRequestCountView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        try:
            author_profile = AuthorProfile.objects.get(user=request.user)
            author_full_id = get_author_id(author_profile, False)
            query_set = Follow.objects.filter(authorB=author_full_id, status="FOLLOWING")

            response_data = {
                "count": len(query_set)
            }
            return Response(response_data, status.HTTP_200_OK)
        except:
            return Response("Error: Author does not exist", status.HTTP_400_BAD_REQUEST)
