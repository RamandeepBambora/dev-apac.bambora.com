import * as R                               from "ramda";

const toLowerCase = (str: string) => str.toLowerCase();

const toCamelCase = (str: string) => str.replace(
    /-+([a-z])/g,
    (match, submatch: string) => submatch.toUpperCase()
);

export const normalizeParameter = R.compose(toCamelCase, toLowerCase);