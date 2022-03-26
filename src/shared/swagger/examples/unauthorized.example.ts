import { ResponseExample } from "./response.example";
import { HttpStatus } from "@nestjs/common";

export class UnauthorizedExample extends ResponseExample {
  constructor(description: string) {
    super(HttpStatus.UNAUTHORIZED, description);
  }
}
