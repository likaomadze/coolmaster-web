import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import * as argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async register(dto: RegisterDto) {
    const password = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({ data: { ...dto, password, role: Role.CUSTOMER } });
    return this.sign(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user?.password || !(await argon2.verify(user.password, dto.password))) throw new UnauthorizedException("Invalid credentials");
    return this.sign(user.id, user.email, user.role);
  }

  private async sign(sub: string, email: string, role: Role) {
    const payload = { sub, email, role };
    const accessToken = await this.jwt.signAsync(payload, { secret: this.config.get("JWT_ACCESS_SECRET"), expiresIn: this.config.get("JWT_ACCESS_TTL", "15m") });
    const refreshToken = await this.jwt.signAsync(payload, { secret: this.config.get("JWT_REFRESH_SECRET"), expiresIn: this.config.get("JWT_REFRESH_TTL", "30d") });
    await this.prisma.user.update({ where: { id: sub }, data: { refreshTokenHash: await argon2.hash(refreshToken) } });
    return { accessToken, refreshToken, user: { id: sub, email, role } };
  }
}
