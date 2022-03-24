import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { usersProviders } from "./users.providers";

@Module({
  providers: [...usersProviders, UsersService],
  controllers: [UsersController],
  exports: [...usersProviders, UsersService]
})
export class UsersModule {
}
