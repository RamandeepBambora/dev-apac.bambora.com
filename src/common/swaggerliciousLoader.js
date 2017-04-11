const swaggerlicious = require("@bambora/swaggerlicious").default;

module.exports = function(source) {
    const callback = this.async();
    const value = typeof source === "string" ? JSON.parse(source) : source;

    const transformedValue = swaggerlicious(value).then(
        result => callback(null, JSON.stringify(result))
    ).catch(e => console.log(e));
}