import * as R                       from "ramda";
import * as React                   from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { BamboraSvgIcon }           from "../../common";
import * as Collapse                from "react-collapse";

export interface IModelPropertyTreeComponentProps {
    type                : "request" | "response";
    getModelProperties  : () => Array<ILazyModelPropertyNode>;
}

export interface IModelPropertyTreeComponentState {
    isExpanded      : { [key: string]: boolean };
    modelProperties : Array<ILazyModelPropertyNode>;
}

export class ModelPropertyTree extends React.Component<IModelPropertyTreeComponentProps, IModelPropertyTreeComponentState> {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: {},
            modelProperties: props.getModelProperties()
        };
    }

    toggleExpanded(modelPropertyNodeName: string) {
        const newState = R.clone(this.state);

        newState.isExpanded[modelPropertyNodeName] = !newState.isExpanded[modelPropertyNodeName]; 

        this.setState(newState);
    }

    render() {
        const { modelProperties } = this.state;

        if (!modelProperties || !modelProperties.length) return null;

        const getLineClasses = (
            isExpanded   : boolean,
            nestingLevel : number
        ): string => {
            if (nestingLevel > 1) return "list-item-nested";
            return isExpanded ? "list-item-expanded" : "";
        };

        const appendDotIfNeeded = (text: string) => typeof text === "string" ? text.slice(-1) === "." ? text : `${text}.` : text;

        return (
            <div className="list list-lines">
                {
                    modelProperties.map(modelPropertyNode => (
                        <div
                            className={`list-item ${getLineClasses(
                                this.state.isExpanded[modelPropertyNode.name],
                                modelPropertyNode.nestingLevel
                            )}`}
                            key={modelPropertyNode.name}>

                            <div
                                className="list-item-text flex-30"
                                onClick={!modelPropertyNode.isSimpleType ? this.toggleExpanded.bind(this, modelPropertyNode.name) : null}>
                                
                                <h1 className={modelPropertyNode.isSimpleType ? "" : "fg-primary"}>{modelPropertyNode.name}</h1>
                                {
                                    modelPropertyNode.isSimpleType ? null :
                                    <button className="btn-icon">
                                        <BamboraSvgIcon
                                            icon={this.state.isExpanded[modelPropertyNode.name] ? "chevron-up" : "chevron-down"}
                                            className={"flip-horizontal"}>
                                        </BamboraSvgIcon>
                                    </button>
                                }

                            </div>

                            {
                                this.props.type === "response" ? null :
                                <div className="list-item-text flex">
                                    {
                                        modelPropertyNode.isRequired ?
                                        <span className="text-micro fg-darkest">required</span>
                                        :
                                        <span className="text-micro">optional</span>
                                    }
                                </div>
                            }

                            <div className="list-item-text flex">
                                <span>
                                    { modelPropertyNode.shortType }
                                    { modelPropertyNode.isArray ? <span>[&nbsp;]</span> : null }
                                </span>
                            </div>

                            <div className="list-item-text flex-40">
                                {
                                    !(modelPropertyNode.property.description || modelPropertyNode.property.example) ? null :
                                    <p>
                                        {appendDotIfNeeded(modelPropertyNode.property.description)}
                                        {
                                            !modelPropertyNode.property.example ? null :
                                                <span>
                                                    <span> For example: </span>
                                                    <span className="exampleBadge">
                                                        {
                                                            modelPropertyNode.shortType === "string" ? 
                                                            `"${modelPropertyNode.property.example}"`
                                                            :
                                                            modelPropertyNode.property.example
                                                        }
                                                    </span>
                                                </span>
                                        }
                                    </p>
                                }
                            </div>

                            <Collapse
                                isOpened={!!this.state.isExpanded[modelPropertyNode.name]}
                                className="list-item-expanded flex-100"
                                style={{'paddingTop': "0"}}>                             
                                <div style={{'paddingTop': "20px"}}>
                                    <ReactCSSTransitionGroup
                                        transitionName="placeholder"
                                        transitionEnterTimeout={0}
                                        transitionLeaveTimeout={1000}>
                                        {
                                            !this.state.isExpanded[modelPropertyNode.name] ? null :
                                            <ModelPropertyTree
                                                type={this.props.type}
                                                getModelProperties={modelPropertyNode.getModelProperties}>
                                            </ModelPropertyTree>
                                        }
                                    </ReactCSSTransitionGroup>
                                </div>
                            </Collapse>

                        </div>
                    ))
                }
            </div>
        );
    }
}