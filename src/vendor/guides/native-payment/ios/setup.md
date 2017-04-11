# Setup

Only a merchant account number is necessary to communicate with Bambora through the SDK. However, you will need to use our payment API in order to perform server-side captures, cancels and refunds.

After signing up for a SDK developer account, you will receive a test merchant account number which you can use to implement the setup code in the example.

The example application includes a test merchant number that can be used for testing Native Payment. Please replace this with your own merchant number after signing up with Bambora.

## Step 1: Import

Create a file called [AppDelegate.m](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/AppDelegate.m) and import the SDK.

```objc
#import <BNPayment/BNPayment.h>
```

## Step 2: Setup

Add the following setup code to `application:didFinishLaunchingWithOptions:` method in AppDelegate.m.

```objc
NSError *error;
[BNPaymentHandler setupWithMerchantAccount:@"<MERCHANT_ACCOUNT>" // Required.
                            baseUrl:nil // Optional. Overrides the URL to the SDK backend.
                              debug:NO // Optional. Enables logging in Xcode when set to YES.
                              error:&error];
```

If you provide a test Merchant Account, the SDK will enter `test mode`. If you provide a production Merchant Account, the SDK will enter `production mode`.

The debug setting should be set to NO in live applications.

Any errors will be set to the `error` variable passed in. You can find a full example of [AppDelegate.m](https://github.com/bambora/BNPayment-iOS/blob/master/Example/BNPayment-Example/AppDelegate.m) on our GitHub page.
