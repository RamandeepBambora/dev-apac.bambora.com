# Contributing to the Dev Portal

<a name="questions-feedback-concerns"></a> 
## Questions, Feedback, and Concerns
Please direct any questions, feedback, or concerns to our Slack channel.

<a name="bug-reports"></a> 
## Bug reports
If you find a bug or any type of issue, feel free to create an issue on GitHub.
You must describe the bug in as much details as possible, and provide a set simple steps to reproduce.
You are always very welcome to create a pull request to fix bugs, spelling errors, etc.

<a name="feature-requests"></a> 
## Feature requests
If you have an idea or a request for a new feature, you are welcome to create an issue on GitHub or create a pull request.
If it's a major feature or it introduces breaking changes you must discuss this with the Dev Portal team on Slack first.
If submitting a pull request, please respect the coding style we use in this project, and always include proper messages with your commits.

<a name="adding-nwe-documentation-guides-or-api-references"></a> 
## Adding new documentation guides or API Refernces
You are always welcome to create a pull request to add new guides or APIs to a product, as well as updating existing ones.
We suggest that you contact us on Slack to get one person from your team to merge pull requests for your products, so we can avoid too much overhead.

<a name="adding-api-references"></a> 
### Adding API References
To add a new API reference or change existing ones, you must first provide an extended swagger spec in JSON format, which we will refer to as _xSpec_ throughout the rest of this guide.
If you don't know how to do this, please contact @jesperzach or @storkie on Slack.
An automatic way get extended swagger specs that can be consumed by the Dev Portal is in the works, but for now they need to be added manually.

The xSpec file is to be added to the folder `/src/vendor/api-reference`.
Then you must require it in the `/src/vendor/api-reference/index.ts` file as follows:

```
export const LOWERCASE NAME OF API = require("PATH TO FILE") as string;
```

For example:
```
export const transaction = require("./transaction") as string;
```

The name of the const is the ID you will use to add it to the menu.
This is done in the config file `/src/common/products.config.json` in the `products[0].apis.menu` array, as per the following example:

```json
{
    "products": [
        {
            "name": "Mobile SDK",
            "id": "mobile-sdk",
            "guides": {
                "menu": []
            },
            "apis": {
                "menu": [
                    {
                        "title": "Title for the API reference page, fx 'Transaction API'",
                        "id": "The ID you defined in the index.ts file, fx 'transaction'"
                    }
                ]
            }
        }
    ]
}
```

<a name="adding-guides"></a> 
### Adding guides
Adding or configuring guides is highly similar to adding new API references.
There is a product folder for each product, which are located in `/src/vendor/guides`, fx `/src/vendor/guides/checkout`.
In the product folder, each menu section has its own folder, fx `/src/vendor/guides/checkout/shoppingCarts`.
In the menu section folders, the markdown files are located.

To include a new guide in the project, add the markdown file in the appropriate menu section folder, and require it in the `index.ts` file in the same directory.
For example, the markdown file `/src/vendor/guides/checkout/introduction/gettingStarted.md` is required in the `/src/vendor/guides/checkout/introduction/index.ts` file as follows:
```
export const gettingStarted = require("./gettingStarted.md") as string;
```

The naming convention is to always use camelCase for file names, folder names, and const names.
They will automatically correspond to a URL written in snake-case.
For example, the `gettingStarted` example above will result in the URL for the guide being `/checkout/guides/introduction/getting-started`.

To add the guide to the menu, open the `/src/common/products.config.json` config file, and add it to the menu section as in the following example:

```json
{
    "products": [
        {
            "name": "Checkout",
            "id": "checkout",
            "guides": {
                "menu": [
                    {
                        "section": {
                            "title": "Title of the section, i.e. 'Introduction to Checkout'",
                            "id": "ID of the section, i.e. 'introduction'"
                        },
                        "guides": [
                            {
                                "title": "Title of the guide, i.e. 'Getting Started'",
                                "id": "ID of the guide, i.e. 'getting-started'"
                            }
                        ]
                    }
                ]
            },
            "apis": {
                "menu": []
            }
        }
    ]
}
```

Remember to follow the camelCase => snake-case naming convention. The ID must be snake-case, i.e. `getting-started`, corresponding to the guide `gettingStarted`.

**Note:** While it's possible to include HTML in the markdown, please _use HTML responsibly_.
For example, if there is a markdown equivalent always use the markdown equivalent.
If what you're writing can be made simpler by just using markdown, you should do that.
It is always preferred to create a markdown extension when feasible, rather than using HTML.
When in doubt, just ask!


<a name="adding-images"></a> 
#### Adding images
Images has to be placed in the `/src/vendor/images` folder in order to be published with the project.
After building the project, the images will then be located in `/assets/images` on the server.

Since all images are to be located in the same folder, it is recommended to name the images files with a namespace to better make sense of the images.
For example, an image `capture-payment.png` used in a guide for the _Checkout_ product could be renamed to `checkout-capture-payment.png`. 

For example, adding the image `checkout-capture-payment.png` is done as follows:
First, the location of the image must be `/src/vendor/images/checkout-capture-payment.png`.
It can then be inserted into a the markdown file of a guide as follows:

```
![alternative text](/assets/images/checkout-capture-payment.png "Hover text")
```