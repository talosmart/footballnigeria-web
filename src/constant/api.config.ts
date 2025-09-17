import { useFootballStore } from "@/store/footballStore";
import { useUserStore } from "@/store/userStore";

export type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

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

    if (res.status === 200) {
      const response = await res.json();
      return { response };
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

// Authenticated API request
export const AuthorizedApiRequest = async <T>(
  url: string,
  method: Method = "GET",
  data?: T,
) => {
  const token = useUserStore.getState().token ?? undefined;
  if(!token){
    return console.log('token')
  }

  return await fetchFromApi<T>(url, method, data, token);
};


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

export const getCalendar = async <T>(): Promise<T> => {
  const res = await fetch("/api/calendar", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch calendar");
  }

  return (await res.json()) as T;
};

export const getFixtures = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/fixtures?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch fixtures");
  }

  return (await res.json()) as T;
};

export const getLiveFixtures = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/live-fixtures?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch fixtures");
  }

  return (await res.json()) as T;
};

export const getSquads = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/getSquads?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch fixtures");
  }

  return (await res.json()) as T;
};

export const getTrophies = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/getTrophies?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch trophy data");
  }

  return (await res.json()) as T;
};

export const getStandings = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/getStandings?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch standings");
  }

  return (await res.json()) as T;
};

export const getTransferData = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/getTransferData?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch transfer data");
  }

  return (await res.json()) as T;
};

export const getMatchPreview = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/getMatchPreview?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch match preview");
  }

  return (await res.json()) as T;
};

export const getBasicMatchStats = async <T>(id: string): Promise<T> => {
  const res = await fetch(`/api/getBasicMatchStats?id=${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch match preview");
  }

  return (await res.json()) as T;
};


export const getFeaturedPolls = async <T>(): Promise<T> => {
   const {
      setLoading,
    } = useFootballStore.getState();

    setLoading(true)
  const res = await fetch(`/api/getFeaturedPolls`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch polls");
  }
  setLoading(false)

  return (await res.json()) as T;
};

export const getAllPolls = async <T>(): Promise<T> => {
   const {
      setLoading,
    } = useFootballStore.getState();

    setLoading(true)
  const res = await fetch(`/api/getAllPolls`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch polls");
  }
  setLoading(false)

  return (await res.json()) as T;
};

