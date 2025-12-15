package com.project.expensemanager.security.config;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI expenseManagerOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Expense Manager API")
                        .description("Backend API documentation for Expense Manager")
                        .version("1.0"))
                .externalDocs(new ExternalDocumentation()
                        .description("Expense Manager Backend Repo")
                        .url("https://github.com/your-repo-url"));
    }
}