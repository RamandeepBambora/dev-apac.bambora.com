import * as React from "react";
import { Link, browserHistory } from "react-router";


export function scrollToTopAndTransitionTo(url: string) {
    var onScrollingStoppedBeforeReachingTop = null;

    const p = new Promise((resolve, reject) => {
        if (document.body.scrollTop === 0) return resolve();

        const onScroll = event => {
            if (onScrollingStoppedBeforeReachingTop)
                clearTimeout(onScrollingStoppedBeforeReachingTop);

            onScrollingStoppedBeforeReachingTop = setTimeout(() => {
                window.removeEventListener("scroll", onScroll);
                reject();
            }, 50);

            if (document.body.scrollTop === 0) {
                clearTimeout(onScrollingStoppedBeforeReachingTop);
                window.removeEventListener("scroll", onScroll);
                resolve();
            }
        };

        window.addEventListener("scroll", onScroll);
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    });

    p.then(
        function onFulfilled() {
            browserHistory.push(url);
        },
        function onRejected() {
            document.body.scrollTop = 0;
            browserHistory.push(url);
        }
    );
}


export interface ILinkAndScrollComponentProps {
    to: string;
}

export class LinkAndScroll extends React.Component<ILinkAndScrollComponentProps | any, any> {
    transitionTo(event: React.MouseEvent<any>, url: string) {
        event.preventDefault();
        scrollToTopAndTransitionTo(url);
    }

    render() {
        const { to, children, ...props } = this.props;

        return <Link to={to} onClick={event => this.transitionTo(event, to)} {...props}>{children}</Link>;
    }
}
