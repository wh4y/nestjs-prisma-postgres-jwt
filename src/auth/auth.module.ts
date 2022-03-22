import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "SeCrEt",
      signOptions: { expiresIn: "180s" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
