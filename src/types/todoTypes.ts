export type FilterStatus = 'all' | 'completed' | 'inWork';

export interface TodoTypes {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export interface TodoFormValues {
  title: string;
}
