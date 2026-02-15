import { config } from "@/config";

/**
 * Custom fetch wrapper that adds ngrok bypass header
 * This prevents the ngrok warning page from appearing on API requests
 */
export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const url = endpoint.startsWith("http")
        ? endpoint
        : `${config.apiBaseUrl}${endpoint}`;

    const headers = new Headers(options.headers);

    // Add ngrok bypass header
    headers.set("ngrok-skip-browser-warning", "true");

    // Add default Content-Type if not set and body exists
    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(url, {
        ...options,
        headers,
    });
}
