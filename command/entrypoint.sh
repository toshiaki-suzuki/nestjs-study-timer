#!/bin/sh

# ncコマンドを取得
apt-get update && apt-get install -y netcat-openbsd

# データベースの接続確認
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for database connection..."
  sleep 1
done
echo "Database is up and running"

# マイグレーションの実行
echo "Running database migrations"
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
echo "Migration completed"

# アプリケーションの起動
echo "Starting application"
npm run start:dev
