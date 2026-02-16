package entity

import (
	"time"

	"github.com/google/uuid"
)

type Holding struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	PortfolioID  uuid.UUID `gorm:"type:uuid;not null" json:"portfolio_id"`
	StockSymbol  string    `gorm:"not null" json:"stock_symbol"`
	Quantity     int       `json:"quantity"`
	AverageCost  float64   `json:"average_cost"`
	PurchaseDate time.Time `json:"purchase_date"`

	Stock Stock `gorm:"foreignKey:StockSymbol" json:"stock,omitempty"`
}
