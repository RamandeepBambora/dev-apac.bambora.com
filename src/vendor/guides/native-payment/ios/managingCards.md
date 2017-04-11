# Managing Cards

When cards have been registered on the device you can use the SDK to:

* get all cards
* get a specific card
* remove a card

The following code sample shows how to perform all of those operations:

```objc
// Check if any credit card token has been registered:
if (registeredCards.count > 0) {
    // One or more credit cards have been registered in the app
}

// Get a list of all registered credit cards
NSArray<BNAuthorizedCreditCard *> *registeredCards = [[BNPaymentHandler sharedInstance] authorizedCards];

// Get a specific registered credit card (in this case, the first one in the list):
BNAuthorizedCreditCard *creditCard = [registeredCards firstObject];

// Remove a registered credit card from the device:
BNPaymentHandler *paymentHandler = [BNPaymentHandler sharedInstance];
[paymentHandler removeAuthorizedCreditCard:creditCard];

```

You can also check out the example app and see what it does to [manage](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/ViewController.m) the registered cards.

The next step is to make a payment with the registered card.
