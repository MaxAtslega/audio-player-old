export default function getApiUrl() {
  if (typeof window !== "undefined") return process.env.API_URL;
  return process.env.API_BACKEND_URL;
}
