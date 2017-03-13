---
title: dev/bambora

toc_above:
- <a href='index.html'>Getting Started</a>
- <a href='checkout.html'>Checkout</a>

includes:

toc_below:
- <a href='apis.html'>APIs</a>
- <a href='backoffice.html'>Backoffice</a>
- <span>Java SDK</span>
- <span>Shopping Carts</span>
- <span>Testing</span>

search: false
---
<script src='js/vendor/clipboard.min.js'></script>
<script src='js/copy.js'></script>

#Overview

Bambora have developed a flexible and innovative platform called Checkout for delivering payments online which is device agnostic, with responsive functionality over web, tablet and all other mobile devices

This guide will provide you with all information you need in order to get started.
First you should identify how you would to include the Checkout in your business.      

There are two options:

#Checkout Standalone

Checkout Standalone is a low touch integration, providing an secure hosted payment page through a separate URL. Transactions are processed in real-time and the response displayed back to the customer. There is not redirect back to your business but the transaction result can be viewed through your Bambora Backoffice reporting facility.  

[Checkout standalone](/checkout_standalone.html)

#Checkout Integrated

Checkout Integrated allow you to embed the payment page within your website through an iFrame. This enables your customer make the payment on your website and allow you to provide a seamless integration with Bambora through the purchase with transaction status returned back to your internal system.

[Checkout integrated](/ihpp.html)

**Migration to production**

Once you successfully tested Checkout in our demo environment it is super easy to migrate to production. All you need to do is switch out the URL subdomain from demo [demo.bambora.co.nz](https://demo.bambora.co.nz) to www [www.bambora.co.nz](https://www.bambora.co.nz) and update your API credentials to your production details if you are using the integrated solution.
