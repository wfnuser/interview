package schema

import (
	"fmt"
	"element14.site/server/config"
)


// Appointment model for patient appointment
type Appointment struct {
	ID      uint   `json:"id"`
	Name    string `json:"name"`
	Birth   string `json:"birth"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Time    string `json:"time"`
}

func (b *Appointment) TableName() string {
	return "appointment"
}

//fetch all appointments at once
func GetAllAppointments(appointment *[]Appointment) (err error) {
	if err = config.DB.Find(appointment).Error; err != nil {
		return err
	}
	return nil
}

//insert a appointment
func CreateAppointment(appointment *Appointment) (err error) {
	if err = config.DB.Create(appointment).Error; err != nil {
		return err
	}
	return nil
}

//fetch one appointment
func GetAppointment(appointment *Appointment, id string) (err error) {
	if err := config.DB.Where("id = ?", id).First(appointment).Error; err != nil {
		return err
	}
	return nil
}

//update a appointment
func UpdateAppointment(appointment *Appointment, id string) (err error) {
	fmt.Println(appointment)
	config.DB.Save(appointment)
	return nil
}

//delete a appointment
func DeleteAppointment(appointment *Appointment, id string) (err error) {
	config.DB.Where("id = ?", id).Delete(appointment)
	return nil
}