# Handling Errors

The SDK can receive a list of different errors from the back end.

All payment related error codes will be of type [BNErrorResponse](https://github.com/bambora/BNPayment-iOS/blob/master/BNPayment/Core/Models/BNErrorResponse.h) and can be retrieved using the `NSError+BNError` category. The specific error is identidied by the type property, if no type is given the standard meaning of the HTTP error is applied. A tip is to use the types for localization keys in order to display messages depending on the type.
