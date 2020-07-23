import { Language as EventTranslationLanguageCode } from './generatedTypes/globalTypes';

export interface DataProviderParams {
  [index: string]: any;
}

export type MethodHandlerParams = DataProviderParams;

export type Resource =
  | 'venues'
  | 'events'
  | 'occurrences'
  | 'children'
  | 'projects';

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

export type Record = { [index: string]: any; id: string };

export type MethodHandlerResponse = {
  data: Array<Record> | Record | null;
  total?: number;
};

export type MethodHandler = (
  params: DataProviderParams
) => Promise<MethodHandlerResponse | null>;

export type MethodHandlers = {
  [key in Resource]?: {
    [key in Method]?: MethodHandler;
  };
};

export type Nullish = null | undefined;

export type ApiTranslation = {
  languageCode: EventTranslationLanguageCode;
};

export type AdminUITranslation<F> = {
  [EventTranslationLanguageCode.EN]?: F;
  [EventTranslationLanguageCode.FI]?: F;
  [EventTranslationLanguageCode.SV]?: F;
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
