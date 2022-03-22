import { Module } from "@nestjs/common";
import { TestJwtController } from "./test-jwt.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports:[AuthModule],
  controllers: [TestJwtController]
})
export class TestJwtModule {
}
