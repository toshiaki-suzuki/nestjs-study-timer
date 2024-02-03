FROM node
COPY . .
RUN chmod +x ./scripts/entrypoint.sh
