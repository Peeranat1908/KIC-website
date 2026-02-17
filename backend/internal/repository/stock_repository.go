package repository

import (
	entity "backend/internal/models"

	"gorm.io/gorm"
)

type StockRepository interface {
	GetAll() ([]entity.Stock, error)
	GetBySymbol(symbol string) (*entity.Stock, error)
	UpdatePrice(symbol string, price float64) error
}

type stockRepository struct {
	db *gorm.DB
}

func NewStockRepository(db *gorm.DB) StockRepository {
	return &stockRepository{db}
}

func (r *stockRepository) GetAll() ([]entity.Stock, error) {
	var stocks []entity.Stock
	if err := r.db.Find(&stocks).Error; err != nil {
		return nil, err
	}
	return stocks, nil
}

func (r *stockRepository) GetBySymbol(symbol string) (*entity.Stock, error) {
	var stock entity.Stock
	if err := r.db.Where("symbol = ?", symbol).First(&stock).Error; err != nil {
		return nil, err
	}
	return &stock, nil
}

func (r *stockRepository) UpdatePrice(symbol string, price float64) error {
	return r.db.Model(&entity.Stock{}).Where("symbol = ?", symbol).Update("current_price", price).Error
}
