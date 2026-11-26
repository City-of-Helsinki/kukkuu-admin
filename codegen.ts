import type { CodegenConfig } from '@graphql-codegen/cli';

const apiUri = process.env.VITE_API_URI;

if (!apiUri) {
  throw new Error('GraphQL codegen: VITE_API_URI is not set, please set it.');
}

const config: CodegenConfig = {
  // By default the introspection query omits deprecated input fields.
  // Deprecated is not the same as removed, and leaving deprecated fields out
  // of the generated types would break code that still uses them.
  //
  // NOTE: The URL loader supports `inputValueDeprecation`, but codegen's
  // `UrlSchemaOptions` type does not declare it.
  schema: [{ [apiUri]: { inputValueDeprecation: true } }],
  documents: ['src/**/*.ts'],
  generates: {
    'src/domain/api/generatedTypes/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: false,
        withComponent: false,
        flattenSelectionSet: true,
        avoidOptionals: {
          field: true,
          object: true,
        },
        dedupeOperationSuffix: true,
      },
      hooks: { afterOneFileWrite: ['prettier --write'] },
    },
  },
};

export default config;
