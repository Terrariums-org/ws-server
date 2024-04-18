export interface TokenRepositoryI {
  verifyToken(token: string): Promise<any>;
}
