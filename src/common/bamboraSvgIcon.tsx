import * as React       from "react";
import { Component }    from "react";


export class BamboraSvgIcon extends Component<any, any> {
    constructor (props) {
        super(props);
    }

    render () {
        const namedIcons = {
            "alert"                 : require("../vendor/svg/alert.svg"),
            "amex"                  : require("../vendor/svg/amex.svg"),
            "arrow-left"            : require("../vendor/svg/arrow-left.svg"),
            "checkbox-selected"     : require("../vendor/svg/checkbox-selected.svg"),
            "checkmark"             : require("../vendor/svg/checkmark.svg"),
            "clock"                 : require("../vendor/svg/clock.svg"),
            "close"                 : require("../vendor/svg/close.svg"),
            "close-thin"            : require("../vendor/svg/close-thin.svg"),
            "comment"               : require("../vendor/svg/comment.svg"),
            "creditcard-outline"    : require("../vendor/svg/creditcard-outline.svg"),
            "denied"                : require("../vendor/svg/denied.svg"),
            "download"              : require("../vendor/svg/download.svg"),
            "flag"                  : require("../vendor/svg/flag.svg"),
            "list"                  : require("../vendor/svg/list.svg"),
            "mastercard"            : require("../vendor/svg/mastercard.svg"),
            "more"                  : require("../vendor/svg/more.svg"),
            "notification-active"   : require("../vendor/svg/notification-active.svg"),
            "notification-inactive" : require("../vendor/svg/notification-inactive.svg"),
            "reload"                : require("../vendor/svg/reload.svg"),
            "search"                : require("../vendor/svg/search.svg"),
            "unionpay"              : require("../vendor/svg/unionpay.svg"),
            "visa"                  : require("../vendor/svg/visa.svg"),
            "giraffy"               : require("../vendor/svg/giraffy.svg"),
            "chevron-down"          : require("../vendor/svg/chevron-down.svg"),
            "chevron-up"            : require("../vendor/svg/chevron-up.svg"),
            "logo"                  : require("../vendor/svg/logo.svg"),
            "logo-bambora"          : require("../vendor/svg/logo-bambora.svg"),
            "arrow-right"           : require("../vendor/svg/arrow-right.svg"),
        };

        const classNamesConcat  = typeof(this.props.classNames) === "Array" ?
            this.props.classNames.join(" ") : "";

        let classNameValue      = this.props.className ? this.props.className :  classNamesConcat;
        classNameValue          += " svg-icon";
        
        const iconMarkup        = {__html: namedIcons[this.props.icon] || ""};

        return (
            <div className={classNameValue} dangerouslySetInnerHTML={iconMarkup}></div>
        )
    }
}