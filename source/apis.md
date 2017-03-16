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
- <a href='sdk.html'>Java SDK</a>
- <a href='shippingcart.html'Shopping Carts</a>
- <a href='testing.html'>Testing</a>

search: false
---

<script src='js/vendor/clipboard.min.js'></script>
<script src='js/copy.js'></script>

# Overview

Bambora have developed two APIs; one for taking payments and the other for reporting. We've made these integrations as simple as possible so you can get started quickly.  

#Payment API
## Overview
You can test the service by copy and pasting the cURL code sample into a text editor, replacing the credential and and then executing the updated code sample in your server.

FYI: The test web service URL is located at: [https://demo.ippayments.com.au/interface/api/dts.asmx](https://demo.ippayments.com.au/interface/api/dts.asmx)

## Purchase & Pre - Auth

The list below provides an overview of the available transaction elements that should be submitted in the XML request.

```shell
curl "https://demo.ippayments.com.au/interface/api/dts.asmx"  \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dts="http://www.ippayments.com.au/interface/api/dts">
<soapenv:Header/>
<soapenv:Body>
<dts:SubmitSinglePayment>
<!--Optional:-->
<dts:trnXML>
<![CDATA[
<Transaction>
    <CustNumber>any_str</CustNumber>
    <CustRef>any_str</CustRef>
    <Amount>1000</Amount>
    <TrnType>1</TrnType>
    <AccountNumber>your_accountnumber</AccountNumber>
    <CreditCard>
                <CardNumber>4242424242424242</CardNumber>
                <ExpM>02</ExpM>
                <ExpY>2019</ExpY>
                <CVN>123</CVN>
                <CardHolderName>API Test</CardHolderName>
     </CreditCard>
     <Security>
                <UserName>your_api_username</UserName>
                <Password>your_api_password</Password>
     </Security>
</Transaction>
]]>
</dts:trnXML>
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

## Capture

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

#Report API
## Overview

Bambora offers the ability to securely and efficiently retrieve reports via an API.

The API consists of a web service that accepts and processes SOAP requests from a remote location over TCP/IP. Report file data is returned real-time via the API.

The test web service URI is located at: https://demo.ippayments.com.au/interface/api/report.asmx

## Generate Report

The list below provides an overview of the available transaction elements that should be submitted in the XML request.

```shell
curl "https://demo.ippayments.com.au/interface/api/dts.asmx"  \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rep="http://www.ippayments.com.au/interface/api/report">
  <soapenv:Header/>
  <soapenv:Body>
  <rep:GenerateReport>
           <rep:userName>your_api_username</rep:userName>
           <rep:password>your_api_password</rep:password>
           <rep:accountNumber>your_accountnumber</rep:accountNumber>
           <rep:reportID>your_reportID</rep:reportID>
           <rep:reportFormatID>4</rep:reportFormatID>
           <rep:sDate>2017-04-01</rep:sDate>
           <rep:eDate>2017-05-01</rep:eDate>
           <rep:parmList></rep:parmList>
  </rep:GenerateReport>
  </soapenv:Body>
  </soapenv:Envelope>'
```

**REQUEST BODY SCHEMA**

Name           |  Format        | Description
-------------- | -------------  | -----------
Username | Alpha/Num | API Username
Password | Alpha/Num | API Password
AccountNumber | Alpha/Num | 	A reference for the transaction sent by you for reporting purposes.
ReportID | Numeric | The report #. <img src="/images/warning.png"> Login to Backoffice to see the reportID.<br/><br/>By default the below reports are provided when you are onboarded:<br/><br/>1. Customer Credit Card Expiry Check (Adobe Acrobat only)<br/>2. All Transaction Detail V2 (CSV only)<br/>3. Daily Settlement Reconcilliation Report (Adobe Acrobat only)<br/>
ReportFormatID | Integer	| This specifies the report file type. Please see valid ID’s below: <br/><br/>1  - Adobe Acrobat © PDF (Default)<br/>3  -   Microsoft Excel ©<br/>4 -  CSV (Comma Delimited)<br/>5  - Rich Text Format<br/>6  - TIFF image<br/>99 - Raw Data
sDate | Alpha/Num | Report date range start date.<br/><br/>Format must be yyyy-mm-dd.<br/><br/>Optional. If report does not require it leave blank.
eDate| Alpha/Num |	Report date range end date.<br/><br/>Format must be yyyy-mm-dd.<br/><br/>Optional. If report does not require it leave blank.
ParmList | Alpha/Num | Additional parameters needed by the report in a comma-delimited list (do not include quotes).<br/><br/>Order is important.<br/><br/>Optional. If report does not require additional parameters leave blank.


**RESPONSE SCHEMA**

Bambora will return the following response.

```shell
'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
 <soap:Body>
 <GenerateReportResponse xmlns="http://www.ippayments.com.au/interface/api/report">
   <GenerateReportResult>
          <resultSummary>0</resultSummary>
          <resultMessage>Report file data generated OK</resultMessage>
          <b64ReportFileData>IkFjY291bnQgIyIsIkRhdGUvVGltZSIsIlJlY2VpcHQiLCJUeXBlIiwiQ2hhbm5lbCIsIkFtb3VudCIsIlN1cmNoYXJnZSIsIlNldHRsZW1lbnQgRGF0ZSIsIlJlc3VsdCBDb2RlIiwiUmVzdWx0IFRleHQiLCJDdXN0b21lciBOdW1iZXIiLCJDdXN0UmVmIiwiVXNlciIsIkNhcmQgVHlwZSIsIkNhcmQgTnVtYmVyIiwiTmFtZSBvbiBDYXJkIiwiQ29tbWVudHMiDQosLCwsTmV0QW1vdW50LDAuMDAsLCwsLCwsLCwsLA0K</b64ReportFileData>
          <reportFileName>AllTransactionDetail_20160928.csv</reportFileName>
   </GenerateReportResult>
 </GenerateReportResponse>
 </soap:Body>
</soap:Envelope>'
```

Name      | Value  
--------- | -------
resultSummary | One of:<br/><br/>0  - Report file data generated OK<br/><br/>2  - User does not have permission to generate report files<br/><br/>3  - Report cannot be generated based upon supplied parameters<br/><br/>99 - Exception encountered
resultMessage | string(64) |	Response code of the submitted payment.
b64ReportFileData | string(256) |	Time when the payment transaction is submitted in the following format DD-MM-YYYY hh:mm:ss