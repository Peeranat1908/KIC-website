package dto

import (
	"time"

	"github.com/google/uuid"
)

type PortfolioResponse struct {
	ID        uuid.UUID         `json:"id"`
	UserID    uuid.UUID         `json:"user_id"`
	Balance   float64           `json:"balance"`
	Holdings  []HoldingResponse `json:"holdings,omitempty"`
	CreatedAt time.Time         `json:"created_at"`
	UpdatedAt time.Time         `json:"updated_at"`
}

type HoldingResponse struct {
	ID           uuid.UUID `json:"id"`
	StockSymbol  string    `json:"stock_symbol"`
	Quantity     int       `json:"quantity"`
	AverageCost  float64   `json:"average_cost"`
	CurrentValue float64   `json:"current_value,omitempty"` // Calculated field
	GainLoss     float64   `json:"gain_loss,omitempty"`     // Calculated field
}
