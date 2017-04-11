# Create Account
The first step in setting up a shopping cart integration is to create a Bambora account. Please select your country below to create an account.

* [Get a free test account - Sweden](https://boarding.bambora.com/checkoutaccount-se)
* [Get a free test account - Norway](https://boarding.bambora.com/checkoutaccount-no)
* [Get a free test account - Denmark](https://boarding.bambora.com/checkoutaccount-dk)
* [Get a free test account - Finland](https://boarding.bambora.com/checkoutaccount-fi)

Once your account is created you are granted access to [Bambora Backoffice](https://merchant.bambora.com). From within the backoffice you can setup the appropiate credentials you need in order to configure your shopping cart.

## Create an API-user
Your shopping cart system will communicate with Bambora systems through an API. For this reason you need an API-user which is created from the Bambora Backoffice.

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

These informations are used when you configure your shopping cart. The next step is the follow the provided guides for your chosen shopping cart system. Currently Bambora Checkout is supported in the following shopping carts:

* [Magento](/shopping-carts/guides/shopping-carts/magento)
* [Magento 2](/shopping-carts/guides/shopping-carts/magento2)
* [PrestaShop](/checkout/guides/getting-started/create-payment)
* [WooCommerce](/shopping-carts/guides/shopping-carts/woocommerce)