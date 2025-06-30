"use server";

export type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

const BASE_URL = process.env.BASE_URL || "";

// Base fetch utility
const fetchFromApi = async <T>(
  url: string,
  method: Method = "GET",
  data?: T,
  token?: string,
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${BASE_URL}${url}`, options);

    if (res.status === 204) {
      return { status: "success" };
    }

    if (!res.ok) {
      return await res.json();
    }

    return await res.json();
  } catch (error) {
    throw await handleApiError(error);
  }
};

// Public API request
export const ApiRequest = async <T>(
  url: string,
  method: Method = "GET",
  data?: T,
) => {
  return await fetchFromApi<T>(url, method, data);
};

// // Authenticated API request
// export const AuthorizedApiRequest = async <T>(
//   url: string,
//   method: Method = "GET",
//   data?: T,
// ) => {
//   const { token } = await verifySession();

//   return await fetchFromApi<T>(url, method, data, token);
// };

// Error handler
export const handleApiError = async (error: unknown) => {
  if (
    error instanceof TypeError &&
    error.message.toLowerCase().includes("fetch")
  ) {
    return {
      status: 503,
      message:
        "Unable to connect to the server. Please check your internet connection.",
    };
  }

  if (error instanceof Error) {
    console.log(error.message);
    return {
      status: 500,
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    };
  }

  return {
    status: 500,
    message: "Something went wrong. Please try again.",
  };
};
