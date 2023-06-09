export interface QueryResultHeaderType {
  type: 'string' | 'number' | 'json' | 'decimal';
}

export interface QueryResultHeader {
  name: string;
  type: QueryResultHeaderType;
  schema?: {
    database?: string;
    table?: string;
    column?: string;
    primaryKey?: boolean;
  };
}

export type QueryResultPrimary = Record<string, Record<string, unknown>>;

export interface QueryResult {
  resultHeader?: {
    affectedRows: number;
    changedRows: number;
  };
  error: {
    message: string;
  } | null;
  keys: QueryResultPrimary;
  headers: QueryResultHeader[];
  rows: unknown[][];
}
