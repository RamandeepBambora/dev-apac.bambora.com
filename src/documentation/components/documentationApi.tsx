import * as R       from "ramda";
import * as React   from "react";
import * as openApi from "@types/swagger-schema-official";
import {
    ApiOverview,
    ApiSection
}                   from "./index";


export interface IDocumentationApiComponentProps {
    name            : string;
    documentation   : openApi.Spec;
}

export function getBasePath({basePath, schemes, host}: openApi.Spec) {
    if (basePath) return basePath;
    if (!host) return "";
    if (!schemes || !schemes.length) return host;

    return `${schemes[0]}://${host.replace(/(:80)|(:443)/, "")}`;
}

export default function DocumentationApi({name, documentation}: IDocumentationApiComponentProps) {
    return (
        <div>
            <h1>
                {name} API Reference&nbsp;
                <span className="badge">v{documentation.info.version}</span>
            </h1>

            {
                Object.keys(documentation.paths).map(key => (
                    <ApiSection
                        key={key}
                        path={key}
                        operations={documentation.paths[key]}
                        basePath={getBasePath(documentation)}
                    />
                ))
            }
        </div>
    );
}