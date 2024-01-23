type AppConfig = {
  apiBaseUrl: string;
};

const useLocalApi = false;

export const appConfig: AppConfig = {
  apiBaseUrl: useLocalApi ? process.env.LOCAL_API_URL : process.env.API_URL,
};
