import * as React      from "react";
import * as openApi    from "@types/swagger-schema-official";
import { ApiRequest }  from "./apiRequest";
import { ApiResponse } from "./apiResponse";
import { capitalize, excludeGetParameters } from "../../common";


export interface IApiOperationComponentProps {
    operation  : openApi.Operation;
    httpMethod : string;
    basePath   : string;
    apiPath    : string;
}

export function ApiOperation({
    operation,
    httpMethod,
    basePath,
    apiPath
}: IApiOperationComponentProps) {
    return (
        <div>
            <a name={operation.summary} id={operation.summary}></a>
            <h2>{capitalize(operation.summary)}</h2>
            <p>{operation.description}</p>

            <p>
                <span className="badge">{httpMethod.toUpperCase()}</span>
                <span className="fg-primary text-sm">
                    {basePath}{excludeGetParameters(apiPath)}
                </span>
            </p>

            <ApiRequest operation={operation}
                        basePath={basePath}
                        apiPath={apiPath}>
            </ApiRequest>

            <ApiResponse operation={operation}></ApiResponse>
        </div>
    );
}