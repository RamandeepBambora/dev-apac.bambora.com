---
title: dev/bambora

language_tabs:
  - shell: cURL

toc_above:
- <a href='index.html'>Getting Started</a>
- <a href='checkout.html'>Checkout</a>
- <a href='apis.html'>APIs</a>

includes:

toc_below:
- <a href='backoffice.html'>Backoffice</a>
- <span>Java SDK</span>
- <span>Shopping Carts</span>
- <span>Testing</span>

search: false
---

<script src='js/vendor/clipboard.min.js'></script>
<script src='js/copy.js'></script>

# Overview

You can test the service by copy and pasting the cURL code sample into a text editor, replacing the credential and and then executing the updated code sample in your server.

FYI: The test web service URL is located at: [https://demo.ippayments.com.au/interface/api/dts.asmx](https://demo.ippayments.com.au/interface/api/dts.asmx)

# Submit Single Payment

The list below provides an overview of the available transaction elements that should be submitted in the XML request.

```shell
curl "https://demo.ippayments.com.au/interface/api/dts.asmx"  \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dts="http://www.ippayments.com.au/interface/api/dts">
        <soapenv:Header />
        <soapenv:Body>
          <dts:SubmitSinglePayment>
            <!--Optional:-->
            <dts:trnXML><![CDATA[<Transaction>
          <CustNumber>cust_number</CustNumber>
          <CustRef>any_str</CustRef>
          <Amount>1000</Amount>

          <TrnType>1</TrnType>
          <CreditCard Registered="True">
          </CreditCard>
          <Security>
              <UserName>your_api_username</UserName>
              <Password>your_api_password</Password>
          </Security>
          <UserDefined></UserDefined>
      </Transaction>]]></dts:trnXML>
          </dts:SubmitSinglePayment>
        </soapenv:Body>
      </soapenv:Envelope>'
```

**REQUEST BODY SCHEMA**

Parameter |         | Description
--------- | ------- | -----------
AccountNumber | string(16) | This value dictates which account the transaction will be processed through. Refer to section Account Hierarchy. <br/> <img src="/images/warning.png"> Note: This parameter indicates where the transaction will be processed to.
CustNumber | string(64) | An additional reference for the transaction sent by you for reporting purposes.
CustRef | string(64) | 	A reference for the transaction sent by you for reporting purposes.
Amount | Numeric | Amount entered in cent value e.g. $55.00 = 5500
TrnType | Numeric	| 1 is for Credit Card – Purchase <br/> 2 is for Credit Card - Auth
CardNumber | string(16) | The credit card number. E.g. 1234567890654321
ExpM | string(2) |	Month when the credit card expires.
ExpY | string(4) | Year when the credit card expires.
CVN | string(3) | Card Security Code
CardHolderName | string(1024) |	The name of the credit card holder.  
Security/Username | string(32) |	API Username
Security/Password | string(16) |	API Password

**RESPONSE SCHEMA**

Bambora will return the following response.

```shell
'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<soap:Body>
<SubmitSinglePaymentResponse xmlns="http://www.ippayments.com.au/interface/api/dts">
<SubmitSinglePaymentResult><![CDATA[<Response>
                  <ResponseCode>0</ResponseCode>
                  <Timestamp>23-Feb-2017 16:06:41</Timestamp>
                  <Receipt>90891389</Receipt>
                  <SettlementDate>23-Feb-2017</SettlementDate>
                  <DeclinedCode></DeclinedCode>
                  <DeclinedMessage></DeclinedMessage>
</Response>]]></SubmitSinglePaymentResult>
</SubmitSinglePaymentResponse>
</soap:Body>
</soap:Envelope>'
```

Parameter |         | Description
--------- | ------- | -----------
ResponseCode | string(64) |	Response code of the submitted payment.
Timestamp | string(256) |	Time when the payment transaction is submitted in the following format DD-MM-YYYY hh:mm:ss
Receipt | string(64) |	Receipt number of the submitted payment.
SettlementDate | string(64)	| The settlement date of the submitted payment returned in the following format DD-MM-YYYY
DeclinedCode | string(64) |	This field is blank if the submitted payment is approved, otherwise, declined code is populated.
DeclinedMessage | string(64) |	This field is black if the submitted payment is approved, otherwise, declined message is populated.

# Submit Single Capture

A pre-auth transaction reserves the funds on your customer’s card without debiting the money from the customer’s card. A follow up capture request **must** be sent with this transaction type to settle the transaction, debit the customers card and receive the funds.

```shell
curl "https://demo.ippayments.com.au/interface/api/dts.asmx"  \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dts="http://www.ippayments.com.au/interface/api/dts">
  <soapenv:Header/>
  <soapenv:Body>
  <dts:SubmitSingleCapture>
  <!--Optional:-->
  <dts:trnXML>
  <![CDATA[
  <Capture>
       <Receipt>12345678</Receipt>
       <Amount>5500</Amount>
       <Security>
               <UserName>your_api_username</UserName>
               <Password>your_api_password</Password>
       </Security>
  </Capture>
  ]]>
  </dts:trnXML>
  </dts:SubmitSingleCapture>
  </soapenv:Body>
  </soapenv:Envelope>'
```

Parameter   |           | Description
---------   | -------   | -----------
Capture/Receipt | Numeric | Receipt number issued by Bambora from originally processed authorisation, provided in the authorisation response.
Capture/Amount | Numeric | Amount entered as an integer eg. $55.00 = 5500
Capture/Security/UserName | Alpha/Num | API Username
Capture /Security/Password | Alpha/Num | API Password

**RESPONSE SCHEMA**

Bambora will return the following response.

```shell
'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<soap:Body>
<SubmitSinglePaymentResponse xmlns="http://www.ippayments.com.au/interface/api/dts">
<SubmitSinglePaymentResult><![CDATA[<Response>
                  <ResponseCode>0</ResponseCode>
                  <Timestamp>23-Feb-2017 16:06:41</Timestamp>
                  <Receipt>90891389</Receipt>
                  <SettlementDate>23-Feb-2017</SettlementDate>
                  <DeclinedCode></DeclinedCode>
                  <DeclinedMessage></DeclinedMessage>
</Response>]]></SubmitSinglePaymentResult>
</SubmitSinglePaymentResponse>
</soap:Body>
</soap:Envelope>'
```

Parameter |         | Description
--------- | ------- | -----------
ResponseCode | string(64) |	Response code of the submitted payment.
Timestamp | string(256) |	Time when the payment transaction is submitted in the following format DD-MM-YYYY hh:mm:ss
Receipt | string(64) |	Receipt number of the submitted payment.
SettlementDate | string(64)	| The settlement date of the submitted payment returned in the following format DD-MM-YYYY
DeclinedCode | string(64) |	This field is blank if the submitted payment is approved, otherwise, declined code is populated.
DeclinedMessage | string(64) |	This field is black if the submitted payment is approved, otherwise, declined message is populated.
