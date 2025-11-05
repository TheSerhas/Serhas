import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchInterval: 30_000,
			refetchIntervalInBackground: true,
		},
	},
});
