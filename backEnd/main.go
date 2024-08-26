package main

import (
    "log"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
    "github.com/joho/godotenv"
)

var db *sqlx.DB

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

func main() {
    initDB()
	createTable()
	insertDummyData()
    defer db.Close()

    r := gin.Default()

    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
	
	type Todo struct {
    ID          int    `db:"id" json:"id"`
    Description string `db:"description" json:"description"`
    Status      bool   `db:"status" json:"status"`
}

r.GET("/todos", func(c *gin.Context) {
    var todos []Todo
    err := db.Select(&todos, "SELECT * FROM todo")
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, todos)
})

	r.Run(":8090") // listen and serve on 0.0.0.0:8080
}

func createTable() {
    schema := `CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        status BOOLEAN NOT NULL
    );`
    _, err := db.Exec(schema)
    if err != nil {
        log.Fatalf("Failed to create table: %v", err)
    }
}
func insertDummyData() {
    query := `INSERT INTO todo (description, status) VALUES
    ('Learn Go', true),
    ('Build a REST API', false),
    ('Test PostgreSQL connection', true);`

    _, err := db.Exec(query)
    if err != nil {
        log.Fatalf("Failed to insert dummy data: %v", err)
    }
}


