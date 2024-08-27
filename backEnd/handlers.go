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
