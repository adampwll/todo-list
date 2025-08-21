import boto3
import json
import os

# Authenticating the terraform user to retrieve the id token

username = os.environ['TODO_TF_USER']
password = os.environ['TODO_TF_PASSWORD']
clientId = os.environ['TODO_TF_CLIENTID']

client = boto3.client('cognito-idp')

response = client.initiate_auth(
    ClientId=clientId,
    AuthFlow='USER_AUTH',
    AuthParameters={
        'USERNAME': username,
        'PREFERRED_CHALLENGE': "PASSWORD",
        'PASSWORD': password
    },
)

access_token = response["AuthenticationResult"]["AccessToken"]
response = client.get_user(AccessToken=access_token)

print(response)
with open('../id_token.jwt', 'w') as file:
    json.dump(response, file)