import { IApiExampleRequestComponentProps } from './documentation/components';
import * as R                               from "ramda";
import * as React                           from "react";
import { Component }                        from "react";
import { PropTypes }                        from "react";
import { connect }                          from "react-redux";
import { Link }                             from "react-router";
import * as openApi                         from "@types/swagger-schema-official";
import { BamboraSvgIcon }                   from "./common/index";
import NavigationContainer                  from "./navigation/navigationContainer";
import FooterContainer                      from "./footer/footerContainer";
import * as actions                         from "./documentation/actions";
import * as apis                            from "./vendor/api-reference";
import {
    getEndpoint,
    productConfig,
    getProductApiMenu,
    getGuideMenuRouteFor,
    getApiMenuRouteFor,
    LinkAndScroll
}                                           from "./common";

const styles = {
    main: require("./main.scss")
}

export interface IMainProps {
    dispatch?   : Function;
    productId   : string;
    version     : string;
    pathName    : string;
}

class Main extends Component<IMainProps, any> {
    static contextTypes = {
        router: PropTypes.object
    };

    onScrollAnimateHeader = null;

    bindHeaderAnimationOnScroll(element: HTMLElement) {
        if (this.onScrollAnimateHeader)
            window.removeEventListener("scroll", this.onScrollAnimateHeader);

        const { pathName } = this.props;
        if (!pathName || pathName === "/") return;

        var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var headerPosition = 0;

        this.onScrollAnimateHeader = event => {
            const newScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (newScrollTop <= 0) {
                headerPosition = 0;
            } else {
                if (newScrollTop > lastScrollTop)
                    headerPosition -= newScrollTop - lastScrollTop;
                else
                    headerPosition += lastScrollTop - newScrollTop;

                if (headerPosition < -element.clientHeight)
                    headerPosition = -element.clientHeight;
                else if (headerPosition > 0)
                    headerPosition = 0;
            }

            element.style.transform = `translateY(${headerPosition}px)`;

            lastScrollTop = newScrollTop;
        };

        window.addEventListener("scroll", this.onScrollAnimateHeader);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.onScrollAnimateHeader) {
            window.removeEventListener("scroll", this.onScrollAnimateHeader);
        }
    }

    render () {
        const { productId, version, children } = this.props;

        return (
            <div>
                <nav className={styles.main.navContainer} ref={(element) => this.bindHeaderAnimationOnScroll(element)}>
                    <div className={styles.main.navWrapper}>
                        <LinkAndScroll to="/" className={styles.main.logo}>
                            <BamboraSvgIcon icon="logo" />
                        </LinkAndScroll>
                        <div className={styles.main.navContent}>
                            {
                                !productConfig.products ? null :
                                productConfig.products.map(product => (
                                    <LinkAndScroll key={product.id} to={`/${product.id}`} activeClassName="active">
                                        { product.name }
                                    </LinkAndScroll>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.main.navMessage}>
                        <h1>Build payments.</h1>
                        <span>Compose simple and secure payment experiences for all merchant channels.</span>
                    </div>
                </nav>

                <div id="container" className={styles.main.container}>
                    <div className={styles.main.wrapper}>
                        <NavigationContainer productId={productId} />
                        <div id="content" className={styles.main.content}>
                            {children}
                        </div>
                    </div>
                </div>
                <FooterContainer />
            </div>
        );
    }
}


function mapStateToProps({ documentation, routing }: IRootState, ownProps) {
    const productId = R.path<string>(["params", "product"], ownProps);
    const version = R.path([productId, "documentation", "apiVersion"], documentation) || "...";
    const pathName = routing.locationBeforeTransitions.pathname;

    return {
        productId,
        version,
        pathName
    };
}

export default connect(mapStateToProps)(Main);


declare global {
    interface IDocumentation {
        apiVersion  : string;
        apis        : Array<IApi>;
        basePath    : string;
        models      : IModels;
    }

    interface IApi {
        path        : string;
        description : string;
        operations  : Array<IOperation>;
    }

    interface IOperation {
        httpMethod              : string;
        type                    : string;
        nickName                : string;
        parameters              : Array<IParameter>;
        summary                 : string;
        notes                   : string;
        xSimpleExampleRequest   : Object;
        xExampleRequest         : Object;
        xRequestParameters      : Array<IRequestParameter>;
        xExampleResponse        : Object;
        xResponseParameters     : Array<IResponseParameter>;
    }

    interface IParameter {
        paramType           : string;
        name                : string;
        type                : string;
        description         : string;
        xExampleValue       : string;
        required            : boolean;
    }

    interface IRequestParameter {
        name            : string;
        type            : string;
        description     : string;
        xExampleValue   : string;
        isRequired      : boolean;
        parameterType   : string;
        xIsSimpleType   : boolean;
        xShortType      : string;
        allowableValues : Array<string>;
    }

    interface IResponseParameter extends IRequestParameter { }

    interface IModels {
        [key: string]: openApi.Schema;
    }

    interface IPropertyLessModel {
        id                  : string;
        xShortType          : string;
        xNamespaceSuper     : string;
        xNamespaceSub       : string;
    }

    interface IModel extends IPropertyLessModel {
        properties          : IProperties;
    }

    interface IProperties {
        [key: string]: IProperty;
    }

    interface IProperty {
        type                : string;
        required            : boolean;
        description         : string;
        xExampleValue       : string;
        items               : { ref: string };
    }

    interface ICommonModelPropertyNode {
        name         : string;
        shortType    : string;
        isSimpleType : boolean;
        isArray      : boolean;
        isRequired   : boolean;
        model        : IPropertyLessModel;
        property     : openApi.Schema;
        nestingLevel : number;
    }
    
    interface IModelPropertyNode extends ICommonModelPropertyNode {
        modelProperties : Array<IModelPropertyNode>;
    }
    
    interface ILazyModelPropertyNode extends ICommonModelPropertyNode {
        getModelProperties : () => Array<ILazyModelPropertyNode>;
    }
}