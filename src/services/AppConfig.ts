type AppConfig = {
  apiBaseUrl: string;
};

export const appConfig: AppConfig = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_USE_LOCAL_API === "true"
      ? "http://localhost:1337"
      : process.env.NEXT_PUBLIC_API_URL,
};
