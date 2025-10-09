import { RequestError } from "./errors/request.error";

export namespace Api {
  export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  export type RequestMethod = "GET" | "POST" | "PATCH";

  export const getCookies = async () => {
    const { cookies } = await import("next/headers");
    const allCookies = (await cookies()).toString();

    return allCookies;
  };

  export const getAccessToken = async () => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const allCookies = await cookies();

      return allCookies.get("accessToken")?.value;
    } else {
      const cookie = await import("js-cookie");

      return cookie.default.get("accessToken")?.toString();
    }
  };

  export const request = async <B extends BodyInit | null | undefined>(
    path: string,
    method: RequestMethod,
    options?: {
      body?: B;
      headers?: HeadersInit;
      next?: NextFetchRequestConfig;
      cache?: RequestCache;
    }
  ) => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`${BASE_URL}/${path}`, {
        method,
        body: options?.body,
        headers: options?.body
          ? {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              ...options?.headers,
            }
          : { Authorization: `Bearer ${accessToken}`, ...options?.headers },
        cache: options?.cache,
        next: {
          revalidate: 15, // 15 seconds
          ...options?.next,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();

        throw new RequestError(
          responseData.message ?? "Request returned error"
        );
      }

      return response;
    } catch (error) {
      console.log(error);

      throw new Error("Unable to finish request");
    }
  };
}
