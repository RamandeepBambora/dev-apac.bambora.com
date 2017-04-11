# Create Payment
This step require that you have a Bambora account and have created an API-key (Authentication Header). If you have not created an API-key please complete the [previous step](/checkout/guides/getting-started/create-account).

------

This page describes how to create a payment with Bambora Checkout, which is the *authorization* of the payment. For information about handling the payments (capture, cancel and refund) these are described in relation with [Handling Payments](/checkout/guides/handling-payments/bambora-backoffice).

## Payment with Bambora Checkout

Creating a payment with Bambora Checkout consists of two steps.

1. Creating a Checkout Session
2. Redirection to the Checkout Session URL

When you create the Checkout Session you submit order information (eg. `amount` and `currency`) to Bambora. In return Bambora provide you with an URL for this specific order. When this URL is visited the Checkout will be loaded, and the order can be paid.

The following sections will describe the two step in details. A complete working example is available [here](#example-checkout-payment).

### Creating a Checkout Session
A Checkout Session relates to an order in your system. When an order has been placed you create a corresponding Checkout Session to receive payment for that order.

The Checkout Session can be created by contructing the following request.

#### Request

<p><span class="badge">POST</span><span class="fg-primary text-sm">https://api.v1.checkout.bambora.com/checkout</span></p>

```json
{
  "order": {
    "id": "123",
    "amount": 9900,
    "currency": "EUR"
  },
  "url": {
    "accept": "https://example.org/accept",
    "cancel": "https://example.org/cancel"
  }
}
```

The `order` object specifies the `amount` and `curreny` for the payment. Please notice that the currency is denoted in minor units. Accept-URL indicates the url that the user is redirected to when the payment has been approved (transaction is authorized). If the user clicks `Cancel` in the Checkout Window a redirection to Cancel-URL will be invoked.

The example request contains only the required fields. Please refer to the [API Reference](/checkout/apis/checkout) for documentation on all available fields.

#### Response
The response contains the url to invoke the Checkout, and the extracted token for the session.

```json
{
  "token": "fb49265d30aa4f1bb327b943c4d43b14",
  "url": "https://v1.checkout.bambora.com/fb49265d30aa4f1bb327b943c4d43b14"
}
```

Once the session has been created you can redirect the user to the URL in order to receive payment. A Checkout Session is valid for *one hour*.

### Redirection to the Checkout Session URL
The redirection to the Checkout Window is done with Javascript. Include the following just after the `<body>`-tag at your webpage.


```html
<!-- Bambora Checkout Window script -->
<script type="text/javascript">
  (function (n, t, i, r, u, f, e) { n[u] = n[u] || function() {
  (n[u].q = n[u].q || []).push(arguments)}; f = t.createElement(i);
  e = t.getElementsByTagName(i)[0]; f.async = 1; f.src = r;
  e.parentNode.insertBefore(f, e)})(window, document, "script", 
  "https://v1.checkout.bambora.com/assets/paymentwindow-v1.min.js", "bam");
</script>
```

When the Javascript has been loaded, you can invoke the Checkout Window by including the following at your webpage. Remember to replace `<CHECKOUT-SESSION-URL>` with the url to the Checkout Session.

```html
<script type="text/javascript">
  var options = {
    windowstate: 2
  }
  bam("open", "<CHECKOUT-SESSION-URL>", options);
</script>
```

This will redirect the user to Checkout Window where the payment can be performed. Next step in the integration is to handle the responses that are returned as a result of the payment. This is described in greater details in [Handle Responses](/checkout/guides/getting-started/handle-responses).

A complete example of creating a Checkout Session and the redirection is available in the next section.

----

<a name="example-checkout-payment"></a> 
## Example: Checkout Payment
The following code performs the two parts of creating a Checkout Payment, that is:

1. Creating a Checkout Session
2. Redirection to the Checkout Session URL.

To excute this example save the content in a `.php`-file and insert your `accessToken`, `merchantNumber` and `secretToken`.

```html
<?php
  $accessToken = "YOUR-ACCESS-TOKEN";
  $merchantNumber = "YOUR-MERCHANT-NUMBER";
  $secretToken = "YOUR-SECRET-TOKEN";
  $apiKey = base64_encode(
    $accessToken . "@" . $merchantNumber . ":" . $secretToken
  );
  
  $checkoutUrl = "https://api.v1.checkout.bambora.com/sessions";
  
  $params = array();
  $params["order"] = array();
  $params["order"]["id"] = "ABC123";
  $params["order"]["amount"] = "195";
  $params["order"]["currency"] = "DKK";

  $params["url"] = array();
  $params["url"]["accept"] = "https://example.org/accept";
  $params["url"]["cancel"] = "https://example.org/cancel";

  $jsonData = json_encode($params);

  $contentLength = isset($jsonData) ? strlen($jsonData) : 0;

  $headers = array(
    'Content-Type: application/json',
    'Content-Length: ' . $contentLength,
    'Accept: application/json',
    'Authorization: Basic ' . $apiKey
  );

  $curl = curl_init();

  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
  curl_setopt($curl, CURLOPT_URL, $checkoutUrl);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_FAILONERROR, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  $rawResponse = curl_exec($curl);

  $response = json_decode($rawResponse);
?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Checkout example</title>
  </head>
  <body>
    <?php
      if($response->meta->result) { //Create Checkout session OK
    ?>

    <script type="text/javascript">
    (function (n, t, i, r, u, f, e) { n[u] = n[u] || function() {
    (n[u].q = n[u].q || []).push(arguments)}; f = t.createElement(i);
    e = t.getElementsByTagName(i)[0]; f.async = 1; f.src = r; 
	e.parentNode.insertBefore(f, e)})(window, document, "script", 
    "https://v1.checkout.bambora.com/assets/paymentwindow-v1.min.js", "bam");
    </script>

    <script type="text/javascript">
    var options = {
    windowstate: 2
    }
    bam("open", "<?php echo $response->url ?>", options);
    </script>

    <?php
      } else { //Create Checkout session fail
    ?>

    <p>Error: <?php echo $response->meta->message->enduser; ?></p>

    <?php 
      }
    ?>
  </body>
</html>
```
