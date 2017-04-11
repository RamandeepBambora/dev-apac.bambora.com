// https://gist.github.com/julianocomg/296469e414db1202fc86

import * as React               from "react";
import { Component, PropTypes } from "react";

export class Affix extends Component<any, any> {
    static propTypes = {
        offset: PropTypes.number,
        getElement: PropTypes.func
    };

    static defaultProps = {
        offset: 0,
        getElement: () => window
    };

    constructor() {
        super();
        this.state = {
            affix: false
        };
    }

    componentDidMount() {
        if (!this.props.getElement()) return;
        this.props.getElement().addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        if (!this.props.getElement()) return;
        this.props.getElement().removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const affix     = this.state.affix;
        const offset    = this.props.offset;
        const scrollTop = this.props.getElement() === window ?
            document.documentElement.scrollTop || document.body.scrollTop : 
            this.props.getElement().scrollTop;

        if (!affix && scrollTop >= offset) {
            this.setState({
                affix: true,
            });
        }

        if (affix && scrollTop < offset) {
            this.setState({
                affix: false,
            });
        }
    };

    render() {
        const affix = this.state.affix ? "affix" : "";
        const { className, ...props } = this.props;

        return (
            <div className={`${className || ""} ${affix}`}>
                {this.props.children}
            </div>
        );
    }
}