import Ajv from "ajv";

const ajv = new Ajv({coerceTypes: true}); //* Force type defined in the schema (type coercion)

//* add-formats if require4d

export default ajv;