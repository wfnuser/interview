import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline
} from '@material-ui/core';
import { post } from './api.js'

export default function Register() {
  const [photo, setPhoto] = useState("");

  const onSubmit = async values => {
    console.log({ ...values, photo })
    post('appointment', { ...values, photo }, {
    })
  };
  const uploadFile = function (target) {
    const file = target.files[0]
    const formData = new FormData();
    formData.append('file', file);
    post('appointment/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      let { photo } = res
      if (photo) {
        setPhoto(photo)
      }
    })
  }
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Patient Register
      </Typography>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="email"
                    fullWidth
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="address"
                    component={TextField}
                    multiline
                    label="Address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="phone"
                    component={TextField}
                    multiline
                    label="Phone Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="birth"
                    type="date"
                    label="Birthday"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="photo"
                    multiline
                    label="Photo"
                  >
                    {({ input: { value, onChange, ...input } }) => {
                      const handleChange = ({ target }) => {
                        uploadFile(target)
                      }
                      return <input {...input} type="file" onChange={handleChange} />
                    }}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="date"
                    type="date"
                    component={TextField}
                    label="Appointment Date"
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}