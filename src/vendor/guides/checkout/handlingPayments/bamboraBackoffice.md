# Bambora Backoffice
Transaction operations can be performed either using the Bambora Backoffice or by using the API. If you prefer using system-to-system integration, please read [Handling With API](/checkout/guides/handling-payments/handling-with-api). The following will describe the manual handling fra with Bambora Backoffice.

----

This section describes how to handle transactions after an authorization has been made. Three different operations can be beformed with an authorized transaction.

1. Capture: Collect the money from the users bank account
2. Credit: Refunded money back to the users bank account
3. Delete: Cancel an approved transaction by deleting the authorization

Credit is only available when a capture has been performed. Likewise it is only possible to delete an authorization until it has been captured.

When you log into [Bambora Backoffice](https://merchant.bambora.com) you will be presented with a list of payments. Make sure to select the correct merchant in the top-right corner.

![bambora-backoffice-payments](/assets/images/bambora-backoffice-payments.png)
<label>List of payments in Bambora Backoffice</label>

In the right part of the payments list you are presented on available options for each transaction. When you click either `Capture` or `Refund` you are prompted to enter an amount. This enables you to do part-capture and part-refund.

![bambora-backoffice-capture](/assets/images/bambora-backoffice-capture.png)
<label>Capture and refund payments in Bambora Backoffice</label>

Click the arrow on the `Capture`-button to present the option to cancel a transaction.

![bambora-backoffice-payment-operations](/assets/images/bambora-backoffice-payment-operations.png)
<label>Delete authorization in Bambora Backoffice</label>

When a transaction is either refunded or cancelled only the `Details`-button is available.

