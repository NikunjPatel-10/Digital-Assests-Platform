const environment = {
  production: import.meta.env.VITE_PRODUCTION === 'true',
  baseUrl: import.meta.env.VITE_BASE_URL as string,
};
export default environment;
