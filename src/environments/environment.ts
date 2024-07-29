const environment = {
  production: false,
  baseUrl: import.meta.env.VITE_BASE_URL,
};
const baseUrl = environment.baseUrl;
export { baseUrl };