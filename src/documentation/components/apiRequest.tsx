import * as React                from "react";
import * as openApi              from "@types/swagger-schema-official";
import ApiParameterListContainer from "../containers/apiParameterListContainer";
import { ApiExampleRequest }     from "./apiExampleRequest";


export interface IApiRequestComponentProps {
    operation : openApi.Operation;
    basePath  : string;
    apiPath   : string;
}

export function ApiRequest({operation, basePath, apiPath}: IApiRequestComponentProps) {
    if (!operation.parameters || !operation.parameters.length) return null;

    return (
        <div>
            <ApiExampleRequest
                simpleExampleRequest={(operation as any).xSimpleExampleRequest}
                extendedExampleRequest={(operation as any).xExampleRequest} />

            <ApiParameterListContainer
                type="request"
                parameters={operation.parameters}
                operation={operation}>
            </ApiParameterListContainer>
        </div>
    );
}