import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk                                            from "redux-thunk";
import * as createLogger                                from "redux-logger";
import rootReducer                                      from "./rootReducer";


function create() {
    const middlewares = [thunk];

    if (process.env.NODE_ENV === "development")
        middlewares.push(createLogger());

    const composeEnhancers = process.env.NODE_ENV === "development" ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

	const createStoreWith   = composeEnhancers(applyMiddleware(...middlewares))(createStore);
    const store: Store<any> = createStoreWith(rootReducer);

    return store;
}

export const store = create();