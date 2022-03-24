import { Provider } from "@nestjs/common";
import { UsersDtoFactory } from "./dto/factory/users-dto.factory";
import { USERS_DTO_FACTORY } from "./constants";

export const usersProviders: Provider[] = [
  {
    provide: USERS_DTO_FACTORY,
    useClass: UsersDtoFactory,
  }
];
