# Magento v2
Bambora makes it easy for you as an online merchant using Magento v2.x, to accept payments in your webshop by following this simple guide. This guide assumes that you have a running Magento v2.x site.

------------------------------
This guide will provide you with the information you need in order to setup Bambora Checkout with Mangeto 2.x. Three basic steps are required in order to get up an running:

1. Install the module
2. Configure the module

<div class="message"><strong>Note!</strong><div>The installation is done using Composer. Please visit <a href="https://getcomposer.org/">getcomposer.org</a> to install Composer.</div></div>

<a name="installmodule"></a>
## Install the module
In order to install the module you must follow these steps. Please follow this guide if you are [updating the module](#updatemodule).

1. Log into your Linux server terminal
2. Navigate to your Magento 2 root folder
3. Run the command: `composer require bambora/module-payment-magento2`
4. Run the command: `php bin/magento setup:upgrade`
5. Run the command: `php bin/magento cache:flush`

If you are running your Magento 2 in production mode you need to run the following command

6. Run the command: `php bin/magento setup:static-content:deploy`
7. Run the command: `php bin/magento indexer:reindex`

The module has now been installed and the next step is to configure the module.

## Configure the module
The configuration is done from within Magento Administration. Please follow these step to configure the module.

1. Log in to your Magento Administration (eg. http://www.yourshop.com/admin)
2. Click `Stores`
3. Click `Configuration`
4. Expand `Sales`
5. Click `Payment Methods`
5. Locate `Bambora Checkout`
6. Edit configuration (see [Mandatory Configurations](#mandatoryconfigurations) for details)
7. Click `Save Config`

![magento 2 step 3-1](/assets/images/magento-2-step-3-1.png)
<label>Configuration of the module: Step 2 and 3</label>

![magento 2 step 3-2](/assets/images/magento-2-step-3-2.png)
<label>Configuration of the module: Step 4 to 8</label>

<a name="mandatoryconfigurations"></a> 
### Mandatory configurations
There exists a number of options in how to configure the Bambora Checkout module. All of them are described with in the `Configuration`-page in Magento. 

Most of the configurations are set with a valid default-value, the following are however mandatory to get up an running:

* Merchant Number
* Access Token
* Secret Token
* MD5 Key

When you have updated the mandatory configurations your are ready to use the Bambora Checkout.

------

<a name="updatemodule"></a>
## Update the module
Bambora is maintaining the module for Mangeto and are doing regulary updates. If you need to update the module please follow these steps:

1. Log into your Linux server terminal
2. Navigate to your Magento 2 root folder
3. Run the command: `composer update`
4. Run the command: `php bin/magento setup:upgrade`
5. Run the command: `php bin/magento cache:flush`

If you are running your Magento 2 in production mode you need to run the following command

6. Run the command: `php bin/magento setup:static-content:deploy`
7. Run the command: `php bin/magento indexer:reindex`

------

## Uninstall the module
If you need to install the module, please follow these steps:

1. Log into your Linux server terminal
2. Navigate to your Magento 2 root folder
3. Run the command: `composer remove bambora/module-payment-magento2`
4. Run the command: `php bin/magento setup:upgrade`
5. Run the command: `php bin/magento cache:flush`

If you are running your Magento 2 in production mode you need to run the following command

6. Run the command: `php bin/magento setup:static-content:deploy`
7. Run the command: `php bin/magento indexer:reindex`