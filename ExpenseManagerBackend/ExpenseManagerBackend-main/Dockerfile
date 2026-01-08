# ---------- Build stage ----------
FROM maven:3.9.11-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/ExpenseManagerBackend-1.0.0.jar .

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ExpenseManagerBackend-1.0.0.jar"]
