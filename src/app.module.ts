import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { TestJwtModule } from "./testjwt/test-jwt.module";
import { SharedModule } from "./shared/shared.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    TestJwtModule,
    SharedModule
  ]
})
export class AppModule {
}
