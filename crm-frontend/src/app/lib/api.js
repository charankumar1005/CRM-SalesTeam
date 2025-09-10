export const api = async (url, options = {}) => {
  const token = localStorage.getItem("userToken");

  const res = await fetch(`http://localhost:5000${url}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache", // 🚀 prevent cached 304 responses
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let message = "API Error";
    try {
      const err = await res.json();
      message = err.message || message;
    } catch (parseErr) {
      message = res.statusText || message;
    }
    throw new Error(message);
  }

  return res.json();
};
