import * as React                from "react";
import * as openApi              from "@types/swagger-schema-official";
import ApiParameterListContainer from "../containers/apiParameterListContainer";
import { ApiExampleResponse }    from "./apiExampleResponse";
import { getModel }              from "../../common/modelPropertyTree";


export interface IApiResponseComponentProps {
    operation: openApi.Operation;
}

export function ApiResponse({operation}: IApiResponseComponentProps) {
    if (!operation) return null;  

    return (
        <div>
            <ApiExampleResponse exampleResponse={(operation as any).xExampleResponse} />

            <ApiParameterListContainer
                type="response"
                parameters={operation.responses["default"].schema.$ref}
                operation={operation}>
            </ApiParameterListContainer>
        </div>
    );
}