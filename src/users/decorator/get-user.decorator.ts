import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// validateがリクエストに含めたユーザー情報を取得する
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest(); // リクエストを取得する
  return request.user;
});