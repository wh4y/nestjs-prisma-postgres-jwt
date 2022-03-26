import { ForbiddenExample, OkExample } from "../../shared/swagger/examples";

export const loginExamples = {
  ok: new OkExample("{\n" +
    "    \"id\": 20,\n" +
    "    \"email\": \"fsfds@fff.com\",\n" +
    "    \"createdAt\": \"2022-03-26T12:29:08.317Z\",\n" +
    "    \"tokens\": {\n" +
    "        \"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZzZmRzQGZmZi5jb20iLCJpZCI6MjAsImNyZWF0ZWRBdCI6IjIwMjItMDMtMjZUMTI6Mjk6MDguMzE3WiIsImlhdCI6MTY0ODI5Nzc0OCwiZXhwIjoxNjQ4Mjk3ODA4fQ.D5CpynXlNw7cYtUW1ohCyx17oxE0-5tSjtIxOWdoi9U\",\n" +
    "        \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZzZmRzQGZmZi5jb20iLCJpZCI6MjAsImNyZWF0ZWRBdCI6IjIwMjItMDMtMjZUMTI6Mjk6MDguMzE3WiIsImlhdCI6MTY0ODI5Nzc0OCwiZXhwIjoxNjUwODg5NzQ4fQ.cb5kODMgDJpz9Ue_JOiY6GSK1tJ4BDzoFtB-VtxMGxE\"\n" +
    "    }\n" +
    "}")
};

export const refreshAccessTokenExamples = {
  ok: new OkExample(`{
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZzZmRzQGZmZi5jb20iLCJpZCI6MjAsImNyZWF0ZWRBdCI6IjIwMjItMDMtMjZUMTI6Mjk6MDguMzE3WiIsImlhdCI6MTY0ODI5Nzc0OCwiZXhwIjoxNjQ4Mjk3ODA4fQ.D5CpynXlNw7cYtUW1ohCyx17oxE0-5tSjtIxOWdoi9U",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZzZmRzQGZmZi5jb20iLCJpZCI6MjAsImNyZWF0ZWRBdCI6IjIwMjItMDMtMjZUMTI6Mjk6MDguMzE3WiIsImlhdCI6MTY0ODI5Nzc0OCwiZXhwIjoxNjUwODg5NzQ4fQ.cb5kODMgDJpz9Ue_JOiY6GSK1tJ4BDzoFtB-VtxMGxE"
    }`)
};
