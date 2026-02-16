package dto

import (
	"time"

	"github.com/google/uuid"
)

type CreateTransactionRequest struct {
	PortfolioID uuid.UUID `json:"portfolio_id" validate:"required"`
	StockSymbol string    `json:"stock_symbol" validate:"required"`
	Type        string    `json:"type" validate:"required,oneof=BUY SELL"`
	Quantity    int       `json:"quantity" validate:"required,min=1"`
	Price       float64   `json:"price" validate:"required,min=0"`
}

type TransactionResponse struct {
	ID          uuid.UUID `json:"id"`
	PortfolioID uuid.UUID `json:"portfolio_id"`
	StockSymbol string    `json:"stock_symbol"`
	Type        string    `json:"type"`
	Quantity    int       `json:"quantity"`
	Price       float64   `json:"price"`
	Total       float64   `json:"total"`
	CreatedAt   time.Time `json:"created_at"`
}
