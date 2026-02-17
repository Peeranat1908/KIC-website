package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Bangkok",
		host, user, password, dbname, port,
	)

	log.Printf("Connecting to database at %s:%s (DB: %s, User: %s)", host, port, dbname, user)

	// Retry loop
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			log.Println("Database connection established successfully")
			return
		}
		log.Printf("Failed to connect to database (attempt %d/10): %v", i+1, err)
		time.Sleep(2 * time.Second)
	}

	log.Fatal("Could not connect to database after retries: ", err)
}
