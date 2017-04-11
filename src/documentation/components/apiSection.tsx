import * as React       from "react";
import { ApiOperation } from "./apiOperation";
import * as openApi     from "@types/swagger-schema-official";
import {
    excludeGetParameters,
    capitalize
}                       from "../../common";


export interface IApiSectionComponentProps {
    path       : string;
    operations : openApi.Path;
    basePath   : string;
}

export function ApiSection({path, operations, basePath}: IApiSectionComponentProps) {
    const apiPath = excludeGetParameters(path);

    return (
        <div>
            <a id={apiPath} name={apiPath}></a>
            {
                Object.keys(operations)
                    .filter(key => ["get", "put", "post", "delete", "options", "head", "patch"])
                    .map(key => (
                        <ApiOperation
                            key={key}
                            operation={operations[key]}
                            httpMethod={key}
                            basePath={basePath}
                            apiPath={apiPath}>
                        </ApiOperation>
                    ))
            }
        </div>
    );
}