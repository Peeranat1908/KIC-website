package server

import (
	"log"

	"backend/config"
	handler "backend/internal/handler/auth"
	"backend/internal/handler/stock"
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
		log.Println("Starting database migration...")
		err := config.DB.AutoMigrate(&entity.User{}, &entity.Portfolio{}, &entity.Stock{}, &entity.Holding{}, &entity.Transaction{})
		if err != nil {
			log.Printf("Migration failed: %v", err)
		} else {
			log.Println("Database migration completed successfully")
		}
	} else {
		log.Println("Database connection is nil, skipping migration")
	}

	// Dependencies
	userRepo := repository.NewUserRepository(config.DB)
	authUsecase := usecase.NewAuthUsecase(userRepo)
	authHandler := handler.NewAuthHandler(authUsecase)

	stockRepo := repository.NewStockRepository(config.DB)
	stockService := usecase.NewStockService(stockRepo)
	stockHandler := stock.NewStockHandler(stockService)

	// Routes
	api := app.Group("/api")

	// Auth Routes
	auth := api.Group("/auth")
	auth.Post("/register", authHandler.Register)
	auth.Post("/login", authHandler.Login)
	auth.Post("/google-login", authHandler.GoogleLogin)

	// Stock Routes
	api.Get("/stocks", stockHandler.GetStocks)
	api.Get("/stocks/:symbol/history", stockHandler.GetStockHistory)

	log.Fatal(app.Listen(":8080"))
}
