import * as React  from "react";
import {
    PropTypes,
    Component
}                  from "react";
import { connect } from "react-redux";
import { Link }    from "react-router";
import { BamboraSvgIcon, LinkAndScroll } from "../common";

const styles = {
    footerContainer: require("./footerContainer.scss")
}


export interface IFooterContainerProps {
    pathName    : string;
    productId?  : string;
}

class FooterContainer extends React.Component<IFooterContainerProps, any> {
    render() {
        return (
            <div className={styles.footerContainer.container}>
                <div className={styles.footerContainer.linkGroups}>
                    <div className={styles.footerContainer.linkGroup}>
                        <BamboraSvgIcon icon="logo-bambora" />
                    </div>
                    <div className={styles.footerContainer.linkGroup}>
                        <span>Products</span>
                        <LinkAndScroll to="/checkout/guides/getting-started">Checkout</LinkAndScroll>
                        <LinkAndScroll to="/shopping-carts/guides/getting-started">Shopping Carts</LinkAndScroll>
                        <LinkAndScroll to="/native-payment/guides/ios">iOS SDK</LinkAndScroll>
                        <LinkAndScroll to="/native-payment/guides/android">Android SDK</LinkAndScroll>
                    </div>
                    <div className={styles.footerContainer.linkGroup}>
                        <span>Help & Support</span>
                        <Link to="http://www.bambora.com/en/en/payment-solutions/customer-service/news/" target="_blank">Support</Link>
                        <LinkAndScroll to="/support/guides/getting-help/contact-us">Contact Us</LinkAndScroll>
                    </div>
                    <div className={styles.footerContainer.linkGroup}>
                        <span>Bambora</span>
                        <Link to="http://www.bambora.com/en/en/payment-solutions/" target="_blank">Main Site</Link>
                        <Link to="http://career.bambora.com/" target="_blank">Careers</Link>
                    </div>
                    <div className={styles.footerContainer.linkGroup}>
                        <span>Follow</span>
                        <Link to="https://github.com/bambora/" target="_blank">GitHub</Link>
                        <Link to="http://stackoverflow.com/questions/tagged/bambora" target="_blank">Stack Overflow</Link>
                        <Link to="https://twitter.com/Bamborapayments" target="_blank">Twitter</Link>
                        <Link to="https://www.facebook.com/BamboraINT/" target="_blank">Facebook</Link>
                    </div>
                </div>
                <div className={styles.footerContainer.copyright}>
                    <span>© 2017 Bambora Group. All rights reserved.</span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IRootState): any {
    return {};
}

export default connect(mapStateToProps)(FooterContainer);