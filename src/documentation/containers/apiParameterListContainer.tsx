import * as R                 from "ramda";
import * as React             from "react";
import { connect }            from "react-redux";
import * as openApi           from "@types/swagger-schema-official";
import {
    BamboraSvgIcon,
    capitalize,
    getModel,
    getOperationModel,
    getModelProperties
}                             from "../../common";
import { ModelPropertyTree }  from "../components";
import { DocumentationState } from "../reducer";


export interface IApiParameterListContainerProps {
    type            : "request" | "response";
    operation       : openApi.Operation;
    documentation   : DocumentationState;
}

export interface IApiParameterListContainerState {
    getModelProperties: () => Array<ILazyModelPropertyNode>;
}

type Parameter = openApi.Parameter & (
    Partial<openApi.BodyParameter> &
    Partial<openApi.FormDataParameter> &
    Partial<openApi.QueryParameter> &
    Partial<openApi.PathParameter> &
    Partial<openApi.HeaderParameter>
);

class ApiParameterListContainer extends React.Component<IApiParameterListContainerProps, IApiParameterListContainerState> {
    constructor(props: IApiParameterListContainerProps) {
        super(props);

        const { documentation, type, operation } = props;
        
        const getModelByType                = getModel(documentation);
        const getModelPropertiesByOperation = R.compose(getModelProperties(getModelByType), getOperationModel(getModelByType, type));
        const getNestedModelProperties      = () => getModelPropertiesByOperation(operation);

        this.state = {
            getModelProperties: getNestedModelProperties
        }
    }

    renderUrlParameterList(location: "header" | "path" | "query", parameters: Array<Parameter>) {
        if (!parameters || !parameters.length) return null;

        const getParametersByLocation = (location: "header" | "path" | "query" | "body") => (
            (parameter: Parameter) => parameter.in === location && parameter.name.indexOf(".") === -1
        );

        const filteredParameters = parameters.filter(getParametersByLocation(location));

        if (!filteredParameters.length) return null;

        const appendDotIfNeeded = (text: string) => typeof text === "string" ? text.slice(-1) === "." ? text : `${text}.` : text;

        return (
            <div>
                <div className="small-heading">Request {capitalize(location)} Parameters</div>
                <div className="list list-lines">
                    {
                        filteredParameters.map(parameter => (
                            <div className="list-item" key={parameter.name}>

                                <div className="list-item-text flex-30">
                                    <h1>{parameter.name}</h1>
                                </div>

                                <div className="list-item-text flex">
                                    {
                                        parameter.required ?
                                        <span className="text-micro fg-darkest">required</span>
                                        :
                                        <span className="text-micro">optional</span>
                                    }
                                </div>

                                <div className="list-item-text flex">
                                    <span>{parameter.type}</span>
                                </div>

                                <div className="list-item-text flex-40">
                                    {
                                        !parameter.description ? null :
                                        <p>
                                            {appendDotIfNeeded(parameter.description)}
                                        </p>
                                    }
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

    render() {
        const { documentation, type, operation } = this.props;

        const anyParameters      = !!R.path(["parameters", "length"], operation);
        const anyDefaultResponse = !!R.path(["responses", "default", "schema"], operation);

        if (!anyParameters && !anyDefaultResponse) return null;

        const anyBodyParameters = anyParameters && R.any(parameter => parameter.in === "body", operation.parameters);
        const showBodyParameters = type === "request" ? anyBodyParameters : anyDefaultResponse;
        
        return (
            <div>
                {
                    type !== "request" ? null : 
                    <div>
                        { this.renderUrlParameterList("header", operation.parameters) }

                        { this.renderUrlParameterList("path", operation.parameters) }

                        { this.renderUrlParameterList("query", operation.parameters) }
                    </div>
                }

                {
                    !showBodyParameters ? null :
                    <div>
                        {
                            type === "request" ? 
                            <div className="small-heading">Request Body Parameters</div>
                            :
                            <div className="small-heading">Response Body Parameters</div>
                        }
                        <ModelPropertyTree
                            type={type}
                            getModelProperties={this.state.getModelProperties} />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps({ documentation }: IRootState, ownProps): any {
    return {
        documentation: documentation
    };
}

export default connect(mapStateToProps)(ApiParameterListContainer);