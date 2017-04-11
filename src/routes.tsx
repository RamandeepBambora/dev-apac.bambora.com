import * as React                           from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";
import Main                                 from "./main";
import LandingPageContainer                 from "./landingPage/landingPageContainer";
import DocumentationApiContainer            from "./documentation/containers/documentationApiContainer";
import GuideContainer                       from "./guides/containers/guideContainer";
import { getGuide }                         from "./guides/actions";
import { store }                            from "./store";
import { Store }                            from "redux";
import {
    getProduct,
    getDefaultProduct,
    getDefaultGuideSectionFor,
    getDefaultGuideFor,
    getDefaultGuideForSection
}                                           from "./common";


function useParamsOrDefault(nextState, replace) {
    const { product, section, guide, api } = nextState.params;

    if (api || (section && guide)) return;

    const defaultGuideSectionId = section || getDefaultGuideSectionFor(product).section.id;
    const defaultGuideId        = getDefaultGuideForSection(getProduct(product), defaultGuideSectionId).id;

    replace(`/${product}/guides/${defaultGuideSectionId}/${defaultGuideId}`);
}

function onEnterPreFetchGuide(store: Store<any>) {
    return (nextState, replace) => {
        const { product, section, guide } = nextState.params;

        store.dispatch(getGuide(product, section, guide));
    }
}

function onChangePreFetchGuide(store: Store<any>) {
    return (prevState, nextState, replace) => {
        if(
            prevState.params.product === nextState.params.product &&
            prevState.params.section === nextState.params.section &&
            prevState.params.guide   === nextState.params.guide
        ) return;

        store.dispatch(
            getGuide(
                nextState.params.product,
                nextState.params.section,
                nextState.params.guide
            )
        );
    }
}

function expandHeaderNav() {
    const element = document.querySelector("[data-reactroot]");
    if(element) element.classList.add("nav-expanded");
}

function contractHeaderNav() {
    const element = document.querySelector("[data-reactroot]");
    const navElement = document.querySelector("nav.nav-pane") as HTMLElement;

    if(element) {
        navElement.style.position = "absolute";
        element.classList.remove("nav-expanded");
        setTimeout(() => navElement.style.position = null, 1000);
    }
}

const routes = (
    <Route path="/" component={Main}>

        <IndexRoute
            component={LandingPageContainer}
            onEnter={expandHeaderNav}
            onLeave={contractHeaderNav} />

        <Route
            path=":product"
            onEnter={useParamsOrDefault}
            onChange={(prevState, nextState, replace) => useParamsOrDefault(nextState, replace)}>

            <Route
                path="guides"
                onEnter={useParamsOrDefault}
                onChange={(prevState, nextState, replace) => useParamsOrDefault(nextState, replace)}>

                <Route
                    path=":section"
                    onEnter={useParamsOrDefault}
                    onChange={(prevState, nextState, replace) => useParamsOrDefault(nextState, replace)}>

                    <Route
                        path=":guide"
                        onEnter={onEnterPreFetchGuide(store)}
                        onChange={onChangePreFetchGuide(store)}
                        component={GuideContainer}>
                    </Route>

                </Route>

            </Route>

            <Route path="apis">
                <Route path=":api" component={DocumentationApiContainer} />
            </Route>

        </Route>
        
    </Route>
);

export default routes;