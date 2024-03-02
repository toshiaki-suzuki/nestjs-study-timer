FROM node
COPY . /app
WORKDIR /app
ENTRYPOINT sh -c "chmod +x /app/scripts/entrypoint.sh && /app/scripts/entrypoint.sh"