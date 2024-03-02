#!/bin/sh

# マイグレーションの実行
echo "Running database migrations"
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
echo "Migration completed"

# アプリケーションの起動
echo "Starting application"
npm run start:dev
