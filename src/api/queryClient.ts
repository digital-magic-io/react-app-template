import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    // TODO: Deal with suspense & errorBoundary! Must choose error handling paradigm
    queries: {
      //suspense: false,
      staleTime: 5 * 60 * 1000,
      retry: false,
      refetchInterval: 300 * 1000, // re-fetch every 5 minutes
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true
      //useErrorBoundary: true
    },
    mutations: {
      //useErrorBoundary: true
    }
  }
})
