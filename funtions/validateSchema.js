import Ajv from 'ajv';
import { ValidateSchemaError } from '../Exceptions/CustomError.js';
import { invalidSchema, validScheme, validatingSchema } from '../resources/texts.js';
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const ValidateSchema = (schema,data) => {
    console.log(validatingSchema);
    const validate = ajv.compile(schema);
    const valid = validate(data)
    if (!valid) new ValidateSchemaError(invalidSchema,validate.errors);
    console.log(validScheme);
};
export { ValidateSchema }