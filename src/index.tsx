(require as any).context("!file-loader?name=assets/images/[name].[ext]!./vendor/images/", true, /.*/)
import "./vendor/ui.bambora.com.1.1.0.css";
import "./common/list.scss";
import "core-js/shim";

import { polyfill }             from "smoothscroll-polyfill";
polyfill();

import * as React               from "react";
import { render }               from "react-dom";
import {
    Router,
    Route,
    browserHistory
}                               from "react-router";
import { Provider }             from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { store }                from "./store";
import routes                   from "./routes";
import * as guides              from "./vendor/guides";

function bootstrap() {
    const history     = syncHistoryWithStore(browserHistory as any, store);
    const rootElement = document.createElement("div");

    rootElement.id    = "root";
    document.body.appendChild(rootElement);

    return render(
        <Provider store={store}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </Provider>,
        rootElement
    );
}

bootstrap();