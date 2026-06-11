// Central API Client configuration

export const VITE_API_URL = (import.meta.env.VITE_API_URL as string) || '';

// If VITE_API_URL environment variable is provided, use live backend, otherwise mock
export const IS_MOCK_MODE = !VITE_API_URL;

console.log(`[API Client] Mode: ${IS_MOCK_MODE ? 'Mock Mode (Local In-Memory)' : `Live Integration (${VITE_API_URL})`}`);

/**
 * Standard fetch wrapper that can be used by the backend developer
 * to integrate with their Node.js API endpoints.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${VITE_API_URL}${endpoint}`;
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  });

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `API Client Error: [${response.status}] ${response.statusText || ''} - ${errorBody}`
    );
  }

  // Handle empty responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
