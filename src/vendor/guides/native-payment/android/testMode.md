# Test Mode

The SDK can be used in one of two modes:

* `Test mode` allows you to register test cards and make test payments using those cards. Real credit cards cannot be registered in test mode.

* `Production mode` allows the user to register real credit cards and to make real payments using those cards. Test credit cards cannot be used in production mode.

## How to switch between test and production mode

To enable test mode, you need to supply a test Merchant Account when creating an instance of `BNPaymentBuilder`. To enable production mode, use a production Merchant Number in the same place instead.

You can find a code example in the [Setup section](./setup).

You can use the [Test Cards](../introduction/test-cards) for your testing.
