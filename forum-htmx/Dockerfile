FROM maven:3.9.6-eclipse-temurin-21-jammy

ENV DB_URL="jdbc:postgresql://localhost:5432/postgres"

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src
EXPOSE 8080

RUN mvn clean install

CMD cd target && java -jar backend-0.0.1-SNAPSHOT.jar