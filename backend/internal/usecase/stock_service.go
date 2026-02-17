package usecase

import (
	"backend/internal/dto"
	"backend/internal/repository"
	"math"
	"time"

	"github.com/piquette/finance-go/chart"
	"github.com/piquette/finance-go/datetime"
	"github.com/piquette/finance-go/quote"
)

type StockService interface {
	GetStocks() ([]dto.StockResponse, error)
	GetStockHistory(symbol string, period string, interval string) ([]dto.StockHistoryResponse, error)
}

type stockService struct {
	stockRepo repository.StockRepository
}

func NewStockService(stockRepo repository.StockRepository) StockService {
	return &stockService{stockRepo}
}

func (s *stockService) GetStocks() ([]dto.StockResponse, error) {
	stocks, err := s.stockRepo.GetAll()
	if err != nil {
		return nil, err
	}

	var stockResponses []dto.StockResponse
	for _, stock := range stocks {
		// Fetch real-time data from Yahoo Finance
		q, err := quote.Get(stock.Symbol)
		if err == nil && q != nil {
			stockResponses = append(stockResponses, dto.StockResponse{
				Symbol:        stock.Symbol,
				Name:          stock.Name, // Keep name from DB as API might return different format or we prefer our own
				CurrentPrice:  q.RegularMarketPrice,
				Change:        q.RegularMarketChange,
				ChangePercent: q.RegularMarketChangePercent,
				UpdatedAt:     stock.UpdatedAt,
			})
		} else {
			// Fallback to DB data if API fails
			stockResponses = append(stockResponses, dto.StockResponse{
				Symbol:        stock.Symbol,
				Name:          stock.Name,
				CurrentPrice:  stock.CurrentPrice,
				Change:        stock.Change,
				ChangePercent: stock.ChangePercent,
				UpdatedAt:     stock.UpdatedAt,
			})
		}
	}
	return stockResponses, nil
}

func (s *stockService) GetStockHistory(symbol string, period string, interval string) ([]dto.StockHistoryResponse, error) {
	// Set default range to 1 month if not specified or for now
	// finance-go uses datetime.Datetime for Start and End
	end := time.Now()
	start := end.AddDate(0, -1, 0) // 1 month ago

	p := &chart.Params{
		Symbol:   symbol,
		Interval: datetime.OneDay,
		Start:    datetime.New(&start),
		End:      datetime.New(&end),
	}

	iter := chart.Get(p)

	var history []dto.StockHistoryResponse

	for iter.Next() {
		bar := iter.Bar()
		// Format time as YYYY-MM-DD
		date := time.Unix(int64(bar.Timestamp), 0).Format("2006-01-02")

		open, _ := bar.Open.Float64()
		high, _ := bar.High.Float64()
		low, _ := bar.Low.Float64()
		close, _ := bar.Close.Float64()

		history = append(history, dto.StockHistoryResponse{
			Time:   date,
			Open:   toFixed(open, 2),
			High:   toFixed(high, 2),
			Low:    toFixed(low, 2),
			Close:  toFixed(close, 2),
			Volume: bar.Volume,
		})
	}

	if err := iter.Err(); err != nil {
		return nil, err
	}

	return history, nil
}

func toFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(int(num*output)) / output
}
