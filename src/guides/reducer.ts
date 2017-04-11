import * as R               from "ramda";
import * as types           from "./actionTypes";


const initialState = {
    guide        : null,
    isFetching   : false,
    isError      : false,
    errorMessage : null
}

export default function guideReducer(
    state = initialState,
    action
): Partial<IGuideState> {
    switch (action.type) {
        case types.GUIDE_REQUEST:
            return {
                isFetching : true,
                isError    : false
            };

        case types.GUIDE_SUCCESS:
            return {
                isFetching : false,
                guide      : action.guide
            };

        case types.GUIDE_ERROR:
            return {
                isFetching   : false,
                isError      : true,
                errorMessage : action.errorMessage
            };

        default:
            return state;
    }
}

declare global {
    interface IRootState {
        guide: IGuideState;
    }
}

export interface IGuideState {
    guide        : string;
    isFetching   : boolean;
    isError      : boolean;
    errorMessage : string;
}