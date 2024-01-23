type AppConfig = {
  apiBaseUrl: string;
};

const useLocalApi = false;

export const appConfig: AppConfig = {
  apiBaseUrl: useLocalApi
    ? "http://localhost:1337"
    : process.env.NEXT_PUBLIC_API_URL,
};
