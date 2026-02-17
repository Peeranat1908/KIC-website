package entity

import (
	"time"

	"github.com/google/uuid"
)

type TransactionType string

const (
	Buy  TransactionType = "BUY"
	Sell TransactionType = "SELL"
)

type Transaction struct {
	ID          uuid.UUID       `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	PortfolioID uuid.UUID       `gorm:"type:uuid;not null" json:"portfolio_id"`
	StockSymbol string          `gorm:"not null" json:"stock_symbol"`
	Type        TransactionType `gorm:"type:varchar(10);not null" json:"type"`
	Quantity    int             `json:"quantity"`
	Price       float64         `json:"price"`
	CreatedAt   time.Time       `json:"created_at"`

	Stock *Stock `gorm:"foreignKey:StockSymbol;references:Symbol" json:"stock,omitempty"`
}
