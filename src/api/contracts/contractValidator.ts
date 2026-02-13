import { type AnySchema, type ErrorObject } from 'ajv';
import { createAjvWithAeSchemas } from './registerSchemas';

const ajv = createAjvWithAeSchemas();

const cache = new Map<string, ReturnType<typeof ajv.compile>>();

function formatErrors(errors: ErrorObject[] | null | undefined) {
  if (!errors?.length) return '[]';
  return JSON.stringify(
    errors.map((e) => ({
      path: e.instancePath || e.schemaPath,
      message: e.message,
      keyword: e.keyword,
      params: e.params,
    })),
    null,
    2,
  );
}

export function validateSchema(args: { name: string; schema: AnySchema; data: unknown }) {
  let validate = cache.get(args.name);
  if (!validate) {
    validate = ajv.compile(args.schema);
    cache.set(args.name, validate);
  }

  const ok = validate(args.data);
  if (!ok) {
    throw new Error(
      `Contract validation failed for "${args.name}":\n${formatErrors(validate.errors)}`,
    );
  }
}
