import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { JwtHelperModule } from "./jwt-helper/jwt-helper.module";

@Module({
  imports: [
    UsersModule,
    JwtHelperModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtHelperModule]
})
export class AuthModule {
}
