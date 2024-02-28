FROM node
COPY . /app
WORKDIR /app
ENTRYPOINT sh -c "chmod +x ./scripts/entrypoint.sh && ./scripts/entrypoint.sh"