# Setup

Only a merchant account number is necessary to communicate with Bambora through the SDK. However, you will need to use our payment API in order to perform server-side captures, cancels and refunds.

After signing up for a SDK developer account, you will receive a test merchant account number which you can use to implement the setup code in the example.

The example application includes a test merchant number that can be used for testing Native Payment. Please replace this with your own merchant account number after signing up with Bambora.

## Register Handler

Here you register a Handler by using the `BNPaymentBuilder` to build it for you using your Merchant Account.

Add the following code at the beginning of the `onCreate method` in the `MainActivity class`, and be sure to swap out `<MERCHANT_ACCOUNT>` with your test Merchant Account ID. When you launch the app for production use your production Merchant Account ID.

```java
BNPaymentBuilder BNPaymentBuilder = new BNPaymentBuilder(getApplicationContext())
               .merchantAccount(MERCHANT_ACCOUNT)
               .debug(true);

BNPaymentHandler.setupBNPayments(BNPaymentBuilder);
```

> The debug setting enables logging through logcat if set to true (and disables logging if set to false). The debug setting should be set to false in live applications.

If you provide a test Merchant Account, the SDK will enter test mode. If you provide a production Merchant Account, the SDK will enter production mode.