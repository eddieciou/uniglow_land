const apiUtil = (apiURL, method, authNeeded, body, xAPIKey) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const headers = {
    'Content-Type': ['POST', 'PUT', 'PATCH'].includes(method) ? 'application/json' : undefined,
  };
  if (authNeeded) { headers.Authorization = user ? `key: ${user.token}` : undefined; }
  if (xAPIKey) { headers['X-API-Key'] = xAPIKey; }

  const fetchOptions = {
    method,
    headers,
    body: method === 'GET' ? undefined : JSON.stringify(body),
    mode: 'cors',
  };

  return fetch(apiURL, fetchOptions);
};

export default apiUtil;
