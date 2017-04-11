import "whatwg-fetch";
import * as R                                                          from "ramda";
import * as React                                                      from "react";
import { connect, Dispatch }                                           from "react-redux";
import { Link }                                                        from "react-router";
import { capitalize, getEndpoint, normalizeParameter, hashLinkScroll } from "../../common";
import * as guides                                                     from "./../../vendor/guides";


export interface IGuideContainerProps {
    guide        : string;
    isFetching   : boolean;
    isError      : boolean;
    errorMessage : string;
}

class GuideContainer extends React.Component<IGuideContainerProps, any> {
    shouldComponentUpdate(nextProps: IGuideContainerProps, nextState: any) {
        return nextProps.isError || !!nextProps.guide;
    }

    componentDidMount() {
        hashLinkScroll();
    }

    componentDidUpdate() {
        hashLinkScroll();
    }

    render() {
        const { guide, isFetching, isError, errorMessage } = this.props;

        if (isFetching && !guide) {
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
        
        if (isError) {
            return <div>{errorMessage}</div>;
        }

        return <div dangerouslySetInnerHTML={{ __html: guide}} />;
    }
}

function mapStateToProps({ guide }: IRootState): Partial<IGuideContainerProps> {
    return {
        guide        : guide.guide,
        isFetching   : guide.isFetching,
        isError      : guide.isError,
        errorMessage : guide.errorMessage
    };
}

export default connect(mapStateToProps)(GuideContainer);