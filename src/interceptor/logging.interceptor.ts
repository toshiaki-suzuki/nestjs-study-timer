import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// ルートハンドラーの前後でログを出力するインターセプター
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ルートハンドラーの名前を取得
    // 名前を出力することで、どのルートハンドラーが呼び出されたかを確認できる
    const handler = context.getHandler();
    const className = context.getClass().name;
    const methodName = handler.name;
    // ルートハンドラーが開始されたログを出力
    console.log(`${className}.${methodName} start.`);

    return next // ルートハンドラーを取得
      .handle() // ルートハンドラーを呼び出す
      .pipe( // ルートハンドラーの実行後に実行される処理を定義
        tap(() => console.log(`${className}.${methodName} finish.`)), // ルートハンドラーが終了したログを出力
      );
  }
}