package main

import (
	"github.com/gin-gonic/gin"
    _ "github.com/lib/pq"
	"github.com/gin-contrib/cors"
)

func main(){
	initDB()
	
	r:=gin.Default()
	r.Use(cors.Default())

	r.GET("/test",func(c *gin.Context){
		c.JSON(200,gin.H{
			"message":"pong",
		})
	})

	r.GET("/todos",GetTodo)
	r.POST("/newtask",InsertTodo)
	r.DELETE("/todo/:id", DeleteTodo)
	r.PUT("updateTask/:id",UpdateTodo)
	r.Run(":8090")
}
