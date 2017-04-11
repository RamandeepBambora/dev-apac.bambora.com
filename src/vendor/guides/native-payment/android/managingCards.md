# Managing Cards

You can run standard read, update, and delete operations on the credit card tokens stored on the device by accessing the `BNPaymentHandler.getInstance()` object.

## Get All Cards

This code example will get all registered cards on the device and starts by checking if any credit cards have been selected and then proceeds to select the credit card that was registered first. The `getRegisteredCreditCards` function reads all stored credit card tokens from local storage asynchronously and notifies the IOnCreditCardRead listener of the result.

```java
BNPaymentHandler.getInstance().getRegisteredCreditCards(MainActivity.this, new CreditCardManager.IOnCreditCardRead() {
  @Override
  public void onCreditCardRead(List<CreditCard> creditCards) {
    if (creditCards != null && creditCards.size() > 0) {

      /* The List object creditCards contains all of the CreditCard objects that have been stored on the device.
      Each CreditCard object contains a credit card token.
      You can print the creditCards list to the console log like this: */
      Log.d("CreditCardList", creditCards.toString());

      // How to get a specific credit card object:
      String creditCard = creditCards.get(0);

    }
  }
}
```

## Get Card Details

Building on the above example, this code on the right shows how to read information from a credit card object.

```java
// Get credit card alias:
creditCard.getAlias();

// Get truncated credit card number:
creditCard.getTruncatedCardNumber();

// Get credit card token
creditCard.getCreditCardToken();
```

## Delete Card Token

When a credit card is registered, a credit card token is saved on the device. This token is necessary in order to make a payment, as the code example in the [Making Payments section](./making-payments) shows. This section contains code examples showing how to get and remove credit card tokens from the device.

The `getRegisteredCreditCards` function deletes a specific stored credit card token from local storage.

```java
public void deleteCreditCard(CreditCard creditCard) {

  BNPaymentHandler.getInstance().deleteCreditCard(this, creditCard.getCreditCardToken(), new IOnCreditCardDeleted() {
    @Override
      public void onCreditCardDeleted() {
         // Credit card was successfully deleted.
      }
  });

}
```
