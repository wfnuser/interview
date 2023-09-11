package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// ExchangeRate represents the data structure for API responses
type ExchangeRate struct {
	Time         string  `json:"time"`
	AssetIDBase  string  `json:"asset_id_base"`
	AssetIDQuote string  `json:"asset_id_quote"`
	Rate         float64 `json:"rate"`
}

// CacheEntry represents an entry in the cache
type CacheEntry struct {
	Data       *ExchangeRate
	Expiration time.Time
}

// Mutex for thread-safe access to the cache
var cacheMutex sync.RWMutex

// Cache stores API responses in a HashMap
var Cache = make(map[string]*CacheEntry)

// CacheDuration determines the cache expiration duration
const CacheDuration = 10 * time.Second

const APIKEY = "xxxxxxx"

func getExchangeRate(coin string) (*ExchangeRate, error) {
	cacheMutex.RLock()
	cacheEntry, found := Cache[coin]
	cacheMutex.RUnlock()

	if found && time.Now().Before(cacheEntry.Expiration) {
		return cacheEntry.Data, nil
	}

	// Perform the GET request to the CoinAPI endpoint.
	url := fmt.Sprintf("https://rest.coinapi.io/v1/exchangerate/%s/USD", coin)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("X-CoinAPI-Key", APIKEY)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Parse the JSON response into an ExchangeRate struct.
	var exchangeRate ExchangeRate
	err = json.NewDecoder(resp.Body).Decode(&exchangeRate)
	if err != nil {
		return nil, err
	}

	cacheMutex.Lock()
	Cache[coin] = &CacheEntry{
		Data:       &exchangeRate,
		Expiration: time.Now().Add(CacheDuration),
	}
	cacheMutex.Unlock()

	return &exchangeRate, nil
}

func main() {
	// Create a new Gin router
	router := gin.Default()

	// Define a route that makes the CoinAPI request and responds with an ExchangeRate.
	router.GET("/", func(c *gin.Context) {
		coin := c.DefaultQuery("coin", "BTC")
		coin = strings.ToUpper(coin)

		// TODO: case problem
		exchangeRate, err := getExchangeRate(coin)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, exchangeRate)
	})

	// Run the server on port 8080
	router.Run(":8080")
}
