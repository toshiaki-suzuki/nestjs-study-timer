import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"; // nestjsでStrategyを使うために必要
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt"; // passport-jwtのStrategyを使うために必要
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // AuthorizationヘッダーからBearerトークンを取得
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'), // トークンの検証に使う秘密鍵
    })
  }

  async validate(payload: {id: string, email: string}): Promise<User>{
    const { id, email } = payload;
    const user = await this.repository.findOneBy({id, email});

    if (!user) throw new UnauthorizedException();
    return user;
  }
}