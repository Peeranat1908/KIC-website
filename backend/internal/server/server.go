package server

import (
	"log"

	"backend/config"
	handler "backend/internal/handler/auth"
	entity "backend/internal/models"
	"backend/internal/repository"
	"backend/internal/usecase"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Run() {
	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New())

	// Auto Migrate
	if config.DB != nil {
		err := config.DB.AutoMigrate(&entity.User{}, &entity.Portfolio{}, &entity.Stock{}, &entity.Holding{}, &entity.Transaction{})
		if err != nil {
			log.Printf("Migration warning: %v", err)
		}
	}

	// Dependencies
	userRepo := repository.NewUserRepository(config.DB)
	authUsecase := usecase.NewAuthUsecase(userRepo)
	authHandler := handler.NewAuthHandler(authUsecase)

	// Routes
	api := app.Group("/api")
	auth := api.Group("/auth")
	auth.Post("/register", authHandler.Register)
	auth.Post("/login", authHandler.Login)
	auth.Post("/google-login", authHandler.GoogleLogin)

	log.Fatal(app.Listen(":8080"))
}
