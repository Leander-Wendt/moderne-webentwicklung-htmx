FROM maven:3.9.6-eclipse-temurin-21-jammy

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src
EXPOSE 8080

RUN mvn clean install

CMD cd target && java -jar backend-0.0.1-SNAPSHOT.jar