import * as React               from "react";
import { PropTypes, Component } from "react";
import { connect }              from "react-redux";
import { Link, browserHistory } from "react-router";
import { BamboraSvgIcon, scrollToTopAndTransitionTo, LinkAndScroll } from "../common";

const styles = {
    landingPageContainer: require("./landingPageContainer.scss")
}

function expandHeaderNav() {
    const element = document.querySelector("[data-reactroot]");
    if(element) element.classList.add("nav-expanded");
}

export interface IProductCategory {
    name     : string;
    link     : string;
    products : Array<IProductDetails>;
}

export interface IProductDetails {
    name        : string;
    description : string;
    link        : string;
    imageSource : string;
}

const productCategories: Array<IProductCategory> = [
    {
        name : "Shopping Carts",
        link : "/shopping-carts",
        products: [
            {
                name        : "Magento",
                description : "Integrate Checkout into your Magento v1 shop.",
                link        : "/shopping-carts/guides/shopping-carts/magento",
                imageSource : "/assets/images/magento-logo.svg"
            },
            {
                name        : "Magento 2",
                description : "Integrate Checkout into your Magento v2 shop.",
                link        : "/shopping-carts/guides/shopping-carts/magento2",
                imageSource : "/assets/images/magento2-logo.svg"
            },
            {
                name        : "PrestaShop",
                description : "Integrate Checkout into your PrestaShop shop.",
                link        : "/shopping-carts/guides/shopping-carts/prestashop",
                imageSource : "/assets/images/prestashop-logo.svg"
            },
            {
                name        : "WooCommerce",
                description : "Integrate Checkout into your WooCommerce shop.",
                link        : "/shopping-carts/guides/shopping-carts/woocommerce",
                imageSource : "/assets/images/woocommerce-logo.svg"
            }
        ]
    },
    {
        name: "Web Payment",
        link: "/checkout",
        products: [
            {
                name        : "Checkout",
                description : "Create a custom or a shopping cart integration.",
                link        : "/checkout/guides/getting-started/introduction",
                imageSource : "/assets/images/checkout-logo.svg"
            },
            {
                name        : "API Guides",
                description : "Learn how to do a custom integration.",
                link        : "/checkout/guides/getting-started/create-account",
                imageSource : "/assets/images/api-guides.svg"
            },
            {
                name        : "API Reference",
                description : "Reference for the Checkout web interfaces.",
                link        : "/checkout/apis/checkout",
                imageSource : "/assets/images/api-reference.svg"
            }
        ]
    },
    {
        name: "Native Payment",
        link: "/native-payment",
        products: [
            {
                name        : "iOS SDK",
                description : "Get started with payments in your iOS app.",
                link        : "/native-payment/guides/ios/introduction",
                imageSource : "/assets/images/ios-logo.svg"
            },
            {
                name        : "Android SDK",
                description : "Get started with payments in your Android app.",
                link        : "/native-payment/guides/android/introduction",
                imageSource : "/assets/images/android-logo.svg"
            },
            {
                name        : "API Guides",
                description : "Learn how to handle payments from your app.",
                link        : "/native-payment/guides/api-guide/introduction",
                imageSource : "/assets/images/api-guides.svg"
            },
            {
                name        : "API Reference",
                description : "Reference for the native payment web interfaces.",
                link        : "/native-payment/apis/payment",
                imageSource : "/assets/images/api-reference.svg"
            }
        ]
    }
];

export interface ILandingPageContainerProps {
    pathName   : string;
    productId? : string;
}

class LandingPageContainer extends React.Component<ILandingPageContainerProps, any> {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        expandHeaderNav();
    }

    render() {
        return (
            <div className={styles.landingPageContainer.container}>
                {
                    productCategories.map(productCategory => (
                        <div key={productCategory.name} className={styles.landingPageContainer.section}>

                            <h2>
                                <LinkAndScroll to={productCategory.link}>{productCategory.name}</LinkAndScroll>
                                <BamboraSvgIcon icon="arrow-right" />
                            </h2>

                            <div className={styles.landingPageContainer.products}>
                            {
                                productCategory.products.map(product => (
                                    <div
                                        key={product.name}
                                        className={styles.landingPageContainer.productContainer}
                                        onClick={() => scrollToTopAndTransitionTo(product.link)}>

                                        <div className={styles.landingPageContainer.productLogo}>
                                            <img src={product.imageSource} alt={product.name} />
                                        </div>

                                        <div className={styles.landingPageContainer.productDetails}>
                                            <h3>{product.name}</h3>
                                            <small>{product.description}</small>
                                        </div>

                                    </div>
                                ))
                            }
                            </div>

                        </div>
                    ))
                }
            </div>
        );
    }
}

function mapStateToProps(state: IRootState): any {
    return {};
}

export default connect(mapStateToProps)(LandingPageContainer);