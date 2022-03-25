import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) throw new UnauthorizedException("You are not authorized!");

      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET
      });
      req.user = user;

      return true;
    } catch (e) {
      throw new ForbiddenException("Access denied!");
    }
  }
}
