# Magento v1

Bambora makes it easy for you as an online merchant using Magento v1.x, to accept payments in your webshop by following this simple guide. This guide assumes that you have a running Magento v1.x site.

------------------------------
This guide will provide you with the information you need in order to setup Bambora Checkout with Mangeto 1.x. Three basic steps are required in order to get up an running:

1. Download the module
2. Install the module
3. Configure the module

## Download the module
The latest version is available at GitHub.

1. Go to the [download page](https://github.com/bambora/checkout-magento-v1.x/releases/latest)
2. In the `Download`-section click the file ending with `.tgz`.

Once the file has been downloaded you are ready to install the module.

<a name="installmodule"></a>
## Install the module
In order to install the module you must follow these steps. Please follow this guide if you are [updating the module](#updatemodule).

1. Log in to your Magento Administration (eg. http://www.yourshop.com/admin)
2. Click `System`
3. Click `Magento Connect`
4. Click `Magento Connect Manager`
5. Locate the `Direct package file upload`-area
6. Click `Choose File` and select the downloaded file
7. Click `Install`
8. When the installation has completed click `Return to Admin`

![magento step 3a-1](/assets/images/magento-step-3a-1.png)
<label>Installation of the module: Step 2 to 4</label>

![magento step 3a-2](/assets/images/magento-step-3a-2.png)
<label>Installation of the module: Step 5 to 7</label>

The module has now been installed and the final step is to configure the module.

## Configure the module
In order to access the configuration page you must follow these steps:

1. Click `System`
2. Click `Configuration`
3. Locate `Sales` in the menu on the left
4. Click `Payment Methods`
5. Locate `Bambora Checkout`
6. Edit configuration (see [Mandatory Configurations](#mandatoryconfigurations) for details)
7. Click `Save Config`

![magento step 4-2](/assets/images/magento-step-4-1.png)
<label>Configuration of the module: Step 1 and 2</label>

![magento step 4-2](/assets/images/magento-step-4-2.png)
<label>Configuration of the module: Step 3 to 7</label>

When to configurations have been saved you need to flush Mangeto Cache for the change to take effect:

1. Click `System`
2. Click `Cache Management`
3. Click `Flush Magento Cache`

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

1. Click `System`
2. Click `Magento Connect`
3. Click `Magento Connect Manager`
4. Locate `Bambora_Online`
5. Select `Uninstall` in the Actions-dropdown
6. Click `Commit Changes`

The steps are illustrated in the following image.

![magento step 3b-2](/assets/images/magento-step-3b-2.png)
<label>Updating the module: Step 4 to 6</label>

When the uninstall is done please proceed with the [installation of the module](#installmodule).









