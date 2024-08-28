package main
import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq" // For PostgreSQL driver
)

type Todo struct {
	ID		int		`db:"id" json:"id"`
	Desc	string		`db:"description" json:"desc"`	
	Status	bool		`db:"status" json:"status"`
}

func GetTodo(c *gin.Context){
	var todos []Todo
	err:= db.Select(&todos, "SELECT * FROM todo")
	if err!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error":err.Error()})
		return
	}
	c.JSON(http.StatusOK, todos)
}

func InsertTodo(c *gin.Context) {
	var todo Todo

	// Bind the JSON from the request body to the `todo` struct
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	// Insert the new todo into the database
	query := "INSERT INTO todo (description, status) VALUES ($1, $2) RETURNING id"
	err := db.QueryRow(query, todo.Desc, todo.Status).Scan(&todo.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the newly created todo with its ID
	c.JSON(http.StatusOK, todo)
}

func DeleteTodo(c *gin.Context){
	id := c.Param("id")
	db.Exec("DELETE FROM todo WHERE id=$1",id)
}
