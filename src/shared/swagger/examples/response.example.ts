import { HttpStatus } from "@nestjs/common";

export class ResponseExample {
  constructor(
    public status: HttpStatus,
    public description: string
  ) {
  }
}
