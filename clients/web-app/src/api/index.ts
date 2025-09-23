import { cookies } from "next/headers";
import { RequestError } from "./errors/request.error";

export namespace Api {
  export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  export type RequestMethod = "GET" | "POST" | "PATCH";

  export const getCookies = async () => {
    const allCookies = (await cookies()).toString();

    return allCookies;
  };

  export const getAccessToken = async () => {
    const allCookies = await cookies();

    return allCookies.get("accessToken");
  };

  export const request = async <B extends BodyInit | null | undefined>(
    path: string,
    method: RequestMethod,
    options?: {
      body?: B;
      headers?: HeadersInit;
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
        next: {
          revalidate: 60 * 2, // 2 minutes
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
