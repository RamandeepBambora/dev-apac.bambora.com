---
title: API Reference

<!-- language_tabs:
  - java: Java
  - javascript: Javascript -->

toc_footers:
  - <a href='#'>Sign Up for a Developer access</a>

<!-- includes:
  - errors -->

search: true
---

# Introduction

Our Java SDK wraps our RESTful APIs to make it easy for you to use our RESTful APIs when using Java language.

The Java SDK [source](https://bitbucket.org/herbertn/apac-sdk-java/src) and accompanying [javadoc](javadoc/index.html) will provide more lower level information.

# Add the SDK to your project

To start using our payment services, we will need to create an account for your organization. When your account is created, you will be provided with a username and a password to use with this Java SDK.

Next you will need to include this Java SDK in your project.

Follow the below 2 steps :

## Step 1: Create an Account

Head over to the Bambora site to start your account creation process. Take note of the Username, Password and DL for use below.

<aside class="warning">
Remember — keep your username and password private
</aside>

## Step 2: Add the SDK to your project

```java
<dependency>
    <groupId>com.bambora</groupId>
    <artifactId>apac-sdk-java</artifactId>
    <version>1.0</version>
</dependency>
```

Add this Java SDK as dependency to your Maven project's pom.xml file. If you are not using Maven, download this SDK and includes the jar library in your project's lib directory.

# Making a payment

Making a payment is easy. Follow the steps below to do this in no time.

## Step 1: Create a client

```java
/**
 * Java code snippet.
 * Create a reusable client to the payment service endpoint.
 */
Client client = new Client(
        "account_username",
        "secret_password",
        "standard_purchase",
        EndPoint.DEMO_URL
);
```

To start using our payment service endpoint, first you will need to establish connection to the desired environment. We provide a demo environment to help during your development phase and of course the production endpoint when you are ready to go live.

You would normally do this in the constructor of your web application controller and reuse this client for all requests.

<aside class="notice">
Make sure to use your account username, the secret password, and the appropriate endpoint.
</aside>

See Javadoc on [Client](javadoc/com/bambora/Client.html) and [EndPoint](javadoc/com/bambora/EndPoint.html)

## Step 2: Get a session token

```java
/**
 * Java code snippet.
 * Get session token for to start payment process.
 */
String sessionToken = client.getSessionToken(
        new SessionInitiationRequestObject(
                new BigDecimal(123.00),
                "session_id",
                "secret_session_key",
                "https://server_url",
                "https://user_url",
                "1234567"
        )
);
```

Next, you will need to tell us the payment details. With this information, we will provide a one-use session token for the processing of this payment.

You would perhaps do this when a user proceed to the checkout page where the order details are shown to confirm the cart items and the total amount to be charged is correct.

At this stage, you will also need to store the session token against your order for use later.

<aside class="warning">
The "secret_session_key" is a value you provide. This value should only be passed to our endpoint and should not be sent to your front end. It is useful for security and verification purposes when handling our reply to your payment request. If you do not receive a session key or received an unmatched session key, then the respond must be treated as a fraudulent transaction.
</aside>

See Javadoc on [SessionInitiationRequestObject](javadoc/com/bambora/SessionInitiationRequestObject.html)

## Step 3: Show our secured payment detail page

```java
/**
 * Java code snippet.
 * Get the URL to our secured payment details page.
 */
String paymentFormUrl = client.getPaymentFormUrl(
        order.getSessionId(),
        order.getSessionToken()
);

/**
 * HTML code snippet.
 */
<html>
<body>
    <h2>Order Payment Page</h2>
    <iframe src="${paymentFormUrl}" style="height: 450px; width: 400px" />
</body>
</html>
```

To make it very easy to use and integrate our payment service in your application, we enable you to embed our secured payment details page within your web application using the iframe mark up tag.

This step usually comes after the order confirmation page; after the user clicked on the pay-now button.

During the generation of your payment details page, make a call to our payment service endpoint passing along the session id and token from previous step to get the one-use URL of the payment details page to use in your HTML template.

<aside class="notice">
The session id and token are values you associated to your order object in the previous step.
</aside>

See Javadoc on [Client](javadoc/com/bambora/Client.html)


## Step 4: Handle the payment response from us

```java
/**
  * Your server_url endpoint to handle the POST response
  * from us to update your order status.
  */
public void doPost(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {
    NotificationOfCompletionMessage completionMessage = NotificationTranslator.translate(req);
    if(completionMessage.getResult() == Result.APPROVED) {
        // TODO update order status
    } else {
        // TODO take appropriate actions
    }
    ...
}
```

There are 2 parts to the handling of payment submission response from us.

1. You will need to make available the server_url endpoint that accept a POST request from us to update your application of the result of your payment request. This endpoint was provided by you to us in a previous step as "server_url". A simple way to think of this is a background process where our system talks to your application independent of the user.

2. You will also need to make available the user_url endpoint that accept a POST request from us to generate the payment result page for your user. This endpoint was provided by you to us in a previous step as "user_url" and it can contain an identifier to the customer order so you can check its status to render an appropriate page.

See Javadoc on [NotificationOfCompletionMessage](javadoc/com/bambora/notification/NotificationOfCompletionMessage.html) and [Result](javadoc/com/bambora/notification/NotificationOfCompletionMessage.Result.html)
