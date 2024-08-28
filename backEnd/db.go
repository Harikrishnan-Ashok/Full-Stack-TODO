package main
import (
	"os"
	"log"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	)
//decleare the var db 
var db *sqlx.DB

//the new DB func
func initDB() {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatalf("Error loading .env file")
    }

    dsn := "host=" + os.Getenv("DATABASE_HOST") +
        " port=" + os.Getenv("DATABASE_PORT") +
        " user=" + os.Getenv("POSTGRES_USER") +
        " password=" + os.Getenv("POSTGRES_PASSWORD") +
        " dbname=" + os.Getenv("POSTGRES_DB") +
        " sslmode=disable"

    db, err = sqlx.Connect("postgres", dsn)
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
}
