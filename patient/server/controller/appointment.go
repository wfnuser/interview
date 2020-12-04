package controller

import (
	"element14.site/server/schema"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid" // To generate random file names
	"net/http"
	"path/filepath"
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
	fmt.Printf("APPOINTMENT %v\n", Appointment)
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

func SaveFileHandler(c *gin.Context) {
	file, err := c.FormFile("file")
	// The file cannot be received.
	if err != nil {
		fmt.Printf("%v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "No file is received",
		})
		return
	}

	// Retrieve file information
	extension := filepath.Ext(file.Filename)
	// Generate random file name for the new uploaded file so it doesn't override the old file with same name\
	newFileName := uuid.New().String() + extension


	// The file is received, so let's save it
	if err := c.SaveUploadedFile(file, "./files/"+newFileName); err != nil {
		fmt.Printf("save err: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": "Unable to save the file",
		})
		return
	}

	// File saved successfully. Return proper result
	c.JSON(http.StatusOK, gin.H{
		"photo": newFileName,
	})
}

func SetupAppointmentRouter(r *gin.Engine) *gin.Engine {
	v1 := r.Group("/v1")
	{
		v1.GET("appointment", GetAppointments)
		v1.POST("appointment", CreateAppointment)
		v1.GET("appointment/:id", GetAppointment)
		v1.PUT("appointment/:id", UpdateAppointment)
		v1.DELETE("appointment/:id", DeleteAppointment)
		v1.POST("appointment/upload", SaveFileHandler)

	}
	return r
}
