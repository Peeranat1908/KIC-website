package stock

import (
	"backend/internal/usecase"

	"github.com/gofiber/fiber/v2"
)

type StockHandler struct {
	stockService usecase.StockService
}

func NewStockHandler(stockService usecase.StockService) *StockHandler {
	return &StockHandler{stockService}
}

func (h *StockHandler) GetStocks(c *fiber.Ctx) error {
	stocks, err := h.stockService.GetStocks()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch stocks"})
	}
	return c.JSON(stocks)
}

func (h *StockHandler) GetStockHistory(c *fiber.Ctx) error {
	symbol := c.Params("symbol")
	period := c.Query("period", "1mo")
	interval := c.Query("interval", "1d")

	history, err := h.stockService.GetStockHistory(symbol, period, interval)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch stock history"})
	}
	return c.JSON(history)
}
