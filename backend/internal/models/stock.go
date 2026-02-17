package entity

import "time"

type Stock struct {
	Symbol        string    `gorm:"primaryKey" json:"symbol"`
	Name          string    `json:"name"`
	CurrentPrice  float64   `json:"current_price"`
	Change        float64   `json:"change"`
	ChangePercent float64   `json:"change_percent"`
	UpdatedAt     time.Time `json:"updated_at"`

	Holdings     []Holding     `gorm:"foreignKey:StockSymbol" json:"holdings,omitempty"`
	Transactions []Transaction `gorm:"foreignKey:StockSymbol" json:"transactions,omitempty"`
}
