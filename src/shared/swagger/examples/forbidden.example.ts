import { ResponseExample } from "./response.example";
import { HttpStatus } from "@nestjs/common";

export class ForbiddenExample extends ResponseExample {
  constructor(description: string) {
    super(HttpStatus.FORBIDDEN, description);
  }
}
