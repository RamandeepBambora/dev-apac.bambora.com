# WooCommerce

Bambora makes it easy for you as an online merchant using WooCommerce, to accept payments in your webshop by following this simple guide. To accept payments this guide assumes that you have a running WordPress site with WooCommerce installed.

------------------------------
This guide will provide you with the information you need in order to setup Bambora Checkout with WooCommerce. Three basic steps are required in order to get up an running:

1. Download the module
2. Install the module
3. Configure the module

## Download the module
The latest version is available at GitHub.

1. Go to the [download page](https://github.com/bambora/checkout-woocommerce/releases/latest)
2. In the `Download`-section click the file ending with `.tgz`.

Once the file has been downloaded you are ready to install the module.

<a name="installmodule"></a>
## Install the module
In order to install the module you must follow these steps. Please follow this guide if you are [updating the module](#updatemodule).

1. Log in to your WordPress Administration (eg. http://www.yourshop.com/wp-admin)
2. Click `Plugins`
3. Click `Add new`
4. Click `Upload plugin`
5. Click `Choose File` and select the downloaded file
6. Click `Install Now`
7. Click `Activate Plugin`

![woocommerce step 3a-1](/assets/images/woocommerce-step-3a-1.png)
<label>Installation of the module: Step 2 and 3</label>

![woocommerce step 3a-2](/assets/images/woocommerce-step-3a-2.png)
<label>Installation of the module: Step 4</label>

![woocommerce step 3a-3](/assets/images/woocommerce-step-3a-3.png)
<label>Installation of the module: Step 5 and 6</label>

![woocommerce step 3a-5](/assets/images/woocommerce-step-3a-5.png)
<label>Installation of the module: Step 7</label>

The module has now been installed and the final step is to configure the module.

## Configure the module
In order to access the configuration page you must follow these steps:

1. Click `WooCommerce`
2. Click `Settings`
3. Click `Checkout`
4. Click `Bambora`
5. Edit configuration (see [Mandatory Configurations](#mandatoryconfigurations) for details)
6. Click `Save Config`

The steps are illustrated in the following image.

![woocommerce step 4-3](/assets/images/woocommerce-step-4-3.png)
<label>Configuration of the module: Step 1 to 5</label>

<a name="mandatoryconfigurations"></a> 
### Mandatory configurations
There exists a number of options in how to configure the Bambora Checkout module. All of them are described with in the `Configuration`-page in WooCommerce. 

Most of the configurations are set with a valid default-value, the following are however mandatory to get up an running:

* Merchant Number
* Access Token
* Secret Token
* MD5 Key

When you have updated the mandatory configurations your are ready to use the Bambora Checkout.

------

<a name="updatemodule"></a>
## Update the module
Bambora is maintaining the module for WooCommerce and are doing regulary updates. If you need to update the module please follow these steps:

1. Click `Plugins`
2. Click `Installed Plugins`
3. Locate `Bambora Checkout`
4. Click `Deactivate`
5. Click `Delete`

The steps are illustrated in the following images.

![woocommerce step 3b-1](/assets/images/woocommerce-step-3b-1.png)
<label>Updating the module: Step 1 and 2</label>

![woocommerce step 3b-2](/assets/images/woocommerce-step-3b-2.png)
<label>Updating the module: Step 3 to 5</label>

When the uninstall is done please proceed with the [installation of the module](#installmodule).