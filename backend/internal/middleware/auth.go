package middleware

import (
	"backend/internal/repository"
	"backend/internal/utils"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func RequireAuth(userRepo repository.UserRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Read token from cookie or Authorization header
		tokenStr := c.Cookies("token")
		if tokenStr == "" {
			auth := c.Get("Authorization")
			if strings.HasPrefix(auth, "Bearer ") {
				tokenStr = strings.TrimPrefix(auth, "Bearer ")
			}
		}
		if tokenStr == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "missing token"})
		}

		// Validate token using utils
		claims, err := utils.ValidateToken(tokenStr)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "invalid token"})
		}

		// Configure context for later use
		c.Locals("user_id", claims.UserID)
		c.Locals("role", claims.Role)

		// Fetch user from database
		user, err := userRepo.FindByID(claims.UserID.String())
		if err != nil || user == nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "user not found"})
		}

		c.Locals("current_user", user)
		return c.Next()
	}
}
