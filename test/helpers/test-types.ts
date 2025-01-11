export interface SuperTestError extends Error {
  response?: {
    status: number;
    body: any;
  };
}
