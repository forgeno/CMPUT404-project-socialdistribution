from requests_futures.sessions import FuturesSession
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from ..models import Follow, AuthorProfile, ServerUser
from ..serializers import AuthorProfileSerializer
import requests
import json
from urllib.parse import urlparse
from django.conf import settings


class CheckFollowersView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, authorid):
        if (self.kwargs['authorid'] == ""):
            return Response("Error: Author ID required!", status.HTTP_400_BAD_REQUEST)

        parsed_url = urlparse(authorid)
        author_host = '{}://{}/'.format(parsed_url.scheme, parsed_url.netloc)

        follow_list_data = []
        print("authorid", authorid)

        session = FuturesSession()
        foreign_requests = []

        for follower in Follow.objects.filter(authorB=authorid, status="FOLLOWING"):
            follower_fulll_id = follower.authorA
            tmp_follower_data = follower_fulll_id.split("author/")
            follower_host = tmp_follower_data[0]
            follower_author_profile_id = tmp_follower_data[1]
            print("follower_fulll_id", follower_fulll_id)
            print("author_host", author_host)
            print("follower_host", follower_host)

            if author_host == follower_host or follower_host == settings.BACKEND_URL:
                follower_profile = AuthorProfile.objects.get(id=follower_author_profile_id)
                serialized_author_profile = AuthorProfileSerializer(follower_profile)
                follow_list_data.append(serialized_author_profile.data)
            else:
                try:
                    print("this is foreign author")
                    server_user = ServerUser.objects.get(host=follower_host)
                    print(server_user)
                    url = "{}{}author/{}".format(server_user.host, server_user.prefix, follower_author_profile_id)
                    print(url)
                    headers = {'Content-type': 'application/json'}
                    # response = requests.get(url,
                    #                         auth=(server_user.send_username, server_user.send_password),
                    #                         headers=headers)
                    # if response.status_code == 200:
                    #     follow_list_data.append(json.loads(response.content))

                    foreign_requests.append(session.get(url,
                                                        auth=(server_user.send_username,
                                                              server_user.send_password),
                                                        headers=headers)
                                            )
                    for response in foreign_requests:
                        try:
                            result = response.result()
                            if (result.status_code == 200):
                                print("inside 200")
                                print(result.json())
                                follow_list_data.append(result.json())
                        except:
                            print("exception when join back followers endpoint")
                            pass
                except Exception as e:
                    # ignore and just not add into follower list if cant get from server
                    print("check followers exception")
                    print(e)
                    pass

        response_data = {
            "query": "followers",
            "authors": follow_list_data
        }
        return Response(response_data, status.HTTP_200_OK)
