import * as React        from "react";
import * as Collapse     from "react-collapse";
import { highlightJson } from "../../common";


export interface IApiExampleResponseComponentProps {
    exampleResponse: Object;
}

export interface IApiExampleResponseComponentState {
    isExpanded: boolean;
}

export class ApiExampleResponse extends React.Component<IApiExampleResponseComponentProps, Partial<IApiExampleResponseComponentState>> {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    render() {
        const { exampleResponse } = this.props;
        const { isExpanded }      = this.state;

        if (!exampleResponse) return null;

        const numberOfLines = (exampleResponse: Object) =>
            JSON.stringify(exampleResponse, null, 2).split(/\r|\r\n|\n/).length;
            
        const isExpandable = numberOfLines(exampleResponse) > 20;

        return (
            <div className="expandable">
                <div className="small-heading">Example Response</div>
                <pre className="highlight-json">
                    <code>
                        <Collapse
                            isOpened={true}
                            fixedHeight={!isExpandable || isExpanded ? -1 : 215}>
                            <span dangerouslySetInnerHTML={{__html:highlightJson(exampleResponse)}}></span>
                        </Collapse>
                    </code>
                </pre>
                {
                    !isExpandable ? null :
                    <div className="expandButton" onClick={() => this.setState({ isExpanded: !isExpanded })}>
                        { isExpanded ? "Show less" : "Show more" }
                    </div> 
                }
            </div>
        );
    }
}