import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import { cache } from 'react';
import ploneClient from '@plone/client';

export const API_PATH = 'http://localhost:8080/Plone' as const;

export const client = ploneClient.initialize({ apiPath: API_PATH });

export const getServerQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
        dehydrate: {
          // per default, only successful Queries are included,
          // this includes pending Queries as well
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending',
        },
      },
    })
);
