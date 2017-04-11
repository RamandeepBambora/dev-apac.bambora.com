import * as React   from "react";
import {
    PropTypes,
    Component
}                   from "react";
import { connect }  from "react-redux";
import { Link }     from "react-router";
import {
    productConfig,
    getProduct,
    getProductGuideSectionMenu,
    getProductApiMenu,
    getApiMenuRouteFor,
    getGuideMenuRouteFor,
    IMenuConfig,
    IGuideConfig,
    LinkAndScroll
}                   from "../common";

const styles = {
    navigationContainer: require("./navigationContainer.scss")
}

export interface INavigationContainerProps {
    pathName    : string;
    productId?  : string;
}

class NavigationContainer extends React.Component<INavigationContainerProps, any> {
    static contextTypes = {
        router: PropTypes.object
    };

    renderGuideList(menu: IMenuConfig, guide: IGuideConfig) {
        const { productId } = this.props;
        const { router }    = this.context;

        const guideMenuRoute = getGuideMenuRouteFor(productId, menu.section.id, guide.id);
        const currentRoute = router.getCurrentLocation().pathname;

        return (
            currentRoute === guideMenuRoute ? 
            <li key={guide.title} className="active">
                <LinkAndScroll to={guideMenuRoute}>
                    {guide.title}
                </LinkAndScroll>
            </li>
            :
            <li key={guide.title}>
                <LinkAndScroll to={guideMenuRoute}>
                    {guide.title}
                </LinkAndScroll>
            </li>
        );
    }

    renderGuideMenus() {
        const { productId } = this.props;
        const guideMenu     = getProductGuideSectionMenu(productId);

        return (
            guideMenu.map(menu => (
                <div key={menu.section.id}>
                    <div className={styles.navigationContainer.heading}>{menu.section.title}</div>
                    
                    <nav>
                        <ul>
                            {
                                !menu.guides ? null : 
                                menu.guides.map(guide => this.renderGuideList(menu, guide))
                            }
                        </ul>
                    </nav>
                </div>
            ))
        );
    }

    renderApiMenu() {
        const { productId }   = this.props;
        const apiMenu         = getProductApiMenu(productId);
        const getApiMenuRoute = getApiMenuRouteFor(productId);

        if (!apiMenu || !apiMenu.length) return null;

        return (
            <div>
                <div className={styles.navigationContainer.heading}>API Reference</div>
                <nav>
                    <ul>
                        {
                            apiMenu.map(menu => (
                                this.context.router.getCurrentLocation().pathname === getApiMenuRoute(menu.id) ? 
                                <li key={menu.title} className="active"><LinkAndScroll to={getApiMenuRoute(menu.id)}>{menu.title}</LinkAndScroll></li>
                                :
                                <li key={menu.title}><LinkAndScroll to={getApiMenuRoute(menu.id)}>{menu.title}</LinkAndScroll></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        );
    }

    render() {
        if (!this.props.productId) return null;
        
        const { pathName } = this.props;

        if (!pathName || pathName === "/") return null;

        return (
            <div className={styles.navigationContainer.container}>
                <div className={styles.navigationContainer.menu}>

                    { this.renderGuideMenus() }

                    { this.renderApiMenu() }

                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IRootState, ownProps): any {
    return {
        pathName: state.routing.locationBeforeTransitions.pathname
    };
}

export default connect(mapStateToProps)(NavigationContainer);