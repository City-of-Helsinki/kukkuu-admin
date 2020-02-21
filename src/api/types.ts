export interface DataProviderParams {
  [index: string]: any;
}

export type MethodHandlerParams = DataProviderParams;

export type Resource = 'venues' /* | 'events' | 'children' */;

export type Method =
  | 'LIST'
  | 'ONE'
  | 'MANY'
  | 'MANY_REFERENCE'
  | 'CREATE'
  | 'UPDATE'
  | 'UPDATE_MANY'
  | 'DELETE'
  | 'DELETE_MANY';

export interface MethodHandlerResponse {
  [index: string]: any;
  data: { [index: string]: any };
  total?: number;
}

export type MethodHandler = (
  params: DataProviderParams
) => Promise<MethodHandlerResponse>;

export type MethodHandlers = {
  [key in Resource]?: {
    [key in Method]?: MethodHandler;
  };
};
