import * as R                               from "ramda";
import * as apis                            from "../vendor/api-reference";

export function getEndpoint(apiId: string) {
    return R.prop<string>(apiId, apis);
}