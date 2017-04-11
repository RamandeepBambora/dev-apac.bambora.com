import "whatwg-fetch";
import * as openApi from "@types/swagger-schema-official";
import * as types   from "./actionTypes";
import {
    Dispatch,
    Action
}                   from "redux";


export function requestDocumentation(
    apiId: string
): IMergedAction {
    return {
        type : types.DOCUMENTATION_REQUEST,
        name : apiId,
    };
}

export function receiveDocumentationSuccess(
    apiId           : string,
    documentation   : openApi.Spec
): IMergedAction {
    return {
        type          : types.DOCUMENTATION_SUCCESS,
        name          : apiId,
        documentation : documentation
    };
}

export function receiveDocumentationError(
    apiId: string
): IMergedAction {
    return {
        type : types.DOCUMENTATION_ERROR,
        name : apiId
    };
}

export function getDocumentation(
    apiId       : string,
    endpoint    : string
) {
    return function(
        dispatch : Dispatch<IMergedAction>,
        getState : () => IRootState
    ) {
        const { documentation } = getState();
        
        if(documentation[apiId].documentation) return;
        
        fetch(endpoint)
            .then(response => response.json())
            .then(documentation => dispatch(receiveDocumentationSuccess(apiId, documentation)));
    }
}

export interface IDocumentationAction {
    name          : string;
    documentation : openApi.Spec;
}

export declare type IMergedAction = Partial<IDocumentationAction> & Action; 