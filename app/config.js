// BASE AXIOS CONFIGURATION
export const axiosConfig = (token) => {
  const headers = { "Accept": "application/json", "Content-Type": "application/json"}
  if (token) {
    return { "headers": Object.assign({}, headers, { "Authorization": token })};
  } else {
    return { "headers": headers };
  }
};
