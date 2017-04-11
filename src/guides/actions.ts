import "whatwg-fetch";
import * as R                 from "ramda";
import * as types             from "./actionTypes";
import { Dispatch, Action }   from "redux";
import { normalizeParameter } from "../common";
import * as guides            from "./../vendor/guides";


export function requestGuide(url: string) {
    return {
        type: types.GUIDE_REQUEST,
        url
    };
}

export function receiveGuideSuccess(guide: string) {
    return {
        type: types.GUIDE_SUCCESS,
        guide
    };
}

export function receiveGuideError(errorMessage: string) {
    return {
        type: types.GUIDE_ERROR,
        errorMessage
    };
}

export function getGuide(
    product   : string,
    section   : string,
    guide     : string,
    callback? : Function
): any {
    return function(
        dispatch : Dispatch<any>,
        getState : () => IRootState
    ) {
        const guidePath = guide ? [product, section, guide] : [product, section];
        const guideUrl  = R.path<string>(guidePath.map(normalizeParameter), guides);

        if (!guideUrl) {
            return dispatch(receiveGuideError("The requested guide does not exist."));
        }

        dispatch(requestGuide(guideUrl));

        fetch(guideUrl)
            .then(response => response.text())
            .then(guide => {
                dispatch(receiveGuideSuccess(guide));
                if(callback) callback();
            })
            .catch(error => {
                dispatch(receiveGuideError(
                        "The requested guide is currently unavailable. " +
                        "Try again later."
                ));
                if(callback) callback();
            });
    }
}