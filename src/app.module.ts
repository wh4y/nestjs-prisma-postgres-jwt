import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TestJwtModule } from './testjwt/test-jwt.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, TestJwtModule, SharedModule],
})
export class AppModule {}
