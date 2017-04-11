# Making Payments

Assuming you have already set up credit card registration in the previous steps, and you have a credit card token is registered on the device, it is now time to make payments in your app.

The first step is to build up a list of payment parameters in a [BNPaymentParams](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNPaymentParams.h) object. Here are the parameters you must supply to it:

* `paymentIdentifier`: A unique ID string to identify the payment
* `currency`: A currency code in ISO-4217 format.
* `amount`: Payment amount expressed in cents. For example 100 SEK would be 10000.
* `token`: The token from the [BNAuthorizedCreditCard](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNAuthorizedCreditCard.h).
* `comment`: A comment about the payment.

You will use `BNAuthorizedCreditCard.creditCardToken` as the card token identifier when making the payment. This is set in the `token` parameter of BNPaymentParams.

With the BNPaymentParams created you can pass it, along with a code block callback, to `makePaymentWithParams: result:`. The code block callback is where you will handle the result of the payment.

A successful payment will set the `BNPaymentSuccess` parameter; a failed payment will set the `NSError` parameter.

```objc
// Get a list of all authorized credit card tokens
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards objectAtIndex:0];

BNPaymentParams *paymentSettings = [BNPaymentParams new];
paymentSettings.paymentIdentifier = <UNIQUE_ID>; // A unique string to identify the payment
paymentSettings.currency = <CURRENCY>; // A currency code in ISO-4217 format.
paymentSettings.amount = <AMOUNT>; // Payment amount expressed in cents.
paymentSettings.token = creditCard.creditCardToken;
paymentSettings.comment = <COMMENT>; // Comment about the payment

// This function makes the payment based on the above settings and then returns a result.
[[BNPaymentHandler sharedInstance]
    makePaymentWithParams:paymentSettings
    result:^(BNPaymentResult result, NSError *error) {
        if (result == BNPaymentSuccess) {
            // Payment succeeded
        } else {
            // Payment failed
            // Use *error parameter to get the message to display to the user
        }
    }];
}
```
