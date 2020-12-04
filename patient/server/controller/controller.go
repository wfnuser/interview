package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"element14.site/server/schema"
)

//List all Appointments
func GetAppointments(c *gin.Context) {
	var Appointment []schema.Appointment
	err := schema.GetAllAppointments(&Appointment)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, Appointment)
	}
}

//Create a Appointment
func CreateAppointment(c *gin.Context) {
	var Appointment schema.Appointment
	c.BindJSON(&Appointment)
	err := schema.CreateAppointment(&Appointment)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, Appointment)
	}
}

//Get a particular Appointment with id
func GetAppointment(c *gin.Context) {
	id := c.Params.ByName("id")
	var Appointment schema.Appointment
	err := schema.GetAppointment(&Appointment, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, Appointment)
	}
}

// Update an existing Appointment
func UpdateAppointment(c *gin.Context) {
	var Appointment schema.Appointment
	id := c.Params.ByName("id")
	err := schema.GetAppointment(&Appointment, id)
	if err != nil {
		c.JSON(http.StatusNotFound, Appointment)
	}
	c.BindJSON(&Appointment)
	err = schema.UpdateAppointment(&Appointment, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, Appointment)
	}
}

// Delete a Appointment
func DeleteAppointment(c *gin.Context) {
	var Appointment schema.Appointment
	id := c.Params.ByName("id")
	err := schema.DeleteAppointment(&Appointment, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id:" + id: "deleted"})
	}
}


func SetupRouter() *gin.Engine {
	r := gin.Default()
	v1 := r.Group("/v1")
	{
		v1.GET("appointment", GetAppointments)
		v1.POST("appointment", CreateAppointment)
		v1.GET("appointment/:id", GetAppointment)
		v1.PUT("appointment/:id", UpdateAppointment)
		v1.DELETE("appointment/:id", DeleteAppointment)
	}
	return r
}