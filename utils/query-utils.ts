import type { QueryClient } from "@tanstack/react-query";

export type ApiData<T> = {
  message: string;
  data: T[];
  paginated: {
    total_records: number;
    limit: number;
    offset: number;
  };
};

export type ApiDataOne<T> = {
  message: string;
  data: T;
};

async function invalidateQueries(key: string, queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: [key] });
}

async function checkQuery(key: string, queryFn: any, queryClient: QueryClient) {
  if (await queryClient.getQueryData([key])) {
    invalidateQueries(key, queryClient);
  } else {
    // queryClient.prefetchQuery({
    //   queryKey: [key],
    //   queryFn: () => queryFn,
    // });
  }
}

export { invalidateQueries, checkQuery };
