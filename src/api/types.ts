export interface DataProviderParams {
  [index: string]: any;
}

export type MethodHandlerParams = DataProviderParams;

export type Resource = 'venues' | 'events' | 'occurrences' | 'children';

export type Method =
  | 'LIST'
  | 'ONE'
  | 'MANY'
  | 'MANY_REFERENCE'
  | 'CREATE'
  | 'UPDATE'
  | 'UPDATE_MANY'
  | 'DELETE'
  | 'DELETE_MANY'
  | 'PUBLISH';

// TODO: Replace this with better type from react-admin
export type MethodHandlerResponse = any;

export type MethodHandler = (
  params: DataProviderParams
) => Promise<MethodHandlerResponse>;

export type MethodHandlers = {
  [key in Resource]?: {
    [key in Method]?: MethodHandler;
  };
};
