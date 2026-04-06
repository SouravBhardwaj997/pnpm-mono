// express.d.ts
declare namespace Express {
  interface Request {
    user?: {
      id: number;
      email: string;
      username: string;
      name: string;
      createdAt: string;
      iat: number;
    };
  }
}
