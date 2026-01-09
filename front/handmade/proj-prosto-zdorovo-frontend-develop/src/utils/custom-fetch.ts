import { ServiceUnavailableError } from '@/types/errors';

async function parseJSONSafe<T>(response: Response): Promise<T | null> {
  try {
    return response.clone().json();
  } catch {
    throw new ServiceUnavailableError();
  }
}

export const fetchWithSafeParseJson: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);

  if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
    const resp = response.clone();
    try {
      const data = await parseJSONSafe(resp);
      response.json = () => Promise.resolve(data);
      return response;
    } catch (error) {
      response.json = () => Promise.reject(error);
      return response;
    }
  }

  return response;
};
