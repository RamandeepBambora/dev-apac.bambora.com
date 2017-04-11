# Authentication

You need to authenticate yourself in order to use our Payments API.

We are currently updating our API and temporarily distributing credentials for both test accounts and production accounts manually.

* Please mail us at [native.support@bambora.com](mailto:native.support@bambora.com) to request API credentials for test accounts.

* Using your credentials, you can request a JSON Web Token (JWT). The code examples show how to request a JWT.

* After receiving a JWT from us, you can use it for making requests through our Payments API.

Production credentials requires signing an agreement with Bambora. Please email [sales.ecom@bambora.com](mailto:sales.ecom@bambora.com) if you are ready to sign up for a production account.

## Request

**cURL example**

```shell
CLIENT_ID="<CLIENT_ID>"
CLIENT_SECRET="<CLIENT_SECRET>"
AUTHORIZATION="Authorization: Basic "$(echo -n ${CLIENT_ID}:${CLIENT_SECRET} | base64)

SCOPES=("auth_token_payment"
        "cancel_payment"
        "capture_payment"
        "read_payment"
        "refund_payment"
)

TOKEN_URL="https://auth.bambora.com/connect/token"

RESPONSE=$(
    curl \
        --request POST \
        --header "${AUTHORIZATION}" \
        --data "grant_type=client_credentials" \
        --data "scope=${SCOPES[*]}" \
        "${TOKEN_URL}" \
        --silent
)
```

**Python example**

```python
import requests

CLIENT_ID = '<CLIENT_ID>'
CLIENT_SECRET = '<CLIENT_SECRET>'

SCOPES = [
    'auth_token_payment',
    'cancel_payment',
    'capture_payment',
    'read_payment',
    'refund_payment'
]

URL = 'https://auth.bambora.com/connect/token'

response = requests.post(
    URL,
    auth=(CLIENT_ID, CLIENT_SECRET),
    data={'grant_type': 'client_credentials',
          'scope': SCOPES}
)

TOKEN = str(response.json()['access_token'])
```

> The Python code example requires the [Requests](http://docs.python-requests.org/en/master/) library.
