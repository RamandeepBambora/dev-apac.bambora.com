# Handle Responses

This section is part of the guide describing how to integration Bambora Checkout. To handle the responses please make sure that you have [created a payment](/checkout/guides/getting-started/create-payment).

----
Handling responses from Bambora Checkout is important. It enables you to update your order dependent on the result of the payment and ensure a good user flow. 

Bambora Checkout provides three kinds of responses you should handle to ensure a complete and robust user experience.

1. Accept-URL
2. Cancel-URL
3. Callback-URL

Accept-URL and Cancel-URL are required fields when you create a Checkout Session. Callback-URL is optional, but it is highly recommended to implement handling of the callback.

## Accept- and Cancel-URL
The accept- and cancel-URL are similar in that sense, that they both involve the user who is performing the payment. Both are invoked as a `GET`-request as redirects the user like the following.

When the payment is complete and the user click *Back to shop* the accept-URL is invoked. This means that the payment was a success and the receipt page could be shown to the user.

If the user decides the click *Cancel* from the Checkout Window the cancel-URL is invoked. The cancel-URL does not indicate what went wrong, only that the payment has not been complete.

It is not recommeded do apply any order specific logic on either accept- or cancel-URL. It is not guaranteed that they will be invoked, since the user is present. There could various reason for the urls not to be invoked like computer shutdown, browser being closed, entering a new page, etc.

## Callback-URL
The callback-URL will be invoked when the payment is complete and the transaction has been authorized. Unlike accept- and cancel-URL the callback-URL is system-to-system which means delivery is guaranteed.

Once the payment is complete the callback-URL is invoked as a `GET`-request to notify your system that the payment has been approved. If for some reason the response of the callback is not a `200 OK`, the callback is added to a queue. Queued callbacks are retried one time each hour for 24 hours, after which they are marked as undeliverable.

As the transaction is authorized the first callback (instant callback) is invoked. Please notice that a low timeout is attached to this callback, since the user is waiting for the payment to complete in the Checkout Window. If your system does not reply `200 OK` within 5 seconds the callback is terminated and added to the queue.

## Configure the URLs
The configuration of the different URLs is done when creating the Checkout Session. Assign an object of URLs as follow to the `url`-parameter.

```json
{
  "accept": "https://example.org/accept",
  "callbacks": [
  {
    "url": "https://example.org/callback"
  }
  ],
  "cancel": "https://example.org/accept"
}
```

Notice that it is possible to assign an array of callback-URLs if you want to notify different systems about the transaction authorization. Please refer the the [API reference](/checkout/apis/checkout) for all available parameters.

## Validate Accept- and Callback-URL
When a payment is complete the accept-URL and callback-URLs are invoked. To enable you to update the order as a result of the payment, information is appended to the URLs. The same parameters are added to both the accept- and callback-URL, as illustrated through the following example:


```html
https://example.org/accept?amount=1200&orderid=136&hash=4ebab1b14fe6a473cd1413728eca332e
https://example.org/callback?amount=1200&orderid=136&hash=4ebab1b14fe6a473cd1413728eca332e
```

In this example `amount` and `orderid` are added are parameters alongside with the `hash`-value. The `hash` enables you to validate the request and thereby protect you from fradulent request.

The `hash` is an `md5`-hash and is calculated by hashing the following string:

1. Extract all values from the request, except the `hash`
2. Concatenate these values
3. Append the MD5-key for your API-user.

Using the mentioned parameters it would yield the following string:

```html
string = 1200136<md5key>
calculated hash = 4ebab1b14fe6a473cd1413728eca332e
```

If the calculated `hash` is equal to the `hash` present in the request, the request is valid. Remember to enter your own MD5-key from the API-user. The MD5-key can be extract from the Bambora Backoffice:

1. Log in to Bambora Backoffice
2. Select `Settings` -> `Merchant numbers` from the sidebar.
3. Click `Edit` for the particular merchant number
4. Locate the MD5 key in the textbox labeled `MD5 key`

The example provided only contains two parameters and the following presents all available parameters. It is advice to implement robust handling of the hash-validation since new parameters could be added by Bambora.

### Available parameters
<table class="table"><thead>
<tr>
<th>Property name</th>
<th>DataType</th>
<th>Description</th>
<th style="text-align: center">Always returned</th>
</tr>
</thead><tbody>
<tr>
<td><strong>txnid</strong></td>
<td>Number</td>
<td>Transaction ID</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>orderid</strong></td>
<td>String</td>
<td>The merchants order ID</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>reference</strong></td>
<td>String</td>
<td>Reference used by some acquirers ex. Evry</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>amount</strong></td>
<td>Number</td>
<td>The amount to be paid in minor units</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>currency</strong></td>
<td>String</td>
<td>Currency code as ISO-4217. Ex. DKK, SEK</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>date</strong></td>
<td>Number</td>
<td>In the format yyyyMMdd</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>time</strong></td>
<td>Number</td>
<td>In the format HHmm</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>feeid</strong></td>
<td>Number</td>
<td>The agreement and payment type used in the transaction</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>txnfee</strong></td>
<td>Number</td>
<td>The fee amount in minor units</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>paymenttype</strong></td>
<td>Number</td>
<td>Ex. Visa, MasterCard, Invoice</td>
<td style="text-align: center">Yes</td>
</tr>
<tr>
<td><strong>cardno</strong></td>
<td>String</td>
<td>Card number</td>
<td style="text-align: center">No</td>
</tr>
<tr>
<td><strong>expmonth</strong></td>
<td>Number</td>
<td>Expire month 1-12. Only present when the payment created a subscription</td>
<td style="text-align: center">No</td>
</tr>
<tr>
<td><strong>expyear</strong></td>
<td>Number</td>
<td>Expire year 0-99. Only present when the payment created a subscription</td>
<td style="text-align: center">No</td>
</tr>
<tr>
<td><strong>subscriptionid</strong></td>
<td>Number</td>
<td>Only present when the payment created a subscription</td>
<td style="text-align: center">No</td>
</tr>
<tr>
<td><strong>eci</strong></td>
<td>String</td>
<td>Electronic Commerce Indicator</td>
<td style="text-align: center">No</td>
</tr>
<tr>
<td><strong>hash</strong></td>
<td>String</td>
<td>The hashed value of all parameters plus the MD5 key</td>
<td style="text-align: center">Yes</td>
</tr>
</tbody></table>

Next step in the proces of integration Bambora Checkout is to [test your integration](/checkout/guides/getting-started/test-your-setup) by performing test transactions.