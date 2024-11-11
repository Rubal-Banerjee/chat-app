export const jwtSecreat = "mysupersecreat";

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
