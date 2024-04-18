import { verify } from "jsonwebtoken";
import { TokenRepositoryI } from "../../domain/repository/TokenRepository";

export class JwtRepositoryImp implements TokenRepositoryI {
  private readonly secretKey = process.env.JWT_SECRET ?? "HaruYNacho";
  verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      verify(token, this.secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
