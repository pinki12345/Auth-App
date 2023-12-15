import React from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react'
import { supabase } from '../createClient'
import { useNavigate } from 'react-router-dom'



const LoginForm = ({setToken}) => {

    let navigate = useNavigate()

     const[formData, setformData] = useState({
        email:'',Password:''
     })
      
      console.log(formData )

    function handleChange(event){
        setformData((prevFormData)=>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        }) 
    }

     async function handleSubmit(e){
        e.preventDefault()
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.Password,
                
              })
             if(error) throw error
             console.log(data)
             setToken(data)
             navigate('/auth')
             
        }
        catch(err){
            alert(err)
         }
     }


    return (
        <React.Fragment>
            <Container>
                <Typography variant="h4" gutterBottom>Welcome Back!</Typography>
                <Typography variant="subtitle1" gutterBottom>Sign in to continue H-Care</Typography>
                <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name='email'
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name='Password'
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                       
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm