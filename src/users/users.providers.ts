import { Provider } from "@nestjs/common";
import { UsersDtoFactory } from "./dto/users-dto.factory";

export const usersProviders: Provider[] = [
  {
    provide: "USERS_DTO_FACTORY",
    useClass: UsersDtoFactory,
  }
];
