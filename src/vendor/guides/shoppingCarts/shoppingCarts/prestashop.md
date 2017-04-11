# PrestaShop

Bambora makes it easy for you as an online merchant using PrestaShop, to accept payments in your webshop by following this simple guide. To accept payments this guide assumes that you have a running PrestaShop site.

------------------------------
This guide will provide you with the information you need in order to setup Bambora Checkout with PrestaShop. Three basic steps are required in order to get up an running:

1. Download the module
2. Install the module
3. Configure the module

## Download the module
The latest version is available at GitHub.

1. Go to the [download page](https://github.com/bambora/checkout-prestashop/releases)
2. In the `Download`-section click the file ending with `.tgz`.

The installations approach is different dependent on which version of PrestaShop you are using, and the guide is divided accordingly. There is one guide for [PrestaShop 1.7.x](#prestashop-17x) and one guide for [PrestaShop 1.5.x and 1.6.x](#prestashop-15x-16x).

Please follow this guide if you are [updating the module](#updatemodule).

<a name="prestashop-17x"></a>
## PrestaShop 1.7.x

### Install the module
In order to install the module you must follow these steps. 

1. Log in to your PrestaShop Administration (eg. http://www.yourshop.com/admin)
2. Click `Modules`
3. Click `Modules and Services`
4. Click `Upload a module`
5. Click `select file` and select the downloaded file
6. Click `Configure` to go directly to the configuration

![prestashop step 3b-1](/assets/images/prestashop-step-3b-1.png)
<label>Installation of the module: Step 2 and 3</label>

![prestashop step 3b-2](/assets/images/prestashop-step-3b-2.png)
<label>Installation of the module: Step 4</label>

![prestashop step 3b-2](/assets/images/prestashop-step-3b-3.png)
<label>Installation of the module: Step 5</label>

![prestashop step 3b-2](/assets/images/prestashop-step-3b-4.png)
<label>Installation of the module: Step 6</label>

The module has now been installed and the final step is to configure the module.

### Configure the module
In order to access the configuration page you must follow these steps:

1. Click `Modules`
2. Click `Modules and Services`
3. Click `Installed Modules`
4. Locate `Bambora Checkout`
5. Click `Configure`
6. Edit configuration (see [Mandatory Configurations](#mandatoryconfigurations17x) for details)
7. Click `Save`

![prestashop step 4b-3](/assets/images/prestashop-step-4b-3.png)
<label>Configuration of the module: Step 1 to 5</label>

![prestashop step 3b-4](/assets/images/prestashop-step-3b-5.png)
<label>Configuration of the module: Step 6 and 7</label>

<a name="mandatoryconfigurations17x"></a> 
#### Mandatory configurations
There exists a number of options in how to configure the Bambora Checkout module. All of them are described with in the `Configuration`-page in PrestaShop. 

Most of the configurations are set with a valid default-value, the following are however mandatory to get up an running:

* Merchant Number
* Access Token
* Secret Token
* MD5 Key

When you have updated the mandatory configurations your are ready to use the Bambora Checkout.

------


<a name="prestashop-15x-16x"></a>
## PrestaShop 1.5.x and 1.6.x

### Install the module
In order to install the module you must follow these steps.

1. Log in to your PrestaShop Administration (eg. http://www.yourshop.com/admin.)
2. Click `Modules and Services`
3. Click `Modules and Services`
4. Click `Add a new module`
5. Click `Choose a file` and select the downloaded file
6. Click `Upload this module`
7. Locate `Bambora Checkout`
8. Click `Install`
9. Click `Proceed with the installation`

When the installation is done you are directed to the `Configuration`-page. Please refer to [Mandatory Configurations](#mandatoryconfigurations15x16x) for details.

![prestashop step 3a-1](/assets/images/prestashop-step-3a-1.png)
<label>Installation of the module: Step 2 and 3</label>

![prestashop step 3a-2](/assets/images/prestashop-step-3a-2.png)
<label>Installation of the module: Step 4 to 6</label>

![prestashop step 3a-5](/assets/images/prestashop-step-3a-5.png)
<label>Installation of the module: Step 7 and 8</label>

![prestashop step 3a-6](/assets/images/prestashop-step-3a-6.png)
<label>Installation of the module: Step 9</label>

The module has now been installed and the final step is to configure the module.

### Configure the module
In order to access the configuration page you must follow these steps:

1. Click `Modules and Services`
2. Click `Modules and Services`
3. Locate `Bambora Checkout`
4. Click `Configure`
5. Edit configuration (see [Mandatory Configurations](#mandatoryconfigurations15x16x) for details)
6. Click `Save`

![prestashop step 4a-2](/assets/images/prestashop-step-4a-2.png)
<label>Configuration of the module: Step 1 to 4</label>

![prestashop step 3a-6](/assets/images/prestashop-step-3a-7.png)
<label>Configuration of the module: Step 5 to 6</label>

<a name="mandatoryconfigurations15x16x"></a> 
#### Mandatory configurations
There exists a number of options in how to configure the Bambora Checkout module. All of them are described with in the `Configuration`-page in PrestaShop. 

Most of the configurations are set with a valid default-value, the following are however mandatory to get up an running:

* Merchant Number
* Access Token
* Secret Token
* MD5 Key

When you have updated the mandatory configurations your are ready to use the Bambora Checkout.

-------------

<a name="updatemodule"></a>
## Update the module
Bambora is maintaining the module for PrestaShop and are doing regulary updates. If you need to update the module please follow the steps described relevant to your version of PrestaShop.

### PrestaShop 1.7.x
To update the module you for PrestaShop 1.7.x you need to follow these steps:

1. Click `Modules`
2. Click `Modules and Services`
3. Click `Upload a module`
4. Click `Select file`

Please continue to [install the module](#prestashop-17x).

### PrestaShop 1.5.x and 1.6.x
To update the module you for PrestaShop 1.5.x and 1.6.x you need to follow these steps:

1. Click `Modules and Services` 
2. Click `Modules and Services`
3. Click `Add a new module`
4. Click `Choose a file`
5. Click `Upload this module`
6. Locate `Bambora Checkout`
7. Click `Uninstall`
8. Locate `Bambora Checkout`
9. Click `Install`

Please continue to [install the module](#prestashop-15x-16x).