import * as React           from "react";
import {
    excludeGetParameters,
    BamboraSvgIcon
}                           from "../../common";


export interface IApiOverviewComponentProps {
    apis: Array<IApi>;
}

export function ApiOverview({apis}: IApiOverviewComponentProps) {
    return (
        <div>
            <div className="list list-lines">
                {
                    apis.map((api, i) => (
                        <div key={api.path} className="list-item">
                            <div className="list-item-text">
                                <h1>{excludeGetParameters(api.path)}</h1>
                                <p>
                                    {
                                        api.operations.map((operation, i, a) => (
                                            <span key={operation.nickName}>
                                                <a href={`#${operation.nickName}`}>{operation.httpMethod}</a>{i < a.length - 1 ? " | " : ""}
                                            </span>
                                        ))
                                    }
                                </p>
                                {
                                    !api.description ?
                                        null :
                                        <p>{api.description}</p>
                                }
                            </div>
                            <div className="list-item-secondary">
                                <a href={`#${excludeGetParameters(api.path)}`} className="btn-icon">
                                    <BamboraSvgIcon icon="arrow-left" className="flip-horizontal"></BamboraSvgIcon>
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}