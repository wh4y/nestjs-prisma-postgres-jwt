import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./users.controller";
import { usersProviders } from "./users.providers";

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersService],
  controllers: [UsersController],
  exports: [...usersProviders, UsersService, DatabaseModule]
})
export class UsersModule {
}
