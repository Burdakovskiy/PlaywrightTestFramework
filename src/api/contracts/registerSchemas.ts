import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { AeSchemas } from './ae.schemas';

export function createAjvWithAeSchemas() {
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    allowUnionTypes: true,
  });

  addFormats(ajv);

  for (const s of AeSchemas.allSchemas()) {
    ajv.addSchema(s);
  }

  return ajv;
}
