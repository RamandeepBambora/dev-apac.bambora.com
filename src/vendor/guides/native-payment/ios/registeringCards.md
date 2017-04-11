# Registering Cards

Once you have added the SDK to your project, you can begin to register cards.

Credit card registration is done through a native registration form that comes with the SDK. All credit card details will automatically be encrypted before they are sent to our servers and the app will use card Tokens to perform any payment processing. For registering the cards you have the option of:

* Using the default form
* Creating a customized form
* Using a hosted web-based form

## Display the form

```objc
// Create an instance of `BNCreditCardRegistrationVC`
BNCreditCardRegistrationVC *vc = [BNCreditCardRegistrationVC new];
vc.completionBlock = ^(BNCCRegCompletion completion, BNAuthorizedCreditCard *card){
    // Handle completion here
};

[self.navigationController pushViewController:vc animated:YES];
```

The first step is to display the Card Registration form. The SDK comes with a default form that you can use. If you would like to customize the look and feel then you can jump to the section on [customization](./customization).

Displaying the default form is done by creating a view controller using `BNCreditCardRegistrationVC `, as demonstrated in the sample code.

When a credit card is successfully registered you will receive a [BNAuthorizedCreditCard](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNAuthorizedCreditCard.h). From that you can retrieve a `creditCardToken` that can be used to [make a payment](./making-payments).

The method `registerCreditCard` in the [source code](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/ViewController.m) of the Sample App shows how to handle card registration.
