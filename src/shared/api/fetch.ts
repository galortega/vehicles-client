import { URL_BASE } from "../constants/url";

async function api<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  vehicle?: any
): Promise<T> {
  return fetch(`${URL_BASE}/${url}`, {
    method,
    body: vehicle,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{ data: T }>;
    })
    .then((data) => {
      return data.data;
    })
    .catch((error: Error) => {
      console.log(error); // todo: display error message
      throw error; /* <-- rethrow the error so consumer can still catch it */
    });
}
export default api;
