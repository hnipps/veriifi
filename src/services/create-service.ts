export const createService = (request: any, transform: any) => {
  return (...params: any[]) => request(...params).then(transform);
};
