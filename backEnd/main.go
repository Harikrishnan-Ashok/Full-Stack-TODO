package main

import (
	// "log"
	// "os"
	"github.com/gin-gonic/gin"
    _ "github.com/lib/pq"
    // "github.com/joho/godotenv"
)

func main(){
	initDB()
	insertDummyData()
	
	r:=gin.Default()

	r.GET("/test",func(c *gin.Context){
		c.JSON(200,gin.H{
			"message":"pong",
		})
	})

	r.GET("/todos",GetTodo)

	r.Run(":8090")
}
