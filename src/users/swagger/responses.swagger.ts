import { OkExample } from "../../shared/swagger/examples";
import { CreatedExample } from "../../shared/swagger/examples/created.example";

export const GetAllExamples = {
  Ok: new OkExample(`[
    {
      "id": 1,
      "email": "fsfdfsd22s@jjj.ru",
      "password": "$2b$10$stS72lzIuXfKa4Hpfi9sXupygDNH3Lj107dtcZPL7fYyFrvfKZzg2",
      "refreshToken": null,
      "createdAt": "2022-03-24T20:24:24.770Z"
    }
  ]`)
};

export const CreateUserExamples = {
  created: new CreatedExample(`{
    "id": 19,
    "email": "sdfddfsf44@kkk.com",
    "createdAt": "2022-03-25T19:04:43.002Z",
    "tokens": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkZmRkZnNmNDRAa2trLmNvbSIsImlkIjoxOSwiY3JlYXRlZEF0IjoiMjAyMi0wMy0yNVQxOTowNDo0My4wMDJaIiwiaWF0IjoxNjQ4MjM1MDgzLCJleHAiOjE2NDgyMzUxNDN9.-GzamySkx3d6fkx6SE5vgHwPBLxxl6FmTYoPL2r-rMM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkZmRkZnNmNDRAa2trLmNvbSIsImlkIjoxOSwiY3JlYXRlZEF0IjoiMjAyMi0wMy0yNVQxOTowNDo0My4wMDJaIiwiaWF0IjoxNjQ4MjM1MDgzLCJleHAiOjE2NTA4MjcwODN9.m9aFV-1FfWB4CpsM7HtcZWKdmKJB02IzhSrDxwKSTwM"
    }
}`)
};

export const GetUserByEmailExamples = {
  ok: new OkExample(`{
    "id": 19,
    "email": "sdfddfsf44@kkk.com",
    "createdAt": "2022-03-25T19:04:43.002Z",
    "tokens": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkZmRkZnNmNDRAa2trLmNvbSIsImlkIjoxOSwiY3JlYXRlZEF0IjoiMjAyMi0wMy0yNVQxOTowNDo0My4wMDJaIiwiaWF0IjoxNjQ4MjM1MDgzLCJleHAiOjE2NDgyMzUxNDN9.-GzamySkx3d6fkx6SE5vgHwPBLxxl6FmTYoPL2r-rMM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkZmRkZnNmNDRAa2trLmNvbSIsImlkIjoxOSwiY3JlYXRlZEF0IjoiMjAyMi0wMy0yNVQxOTowNDo0My4wMDJaIiwiaWF0IjoxNjQ4MjM1MDgzLCJleHAiOjE2NTA4MjcwODN9.m9aFV-1FfWB4CpsM7HtcZWKdmKJB02IzhSrDxwKSTwM"
    }
}`)
};
