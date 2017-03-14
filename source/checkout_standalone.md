---
title: dev/bambora

toc_above:
- <a href='index.html'>Getting Started</a>
- <a href='checkout.html'>Checkout</a>

includes:

toc_below:
- <a href='apis.html'>APIs</a>
- <a href='backoffice.html'>Backoffice</a>
- <span>Java SDK</span>
- <span>Shopping Carts</span>
- <span>Testing</span>


search: false
---
<script src='js/vendor/clipboard.min.js'></script>
<script src='js/copy.js'></script>

Checkout Standalone provides our merchant with the ability to securely and efficiently process online, real-time payments.

The page does not require integration allowing a quick and easy setup. You can simply direct the customer to a predefined URL which will show the payment page. Once the transaction is processed, it will display the result to your customer.

Let's go!

**Payment**

To process a customer’s real time purchase transaction, embed the URL link along with the standalone settings along with your **AccountNumber** and **Amount**.


Parameter         | Description
----------------- | ---------------------
DL                | This value is used to specify the styling and functionality Bambora should display to your customer. Please find the below DLs to initate corresponding payment page. <br /><br /> 1. Specify the amount the customer will purchase - standardhpp_checkout_standalone_hpp_purchase <br/> 2. Specify the amount the customer will pre authorise - checkout_standalone_hpp_preauth <br/> 3. Allow the customer to enter the amount of their choice - standardhpp_hpp_purchase <br/> 4. Allow the customer to enter the amount to preauth - standardhpp_hpp_preauth
Account&nbsp;Number    | This value dictates which account the transaction will be processed through. If this value is not populated, the transaction will be processed to the account tied to the username field. <br /><br/> <img src="/images/warning.png"> Note: AccountNumber is sent through via the onboarding email.
Amount            | Amount entered in cent value e.g. $55.00 = 5500
Example&nbsp;Checkout Standalone&nbsp;purchase&nbsp;page	 | [https://demo.bambora.co.nz/access/index.aspx?a=85569861&dl=standardhpp_checkout_standalone_hpp_purchase&accountnumber=Exa-5149&amount=1000"] (https://demo.bambora.co.nz/access/index.aspx?a=85569861&dl=standardhpp_checkout_standalone_hpp_purchase&accountnumber=Exa-5149&amount=1000)

[<-- Go to Checkout](/checkout.html)
