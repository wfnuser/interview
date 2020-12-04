package main

import (
	"element14.site/server/config"
	"element14.site/server/controller"
	"element14.site/server/schema"
	"fmt"
	"github.com/jinzhu/gorm"
)

var err error

func main() {

	// Creating a connection to the database
	config.DB, err = gorm.Open("mysql", config.DbURL(config.BuildDBConfig()))

	if err != nil {
		fmt.Println("statuse: ", err)
	}

	defer config.DB.Close()

	// run the migrations: todo struct
	config.DB.AutoMigrate(&schema.Appointment{})

	//setup routes
	r := controller.SetupRouter()

	// running
	r.Run()
}