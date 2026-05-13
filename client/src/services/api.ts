const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<TBody> {
  body?: TBody;
  token?: string;
  method?: HttpMethod;
}

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await response.json()) as TResponse;

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return payload;
}

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest("/auth/login", { method: "POST", body: { email, password } }),
  register: (name: string, email: string, password: string) =>
    apiRequest("/auth/register", { method: "POST", body: { name, email, password } }),
};
