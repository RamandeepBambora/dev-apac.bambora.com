# Handling with API
Transaction operations can be performed either using the Bambora Backoffice or by using the API. If you prefer manual operations of transactions, please read [Bambora Backoffice](/checkout/guides/handling-payments/bambora-backoffice). The following will describe handling transactions with API.

----

This section describes how to handle transactions after an authorization has been made. Three different operations can be beformed with an authorized transaction.

1. Capture: Collect the money from the users bank account
2. Credit: Refunded money back to the users bank account
3. Delete: Cancel an approved transaction by deleting the authorization

Credit is only available when a capture has been performed. Likewise it is only possible to delete an authorization until it has been captured.

The three operations are done using the Transaction-API, please refer to the [API-reference](/checkout/apis/transaction) for the full specification. Common for all of these operations is that they require the transaction ID. It is return on both accept-url and callback-url as the parameter `txnid`.

## Capture a transaction

<p><span class="badge">POST</span><span class="fg-primary text-sm">https://transaction-v1.api-eu.bambora.com/transactions/{transactionid}/capture</span></p>

The body in the `POST`-request can be left empty, which would capture the full transaction amount. If you want to to a part capture enter the amount in the `body`.

```json
{
  "amount": 9900
}
```

## Credit a transaction

<p><span class="badge">POST</span><span class="fg-primary text-sm">https://transaction-v1.api-eu.bambora.com/transactions/{transactionid}/credit</span></p>

When performing a credit on a transaction with a capture amount, the body should contain the desired amount to refund.

```json
{
  "amount": 1900
}
```

## Delete a transaction

<p><span class="badge">POST</span><span class="fg-primary text-sm">https://transaction-v1.api-eu.bambora.com/transactions/{transactionid}/delete</span></p>

The body in this `POST`-request is not required an can be left empty. For advanced usage of this operation, please refer to the [API-reference](/checkout/apis/transaction).