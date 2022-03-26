import { ForbiddenExample, OkExample } from "../../shared/swagger/examples";

export const testJwtExamples = {
  Ok: new OkExample(`SUCCESSSSS!`),
  Forbidden: new ForbiddenExample(`{
  "statusCode": 403,
  "message": "Access denied!",
  "error": "Forbidden"
}`)
};
