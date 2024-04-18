import { TokenRepositoryI } from "../../domain/repository/TokenRepository";

export class VerifyTokenService {
  constructor(private readonly tokenRepository: TokenRepositoryI) {}
  async run(token: string) {
    try {
      const res = await this.tokenRepository.verifyToken(token);
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
