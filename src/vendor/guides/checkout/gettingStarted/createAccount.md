# Create Account
The first step in the integration is to create a Bambora account. Please select your country below to create an account.

* [Get a free test account - Sweden](https://boarding.bambora.com/checkoutaccount-se)
* [Get a free test account - Norway](https://boarding.bambora.com/checkoutaccount-no)
* [Get a free test account - Denmark](https://boarding.bambora.com/checkoutaccount-dk)
* [Get a free test account - Finland](https://boarding.bambora.com/checkoutaccount-fi)

Once your account is created you are granted access to [Bambora Backoffice](https://merchant.bambora.com). From the backoffice you can set up the appropiate credentials you need to access our API.

## Get access to the API
Secure access to the Bambora Checkout API is granted through Basic Authentication, and for this you need an API-user. Please follow the following steps to create the API-user.

1. Log in to Bambora Backoffice
2. Select `Settings` -> `API users` from the sidebar.
3. Click `Create API user`
4. Enter `Email` and `Description`
5. Click `Create API user`
6. Save the displayed information

When the API-user is created please write down the following information as is displayed. Please note: **The secret token is only shown once!**

* Merchant Number
* Access Token
* Secret Token
* MD5 Key

### Prepare Authentication Header
Basic HTTP authentication consists of a `base64` encoded username and password where username and password is defined as follows:

```
username = accesstoken@merchantnumber
password = secrettoken
```

An example of a constructed Authentication Header is shown below. Please remember to use your own information from the API-user. Remember that the `secrettoken` _must_ be kept secret and is not to be shared.

```
Before encoding: accesstoken@merchantnumber:secrettoken
After encoding: YWNjZXNzdG9rZW5AbWVyY2hhbnRudW1iZXI6c2VjcmV0dG9rZW4=
```

With the Authentication Header you are ready to continue to next step, which is to [create a payment](/checkout/guides/getting-started/create-payment).