import { ResponseExample } from "./response.example";
import { HttpStatus } from "@nestjs/common";

export class CreatedExample extends ResponseExample {
  constructor(description: string) {
    super(HttpStatus.CREATED, description);
  }
}
