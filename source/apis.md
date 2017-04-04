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
- <a href='testing.html'>Testing</a>
- <a href='migration.html'>Migration to Production</a>

search: false
---

<script src='js/vendor/clipboard.min.js'></script>
<script src='js/copy.js'></script>

# Overview

Bambora have developed two APIs. One for taking payments and the other for reporting. We've made these integrations as simple as possible so you can get started quickly.  

#Payment API

You can test the service by copy and pasting the cURL code sample into a text editor, replacing the credential and then executing the updated code sample in your server.

The test web service URL is located at: [https://demo.bambora.co.nz/interface/api/dts.asmx](https://demo.bambora.co.nz/interface/api/dts.asmx)

## Purchase

**SOAP Method:** SubmitSinglePayment

The list below provides an overview of the available transaction elements that should be submitted in the XML request.

```shell
curl "https://demo.Bambora.co.nz/interface/api/dts.asmx"
'<Transaction>
      <CustNumber>your_custnumber</CustNumber>
      <CustRef>your_custref</CustRef>
      <Amount>1000</Amount>
      <TrnType>1</TrnType>
      <AccountNumber>your_accountnumber</AccountNumber>
      <CreditCard>
                  <CardNumber>4242424242424242</CardNumber>
                  <ExpM>02</ExpM>
                  <ExpY>2019</ExpY>
                  <CVN>123</CVN>
                  <CardHolderName>Test</CardHolderName>
       </CreditCard>
       <Security>
                  <UserName>your_api_username</UserName>
                  <Password>your_api_password</Password>
       </Security>
</Transaction>'
```
Parameter |  Format | Description
--------- | ------- | -----------
AccountNumber | Alpha/Num(16) | This value dictates which account the transaction will be processed through. Refer to section Account Hierarchy. <br/> <img src="/images/warning.png"> Note: This parameter indicates where the transaction will be processed to.
CustNumber | Alpha/Num(64) | An additional reference for the transaction sent by you for reporting purposes.
CustRef | Alpha/Num(64) | 	A reference for the transaction sent by you for reporting purposes.
Amount | Numeric(10) | Amount entered in cent value e.g. $55.00 = 5500
TrnType | Numeric(2)	| 1 is for Credit Card – Purchase
CardNumber | Numeric(16) | The credit card number. E.g. 1234567890654321
ExpM | Numeric(2) |	Month when the credit card expires.
ExpY | Numeric(4) | Year when the credit card expires.
CVN | Numeric(3) | Card Security Code
CardHolderName | Alpha/Num(1024) |	The name of the credit card holder.  
Security/Username | Alpha/Num(32) |	API Username
Security/Password | Alpha/Num(16) |	API Password

**RESPONSE SCHEMA**

Bambora will return the following response.

```shell
'<Response>
    <ResponseCode>0</ResponseCode>
    <Timestamp>23-Feb-2017 16:06:41</Timestamp>
    <Receipt>90891389</Receipt>
    <SettlementDate>23-Feb-2017</SettlementDate>
    <DeclinedCode></DeclinedCode>
    <DeclinedMessage></DeclinedMessage>
</Response>'
```

Parameter |  Format | Description
--------- | ------- | -----------
ResponseCode | Numeric(64) |	Response code of the submitted payment. <br/><br/> 0 = Approved <br/> 1 = Not Approved
Timestamp | Alpha/Num(256) |	Time when the payment transaction is submitted in the following format DD-MM-YYYY hh:mm:ss
Receipt | Alpha/Num(64) |	Receipt number of the submitted payment.
SettlementDate | Alpha/Num(64)	| The settlement date of the submitted payment returned in the following format DD-MM-YYYY
DeclinedCode | Alpha/Num(64) |	This field is blank if the submitted payment is approved, otherwise, declined code is populated.
DeclinedMessage | Alpha/Num(64) |	This field is black if the submitted payment is approved, otherwise, declined message is populated.

#Report API
Bambora offers the ability to securely and efficiently retrieve reports via an API.

The API consists of a web service that accepts and processes SOAP requests from a remote location over TCP/IP. Report file data is returned real-time via the API.

* The test web service URI is located at: [https://demo.bambora.co.nz/interface/api/report.asmx](https://demo.bambora.co.nz/interface/api/report.asmx)

## Generate Report

SOAP Method: GenerateReport

The list below provides an overview of the available transaction elements that should be submitted in the XML request.

```shell
curl "https://demo.Bambora.co.nz/interface/api/report.asmx"
'<rep:GenerateReport>
         <rep:userName>your_api_username</rep:userName>
         <rep:password>your_api_password</rep:password>
         <rep:accountNumber>your_accountnumber</rep:accountNumber>
         <rep:reportID>your_reportID</rep:reportID>
         <rep:reportFormatID>4</rep:reportFormatID>
         <rep:sDate>2017-04-01</rep:sDate>
         <rep:eDate>2017-05-01</rep:eDate>
         <rep:parmList></rep:parmList>
</rep:GenerateReport>'
```

**REQUEST BODY SCHEMA**

Parameter      |  Format        | Description
-------------- | -------------  | -----------
Username | Alpha/Num | API Username
Password | Alpha/Num | API Password
AccountNumber | Alpha/Num | 	A reference for the transaction sent by you for reporting purposes.
ReportID | Numeric | The report #. <img src="/images/warning.png"> Please login to Bambora Backoffice to find the reportID.<br/><br/>By default the below reports are provided when you are onboarded:<br/><br/>1. Customer Credit Card Expiry Check (Adobe Acrobat only)<br/>2. All Transaction Detail V2 (CSV only)<br/>3. Daily Settlement Reconcilliation Report (Adobe Acrobat only)<br/>
ReportFormatID | Integer	| This specifies the report file type. Please see valid ID’s below: <br/><br/>1  - Adobe Acrobat © PDF (Default)<br/>3  -   Microsoft Excel ©<br/>4 -  CSV (Comma Delimited)<br/>5  - Rich Text Format<br/>6  - TIFF image<br/>99 - Raw Data
sDate | Alpha/Num | Report date range start date.<br/>Format must be yyyy-mm-dd.<br/>Optional. If report does not require it leave blank.
eDate| Alpha/Num |	Report date range end date.<br/>Format must be yyyy-mm-dd.<br/>Optional. If report does not require it leave blank.
ParmList | Alpha/Num | Additional parameters needed by the report in a comma-delimited list (do not include quotes).<br/>Order is important.<br/>Optional. If report does not require additional parameters leave blank.


**RESPONSE SCHEMA**

Bambora will return the following response.

```shell
'<GenerateReportResult>
         <resultSummary>0</resultSummary>
         <resultMessage>Report file data generated OK</resultMessage>
         <b64ReportFileData>IkFjY291bnQgIyIsIkRhdGUvVGltZSIsIlJlY2VpcHQiLCJUeXBlIiwiQ2hhbm5lbCIsIkFtb3VudCIsIlN1cmNoYXJnZSIsIlNldHRsZW1lbnQgRGF0ZSIsIlJlc3VsdCBDb2RlIiwiUmVzdWx0IFRleHQiLCJDdXN0b21lciBOdW1iZXIiLCJDdXN0UmVmIiwiVXNlciIsIkNhcmQgVHlwZSIsIkNhcmQgTnVtYmVyIiwiTmFtZSBvbiBDYXJkIiwiQ29tbWVudHMiDQosLCwsTmV0QW1vdW50LDAuMDAsLCwsLCwsLCwsLA0K</b64ReportFileData>
         <reportFileName>AllTransactionDetail_20160928.csv</reportFileName>
  </GenerateReportResult>'
```

Parameter | Description  
--------- | -------
resultSummary | 0  - Report file data generated OK<br/>1 - Invalid username/password<br/>2  - User does not have permission to generate report files<br/>3  - Report cannot be generated based upon supplied parameters<br/>99 - Exception encountered
resultMessage | Contains a textual description of the result. Including a list of any exceptions encountered.
b64ReportFileData | The base64 encoded report file data. Will be blank if an exception is encountered.
