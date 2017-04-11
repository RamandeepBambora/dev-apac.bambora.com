import { combineReducers }      from "redux";
import {
    syncHistoryWithStore,
    routerReducer as routing
}                               from "react-router-redux";
import documentation            from "./documentation/reducer";
import guide                    from "./guides/reducer";
import { RouterState }          from "react-router-redux"


const rootReducer = combineReducers({
    documentation,
    guide,
    routing
});

export default rootReducer;

declare global {
    interface IRootState {
        routing: RouterState;
    }
}