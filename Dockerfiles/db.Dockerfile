FROM postgres:16.2
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_INITDB_ARGS="--encoding=UTF-8"
ENV POSTGRES_DB=postgres