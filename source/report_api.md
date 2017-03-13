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

Bambora offers the ability to securely and efficiently retrieve reports via an API.

The API consists of a web service that accepts and processes SOAP requests from a remote location over TCP/IP. Report file data is returned real-time via the API.

The test web service URI is located at: https://demo.ippayments.com.au/interface/api/report.asmx

# GenerateReport

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
