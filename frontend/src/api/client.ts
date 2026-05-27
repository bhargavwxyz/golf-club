const BASE_URL = import.meta.env.VITE_BASEURL?.trim() ?? "";


async function parseJsonIfAny(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return undefined;
}

export async function apiRequest<T = unknown>(
  path: string,
  init?: Omit<RequestInit, "body"> & { body?: unknown },
): Promise<T | undefined> {
  if (!BASE_URL) {
    throw new Error("VITE_BASEURL is not configured. Set VITE_BASEURL in your environment.");
  }

  const url = `${BASE_URL}${path}`;

  const headers = new Headers(init?.headers as HeadersInit | undefined);

  let body: BodyInit | undefined = init?.body as any;
  if (body !== undefined && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers.set("content-type", "application/json");
  }

  const res = await fetch(url, { ...init, body, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API request failed (${res.status}): ${text}`);
  }

  return (await parseJsonIfAny(res)) as T | undefined;
}

export async function getJson<T = unknown>(path: string) {
  return apiRequest<T>(path, { method: "GET" });
}

export async function postJson<T = unknown>(path: string, body?: unknown) {
  return apiRequest<T>(path, { method: "POST", body });
}

export async function patchJson<T = unknown>(path: string, body?: unknown) {
  return apiRequest<T>(path, { method: "PATCH", body });
}

export async function deleteJson<T = unknown>(path: string) {
  return apiRequest<T>(path, { method: "DELETE" });
}

// Preferred helpers: `get`, `post`, `put`, `patch`, `del` — shorter and consistent
export async function get<T = unknown>(path: string) {
  return getJson<T>(path);
}

export async function post<T = unknown>(path: string, body?: unknown) {
  return postJson<T>(path, body);
}

export async function put<T = unknown>(path: string, body?: unknown) {
  return apiRequest<T>(path, { method: "PUT", body });
}

export async function patch<T = unknown>(path: string, body?: unknown) {
  return patchJson<T>(path, body);
}

export async function del<T = unknown>(path: string) {
  return deleteJson<T>(path);
}
