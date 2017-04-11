# Making Payments

Once you have set up card registration, from the previous section, and assuming a credit card token is on the device, that card token can be used for making payments in your app.

All you need to do is create a `PaymentSettings` object and supply it the amount (in cents), the currency, and the card token. You can get the card token by first getting the [CreditCard](https://github.com/bambora/BNPayment-Android/blob/master/bn-payment/src/main/java/com/bambora/nativepayment/models/creditcard/CreditCard.java) (using one of the above [Managing cards operations](./managing-cards)) and then calling `getCreditCardToken()` on it.

Once you have the settings you can now process the payment. This method requires three parameters:

* `Payment ID` *(String)*: This is a **unique** ID that you generate. It will help you identify and search for transactions later on.
* `Payment Settings` *(PaymentSettings)*: Your paymentSettings object you just created.
* `Response Callback` *(ITransactionCallBack)*: This is where you handle successful and failed payments.

Successful payments will trigger `onTransactionSuccess()` to be called.

If a payment fails for any reason, the `onTransactionError()` callback method will be called. You can choose what message to show the user, be it a declined purchase or a network error, it is up to you.

The code example shows how to configure and make a payment.

```java
public void makeCreditCardPayment(CreditCard creditCard) {

  // Configure the transaction:
  PaymentSettings paymentSettings = new PaymentSettings();
  paymentSettings.amount = 100;
  paymentSettings.currency = "SEK";
  paymentSettings.creditCardToken = creditCard.getCreditCardToken();

  // Make the transaction:
  BNPaymentHandler.getInstance().makeTransaction("A_UNIQUE_PAYMENT_ID", paymentSettings, new ITransactionCallBack() {
    @Override
    public void onTransactionSuccess() {
      // Handle payment success here.
    }

    @Override
    public void onTransactionError(RequestError error) {
      // Payment payment errors here.
    }
  });
}
```
