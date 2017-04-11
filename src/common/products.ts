import * as R from "ramda";

export const productConfig = require("!json-loader!./products.config.json") as IProductsConfig;

export const getProduct = (productId: string) => R.find(
    product => product.id === productId,
    productConfig.products
);

export const getDefaultProduct = () => R.head(productConfig.products);

export const getProductApiMenu = R.compose<string, IProductConfig, Array<IApiConfig>>(
    R.path(["apis", "menu"]),
    getProduct
);

export const getProductGuideSectionMenu = R.compose<string, IProductConfig, Array<IMenuConfig>>(
    R.path(["guides", "menu"]),
    getProduct
);

export const getGuideMenuRouteFor = R.curry((
    productId   : string,
    sectionId   : string,
    guideId     : string
) => (
    `/${productId}/guides/${sectionId}/${guideId}`
));

export const getApiMenuRouteFor = R.curry((
    productId   : string,
    apiId       : string
) => (
    `/${productId}/apis/${apiId}`
));

export const getDefaultGuideSectionFor = R.compose(
    product => R.head(product.guides.menu),
    getProduct
);

export const getProductSection = R.curry((
    product: IProductConfig,
    sectionId: string
) => R.find(menu => menu.section.id === sectionId, product.guides.menu));

export const getDefaultGuideForSection = R.compose(
    menu => R.head(menu.guides),
    getProductSection
);

export const getDefaultGuideFor = R.compose(
    menu => R.head(menu.guides),
    getDefaultGuideSectionFor
);

export const getDefaultGuide = () => getDefaultGuideFor(getDefaultProduct().id);

export const getDefaultGuidePathFor = (productId: string) => {
    const defaultSection    = getDefaultGuideSectionFor(productId);
    const defaultGuide      = getDefaultGuide();

    return getGuideMenuRouteFor(
        productId,
        defaultSection.section.id,
        defaultGuide.id
    );
};

export const getDefaultGuidePath = () => {
    const defaultProduct = getDefaultProduct();

    return getDefaultGuidePathFor(defaultProduct.id);
};


export interface IProductsConfig {
    products: Array<IProductConfig>;
}

export interface IProductConfig {
    id      : string;
    name    : string;
    guides  : IGuidesConfig;
    apis    : IApisConfig;
}

export interface IGuidesConfig {
    menu    : Array<IMenuConfig>;
}

export interface IMenuConfig {
    section : ISectionConfig,
    guides  : Array<IGuideConfig>;
}

export interface ISectionConfig {
    title   : string;
    id      : string;
}

export interface IGuideConfig {
    title   : string;
    id      : string;
}

export interface IApisConfig {
    menu    : Array<IApiConfig>;
}

export interface IApiConfig {
    title   : string;
    id      : string;
}