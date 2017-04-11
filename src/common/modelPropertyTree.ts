import * as R                 from "ramda";
import * as openApi           from "@types/swagger-schema-official";
import { DocumentationState } from "../documentation/reducer";
import * as apis              from "../vendor/api-reference";


const removeProperties = R.dissoc("properties");

export const getModel = R.curry(function(
    documentation   : DocumentationState,
    type            : string
): openApi.Schema {
    type = typeof type === "string" ? type.replace("#/definitions/", "") : type;

    const allModels = R.mergeAll<{[definitionsName: string]: openApi.Schema}>(
        R.values(documentation).map(
            partialDocumentationState => partialDocumentationState.documentation ?
                partialDocumentationState.documentation.definitions : null
        )
    );
    
    const model = R.prop<openApi.Schema>(type, allModels);
    
    return model;
});

export const getProperty = R.curry(function(
    model           : openApi.Schema,
    propertyName    : string
) {
    return model.properties[propertyName];
});


export const getOperationModel = R.curry(function(
    getModel    : (type: string) => openApi.Schema,
    type        : "request" | "response",
    operation   : openApi.Operation
): openApi.Schema {
    if (!operation) return null;

    const nestingLevel = 1;

    let requestType    : string         = null,
        operationModel : openApi.Schema = null;

    if(type === "request") {
        const requestParameter: openApi.BodyParameter = R.find<any>(
            parameter => parameter.in === "body",
            operation.parameters
        );

        requestType = requestParameter ? requestParameter.schema.$ref : null;
    }

    operationModel = type === "request" ?
        getModel(requestType) : getModel(operation.responses["default"].schema.$ref);

    if (!operationModel) return null;

    return operationModel;
});

export const getShortType = (type: string) => {
    return type.match(/\w+$/)[0];
};

export const getModelProperty = R.curry(function(
    getModel     : (type : string) => openApi.Schema,
    property     : openApi.Schema,
    nestingLevel : number,
    propertyName : string,
    isRequired   : boolean,
) : ILazyModelPropertyNode {
    const $ref = R.prop<string>("$ref", property);
    if ($ref) property = getModel($ref);

    const getModelPropertyByProperty = (_property: openApi.Schema, propertyName: string) => 
        getModelProperty(getModel, _property, nestingLevel + 1, propertyName, property.required && R.any(required => required === propertyName, property.required));
        
    const getModelPropertiesFromProperties: (properties: {[definitionsName: string]: openApi.Schema}) => Array<ILazyModelPropertyNode> = 
        R.compose(R.values, R.mapObjIndexed(getModelPropertyByProperty));

    const isArray            = property.type === "array",

          propertyModel      = isArray ?
                                (property.items as openApi.Schema).$ref ?
                                    getModel((property.items as openApi.Schema).$ref)
                                    :
                                    property.items as openApi.Schema
                                :
                                getModel(property.format),

          model              = propertyModel ? removeProperties<IPropertyLessModel>(propertyModel) : null,

          isSimpleType       = !(property.type === "object" || property.type === "array"),

          shortType          = getShortType(isSimpleType ? property.type : isArray ? propertyModel.format : property.format),

          getModelProperties = () => propertyModel ? getModelPropertiesFromProperties(propertyModel.properties) : null;
    
    return {
        name: propertyName,
        shortType,
        isSimpleType,
        isArray,
        isRequired,
        model,
        property,
        getModelProperties,
        nestingLevel
    }
});


export const getModelProperties = R.curry(function(
    getModel : (type : string) => openApi.Schema,
    model    : openApi.Schema
) {
    const getModelPropertyByProperty = (property: openApi.Schema, propertyName: string) =>
        getModelProperty(getModel, property, 1, propertyName, model.required && model.required.indexOf(propertyName) > -1);

    const getModelPropertiesFromProperties: (properties: {[definitionsName: string]: openApi.Schema}) => Array<ILazyModelPropertyNode> = 
        R.compose(R.values, R.mapObjIndexed(getModelPropertyByProperty));

    return getModelPropertiesFromProperties(model.properties);
});