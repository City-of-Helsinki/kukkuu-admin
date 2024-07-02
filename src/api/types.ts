import type { Language } from '../domain/api/generatedTypes/graphql';

export interface DataProviderParams {
  [index: string]: any;
}

export type MethodHandlerParams = DataProviderParams;

export type Resource =
  | 'venues'
  | 'events'
  | 'occurrences'
  | 'children'
  | 'projects'
  | 'messages'
  | 'event-groups'
  | 'events-and-event-groups'
  | 'sms';

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
  | 'PUBLISH'
  | 'SEND'
  | 'SET_READY';

export type RecordType = { [index: string]: any; id: string };
export type MethodHandlerResponseDataType =
  | RecordType
  | Array<RecordType>
  | null;

export type MethodHandlerResponse<DataType = MethodHandlerResponseDataType> = {
  //= Array<RecordType> | RecordType | null,
  data: DataType;
  total?: number;
};

export type MethodHandler = (
  params: DataProviderParams
) => Promise<MethodHandlerResponse>;

export type MethodHandlers = {
  [key in Resource]?: {
    [key in Method]?: MethodHandler;
  };
};

export type Nullish = null | undefined;

export type ApiTranslation = {
  languageCode: Language;
};

export type AdminUITranslation<F> = {
  [Language.En]?: F;
  [Language.Fi]?: F;
  [Language.Sv]?: F;
};

export type ApiNode = {
  id: string;
  translations?: ApiTranslation[];
};

export type ApiConnection = {
  edges: Array<{
    node: ApiNode | null;
  } | null>;
  count?: number;
};

export type ExtractAllowed<T, U> = T extends U ? T : never;
