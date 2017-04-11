import * as R       from "ramda";
import * as openApi from "@types/swagger-schema-official";
import * as types   from "./actionTypes";
import { IDocumentationAction, IMergedAction } from "./actions";


const initialPartialState: IPartialDocumentationState = {
    documentation : null,
    isFetching    : false,
    isError       : false
}

const initialState: DocumentationState = {
    checkout     : R.clone(initialPartialState),
    data         : R.clone(initialPartialState),
    merchant     : R.clone(initialPartialState),
    subscription : R.clone(initialPartialState),
    transaction  : R.clone(initialPartialState),
    payment      : R.clone(initialPartialState),
    merchant2    : R.clone(initialPartialState)
}

export default function apiReducer(
    state = initialState,
    action: IMergedAction
): DocumentationState {
    const partialStateLens  = R.lensProp(action.name);
    const viewPartialState  = R.view(partialStateLens, state);
    const mergePartialState = R.merge(viewPartialState);

    switch (action.type) {
        case types.DOCUMENTATION_REQUEST:
            return R.set(
                partialStateLens,
                mergePartialState({
                    isFetching : true,
                    isError    : false
                }),
                state
            );

        case types.DOCUMENTATION_SUCCESS:
            return R.set(
                partialStateLens,
                mergePartialState({
                    isFetching    : false,
                    documentation : action.documentation
                }),
                state
            );

        case types.DOCUMENTATION_ERROR:
            return R.set(
                partialStateLens,
                mergePartialState({
                    isFetching : false,
                    isError    : true
                }),
                state
            );

        default:
            return state;
    }
}

declare global {
    interface IRootState {
        documentation: DocumentationState;
    }
}

export type DocumentationState = {
    [partialDocumentationStateName: string]: IPartialDocumentationState;
}

export interface IPartialDocumentationState {
    documentation : openApi.Spec;
    isFetching    : boolean;
    isError       : boolean;
}