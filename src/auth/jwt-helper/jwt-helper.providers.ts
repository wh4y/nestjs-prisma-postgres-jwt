import { ValueProvider } from "@nestjs/common";
import { JWT_OPTIONS } from "./constants";
import { JwtOptions } from "./interfaces";

export const jwtHelperProviders: ValueProvider<JwtOptions>[] = [
  {
    provide: JWT_OPTIONS,
    useValue: {
      sign: {
        accessToken: {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
          secret: process.env.ACCESS_TOKEN_SECRET
        },
        refreshToken:{
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.REFRESH_TOKEN_SECRET
        }
      },
      verification: {
        accessSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.REFRESH_TOKEN_SECRET
      }
    }
  }
];
