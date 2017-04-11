export function highlightJson(json: any) {
    if (typeof json != "string") {
        json = JSON.stringify(json, undefined, 2);
    }

    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
        var elementClass = "number";

        if (/^"/.test(match)) {

            if (/:$/.test(match)) {
                elementClass = "key";
            } else {
                elementClass = "string";
            }

        } else if (/true|false/.test(match)) {
            elementClass = "boolean";
        } else if (/null/.test(match)) {
            elementClass = "null";
        }

        return `<span class="${elementClass}">${match}</span>`;
    });
};