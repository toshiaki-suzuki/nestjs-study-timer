FROM node
COPY . .
RUN chmod +x ./command/entrypoint.sh
