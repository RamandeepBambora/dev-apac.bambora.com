# Handing Errors

The SDK can receive a list of different errors from the back end. All payment related error responses will be of type `RequestResponse` and are visible from the error callbacks. If error is null then the error is undefined.

The specific error is identified by the type property, if no type is given the standard meaning of the HTTP error is applied. A tip is to use the types for localization keys in order to display messages depending on the type.

```
201 Created:
    Payment successful

400 Bad Request:
    The API request was not formatted correctly.

401 Unauthorized:
    Your API key is wrong or the Authorization header was not set.

402 Payment required:
    The payment could not be authorized.

409 Payment operation blocked:
    The payment was being modified by another request.
    The attempted operation could be retried again, or the payment
    could be queried to find out if its properties have changed.

422 Invalid payment state transition:
    The state of the payment could not be changed in the way that the
    payment operation would require.

500 Internal Server Error:
    We had a problem with our server. Try again later.
```
