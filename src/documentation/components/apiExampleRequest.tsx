import * as R                       from "ramda";
import * as React                   from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as Collapse                from "react-collapse";
import { highlightJson }            from "../../common";


export interface IApiExampleRequestComponentProps {
    simpleExampleRequest   : Object;
    extendedExampleRequest : Object;
}

interface IExampleRequest {
    type         : "Basic" | "Extended";
    value        : string;
    isExpandable : boolean;
}

export interface IApiExampleRequestComponentState {
    isExpanded           : boolean;
    exampleRequests      : Array<IExampleRequest>;
    activeExampleRequest : IExampleRequest;
}

export class ApiExampleRequest extends React.Component<IApiExampleRequestComponentProps, Partial<IApiExampleRequestComponentState>> {
    constructor(props) {
        super(props);

        const { simpleExampleRequest, extendedExampleRequest } = this.props;

        const exampleRequestState = this.getExampleRequestState(simpleExampleRequest, extendedExampleRequest);

        this.state = {
            isExpanded: false,
            ...exampleRequestState
        };
    }

    getExampleRequestState(
        simpleExampleRequest   : Object,
        extendedExampleRequest : Object
    ) {
        const numberOfLines = (exampleRequest: Object) =>
            JSON.stringify(exampleRequest, null, 2).split(/\r|\r\n|\n/).length;
            
        const isExpandable = (exampleRequest: Object) =>
            numberOfLines(exampleRequest) > 20;

        const exampleRequests: Array<IExampleRequest> = [];

        if (simpleExampleRequest) {
            exampleRequests.push({
                type         : "Basic",
                value        : highlightJson(simpleExampleRequest),
                isExpandable : isExpandable(simpleExampleRequest)
            });
        }

        if (extendedExampleRequest) {
            exampleRequests.push({
                type         : "Extended",
                value        : highlightJson(extendedExampleRequest),
                isExpandable : isExpandable(extendedExampleRequest)
            });
        }

        const activeExampleRequest = R.find(
            exampleRequest => exampleRequest.type === "Basic",
            exampleRequests
        ) || R.head(exampleRequests);

        return {
            exampleRequests,
            activeExampleRequest
        }
    }

    render() {
        const { simpleExampleRequest, extendedExampleRequest }      = this.props;
        const { isExpanded, activeExampleRequest, exampleRequests } = this.state;

        if (!simpleExampleRequest && !extendedExampleRequest) return null;

        return (
            <div className="expandable">
                <div className="preHeading">
                    <div className="small-heading">Example Request</div>
                    <div className="preHeadingMenu">
                    {
                        exampleRequests.map(exampleRequest => (
                            <div
                                key={exampleRequest.type}
                                className={`preHeadingMenuItem ${activeExampleRequest.type === exampleRequest.type ? "active" : ""}`}
                                onClick={() => this.setState({ activeExampleRequest: exampleRequest })}>
                                {exampleRequest.type}
                            </div>
                        ))
                    }
                    </div>
                </div>
                <pre className="highlight-json">
                    <code>
                        <Collapse
                            isOpened={true}
                            fixedHeight={!activeExampleRequest.isExpandable || isExpanded ? -1 : 215}>
                            <span dangerouslySetInnerHTML={{__html:activeExampleRequest.value}}></span>
                        </Collapse>
                    </code>
                </pre>
                {
                    !activeExampleRequest.isExpandable ? null :
                    <div className="expandButton" onClick={() => this.setState({ isExpanded: !isExpanded })}>
                        { isExpanded ? "Show less" : "Show more" }
                    </div> 
                }
            </div>
        );
    }
}