package dto

import "time"

type StockResponse struct {
	Symbol        string    `json:"symbol"`
	Name          string    `json:"name"`
	CurrentPrice  float64   `json:"current_price"`
	Change        float64   `json:"change"`
	ChangePercent float64   `json:"change_percent"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type StockHistoryResponse struct {
	Time   string  `json:"time"`
	Open   float64 `json:"open"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Close  float64 `json:"close"`
	Volume int     `json:"volume"`
}
