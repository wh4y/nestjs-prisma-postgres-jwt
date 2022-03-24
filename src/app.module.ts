import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TestJwtModule } from "./testjwt/test-jwt.module";
import { SharedModule } from "./shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRES_IN: Joi.string().required()
      })
    }),
    UsersModule,
    AuthModule,
    TestJwtModule,
    SharedModule
  ]
})
export class AppModule {
}
