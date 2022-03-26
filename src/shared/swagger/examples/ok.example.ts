import { ResponseExample } from "./response.example";
import { HttpStatus } from "@nestjs/common";

export class OkExample extends ResponseExample {
  constructor(description: string) {
    super(HttpStatus.OK, description);
  }
}
