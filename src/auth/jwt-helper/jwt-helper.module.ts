import { Module } from "@nestjs/common";
import { JwtHelperService } from "./jwt-helper.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtHelperProviders } from "./jwt-helper.providers";
import { UsersModule } from "../../users/users.module";

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule
  ],
  providers: [...jwtHelperProviders, JwtHelperService],
  exports: [...jwtHelperProviders, JwtHelperService, JwtModule]
})
export class JwtHelperModule {
}
