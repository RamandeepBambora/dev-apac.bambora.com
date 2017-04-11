import * as React             from "react";
import { connect, Dispatch }  from "react-redux";
import * as openApi           from "@types/swagger-schema-official";
import { DocumentationState } from "../reducer";
import * as actions           from "../actions";
import DocumentationApi       from "../components/documentationApi";
import { capitalize, getEndpoint, hashLinkScroll } from "../../common";


export interface IDocumentationApiContainerProps {
    dispatch?       : Function;
    documentation   : openApi.Spec;
    isFetching      : boolean;
    name            : string;
}


class DocumentationApiContainer extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.fetchDocumentation();
    }

    private fetchDocumentation() {
        this.props.dispatch(
            actions.getDocumentation(
                this.props.name,
                getEndpoint(this.props.name)
            )
        );
    }

    componentDidMount() {
        hashLinkScroll();
    }

    componentDidUpdate() {
        hashLinkScroll();
    }

    render() {
        this.fetchDocumentation();

        if(this.props.isFetching || (!this.props.documentation && !this.props.isError)) {
            return (
                <div>
                    <h2 className="skeleton">&nbsp;</h2>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <p className="skeleton"></p>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <hr className="skeleton" />
                    <h3 className="skeleton">&nbsp;</h3>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <p className="skeleton"></p>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                    <p className="skeleton"></p>
                    <div className="skeleton">&nbsp;</div>
                    <div className="skeleton">&nbsp;</div>
                </div>
            );
        }

        if(!this.props.documentation) {
            return <div>No documentation found.</div>;
        }

        return (
            <DocumentationApi name={capitalize(this.props.name)} documentation={this.props.documentation} />
        );
    }
}

function mapStateToProps({ documentation }: IRootState, ownProps): IDocumentationApiContainerProps {
    let api = ownProps.params.api.toLowerCase();

    return {
        documentation   : documentation[api].documentation,
        isFetching      : documentation[api].isFetching,
        name            : api
    };
}

export default connect(mapStateToProps)(DocumentationApiContainer);