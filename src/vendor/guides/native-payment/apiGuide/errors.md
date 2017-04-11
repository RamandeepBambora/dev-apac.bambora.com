# Errors

## Client errors


<table class="table table-highlight">
    <thead>
        <tr>
            <th>Error Code</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a>400</a></td>
            <td>Bad Request</td>
            <td>The API request was not formatted correctly.</td>
        </tr>
        <tr>
            <td><a>401</a></td>
            <td>Unauthorized</td>
            <td>Your API key is wrong or the Authorization header was not set.</td>
        </tr>
        <tr>
            <td><a>403</a></td>
            <td>Forbidden</td>
            <td>You are not authorized for this operation with the authentication you have provided.</td>
        </tr>
        <tr>
            <td><a>404</a></td>
            <td>Not Found</td>
            <td>Unknown path or resource was not found.</td>
        </tr>
        <tr>
            <td><a>409</a></td>
            <td>Payment operation blocked</td>
            <td>The payment was being modified by another request. The attempted operation could be retried again, or the payment could be queried to find out if its properties have changed.</td>
        </tr>
        <tr>
            <td><a>422</a></td>
            <td>Invalid payment state transition</td>
            <td>The state of the payment could not be changed in the way that the payment operation would require.</td>
        </tr>
    </tbody>
</table>

## Server errors

<table class="table table-highlight">
    <thead>
        <tr>
            <th>Error Code</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a>500</a></td>
            <td>Internal Server Error</td>
            <td>We had a problem with our server. Try again later.</td>
        </tr>
        <tr>
            <td><a>502</a></td>
            <td>Bad Gateway</td>
            <td>The server was acting as a gateway or proxy and received an invalid response from the upstream server</td>
        </tr>
        <tr>
            <td><a>503</a></td>
            <td>Service Unavailable</td>
            <td>The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.</td>
        </tr>
        <tr>
            <td><a>504</a></td>
            <td>Gateway Timeout</td>
            <td>The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.</td>
        </tr>
    </tbody>
</table>

## Payment errors

Payments are identified by the type recieved in the error response body.

<table class="table table-highlight">
    <thead>
        <tr>
            <th>Error Code</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a>400</a></td>
            <td>Invalid card information</td>
            <td>The supplied card information is not valid.<br>Tip: Check if there are any typos in the supplied card information.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/invalid_card_information">https://api.bambora.com/definitions/payments/invalid_card_information</a></td>
        </tr>
        <tr>
            <td><a>400</a></td>
            <td>Expired card</td>
            <td>The card is expired and will never be usable again.<br>Tip: Only non-expired cards are accepted.<br><br>
            <i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/expired_card">https://api.bambora.com/definitions/payments/expired_card</a></td>
        </tr>
        <tr>
            <td><a>400</a></td>
            <td>Currency not supported</td>
            <td>The specified currency is not supported in your merchant account.<br>Tip: You can only use currencies that are supported in your merchant account.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/currency_not_supported">https://api.bambora.com/definitions/payments/currency_not_supported</a></td>
        </tr>
        <tr>
            <td><a>402</a></td>
            <td>Cannot authorize</td>
            <td>This payment cannot be authorized.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/cannot_authorize">https://api.bambora.com/definitions/payments/cannot_authorize</a></td>
        </tr>
        <tr>
            <td><a>402</a></td>
            <td>Cannot cancel</td>
            <td>This payment cannot be authorized.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/cannot_authorize">https://api.bambora.com/definitions/payments/cannot_authorize</a></td>
        </tr>
        <tr>
            <td><a>402</a></td>
            <td>Cannot capture</td>
            <td>This payment cannot be captured.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/cannot_capture">https://api.bambora.com/definitions/payments/cannot_capture</a></td>
        </tr>
        <tr>
            <td><a>402</a></td>
            <td>Cannot refund</td>
            <td>This payment cannot be refunded.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/cannot_refund">https://api.bambora.com/definitions/payments/cannot_refund</a></td>
        </tr>
        <tr>
            <td><a>402</a></td>
            <td>Insufficient funds</td>
            <td>The account tied to the card has insufficient funds.<br>Tip: Funds need to be added to the card in order for this operation to work.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/insufficient_funds">https://api.bambora.com/definitions/payments/insufficient_funds</a></td>
        </tr>
        <tr>
            <td><a>404</a></td>
            <td>Payment not found</td>
            <td>The specified payment cannot be found.<br>Tip: Check that you're using a correct payment identifier.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/payment_not_found">https://api.bambora.com/definitions/payments/payment_not_found</a></td>
        </tr>
        <tr>
            <td><a>409</a></td>
            <td>Payment operation blocked</td>
            <td>The payment was being modified by another request. <br>Tip: The attempted operation could be retried or the payment could be queried to check if its properties have changed.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/payment_operation_blocked">https://api.bambora.com/definitions/payments/payment_operation_blocked</a></td>
        </tr>
        <tr>
            <td><a>422</a></td>
            <td>Invalid payment state transition</td>
            <td>This operation cannot be performed due to the state of the payment.<br>Tip: Investigate if a different payment operation can and should be used instead.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/invalid_payment_state_transition">https://api.bambora.com/definitions/payments/invalid_payment_state_transition</a></td>
        </tr>
        <tr>
            <td><a>451</a></td>
            <td>Blocked by Issuer</td>
            <td>This operation has been blocked by the issuing bank.<br>Tip: It may be possible for the cardholder to bypass this by manually allowing Internet purchases through his/her Internet bank or banking app.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/blocked_by_issuer">https://api.bambora.com/definitions/payments/blocked_by_issuer</a></td>
        </tr>
        <tr>
            <td><a>451</a></td>
            <td>Card type not accepted</td>
            <td>The specified card type is not supported in your merchant account.<br>Tip: You can only use card types that are supported in your merchant account.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/card_type_not_accepted">https://api.bambora.com/definitions/payments/card_type_not_accepted</a></td>
        </tr>
        <tr>
            <td><a>451</a></td>
            <td>Invalid card</td>
            <td>The card is invalid and will never be usable again.<br>Tip: Only valid cards are accepted.<br><br><i>Type:</i><br><a href="https://api.bambora.com/definitions/payments/invalid_card">https://api.bambora.com/definitions/payments/invalid_card</td>
        </tr>
    </tbody>
</table>
