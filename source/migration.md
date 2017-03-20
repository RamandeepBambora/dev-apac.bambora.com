---
title: dev/bambora

toc_above:
- <a href='index.html'>Getting Started</a>
- <a href='checkout.html'>Checkout</a>
- <a href='apis.html'>APIs</a>
- <a href='backoffice.html'>Backoffice</a>
- <a href='sdk.html'>Java SDK</a>
- <a href='shoppingcart.html'>Shopping Carts</a>
- <a href='testing.html'>Testing</a>

includes:

toc_below:
- <a href='migration.html'>Migration to Production</a>

search: false
---

<script src='js/vendor/clipboard.min.js'></script>
<script src='js/copy.js'></script>

&nbsp;

Once you successfully tested Checkout and APIs in our demo environment it is super easy to migrate to production. All you need to do is switch out the URL subdomain from demo [https://demo.bambora.co.nz](https://demo.bambora.co.nz) to www [https://www.bambora.co.nz](https://www.bambora.co.nz) and update your API credentials to your production details if you are using the integrated solution.


Service | Live Web Service URL Location
------- | -----------------------------
Checkout | https://www.ippayments.com/access/index.aspx
Payment API | https://www.ippayments.com/interface/api/dts.asmx
Report API | https://www.ippayments.com/interface/api/report.asmx
