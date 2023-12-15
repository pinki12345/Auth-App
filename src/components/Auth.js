import React from 'react'
import { supabase } from '../createClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Grid, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Container, TextField, Typography } from '@mui/material';




export const Auth = () => {



    let navigate= useNavigate()
    const[users, setUsers] = useState([])

  const[user, setUser] = useState({
    name:'', age:''
  })

  const[user2, setUser2] = useState({
    id: '' , name:'', age:''
  })

  console.log(user2);

  useEffect(()=>{
    fetchUsers()
  },[])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      sessionStorage.clear();
  
      navigate('/');
    }, 60000); 
  
    return () => clearTimeout(timeoutId);
  }, [navigate]);
  


  async function fetchUsers(){
     const {data} = await supabase.from('users').select('*')
     setUsers(data)   
    }
  
    function handleChange(event){
          setUser(prevFormData=>{
            return{
              ...prevFormData,
              [event.target.name]:event.target.value
            }
          })
    }

    async function createUsers(){
      await supabase
      .from('users')
      .insert({name:user.name, age: user.age})  
     }

     async function deleteUsers(userId){
      const { data, error } = 
      await supabase
      .from('users')
      .delete()
      .eq('id',userId)

      fetchUsers()

      if(error){
        console.log(error)
      }
      if(data){
        console.log(data)
      }
     }


   function displayUser(userId){
          users.map((user)=>{
              if(user.id===userId){
                setUser2({id:user.id,name:user.name, age:user.age})
              }
          })
         
   }

   function handleChange2(event){
    setUser2(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
}


async function updateUser(userId){
  const { data, error } = await supabase
  .from('users')
  .update({id:user2.id,name:user2.name, age:user2.age})
  .eq('id', userId)

  fetchUsers()

  if(error){
    console.log(error)
  }
  if(data){
    console.log(data)
  }
}


function handleLogout(){
  sessionStorage.removeItem('token')
  navigate('/')
}



return (
    <div className='logContainer'>

    
  <form onSubmit={createUsers}>
         <input type="text" 
          placeholder='Name'
          name='name'
          onChange={handleChange}
          className='text-field'
         />
         <input type="number" 
          placeholder='age'
          name='age'
          onChange={handleChange}
          className='text-field'
         />
        
         <Button variant="contained" color="primary"  type='submit' >
                                            Create
                                        </Button>
    </form>

    <form onSubmit={()=>updateUser(user2.id)} className='form-gap'>
         <input type="text" 
          name='name'
          onChange={handleChange2}
          defaultValue={user2.name}
          className='text-field'
         />

         <input type="number" 
          name='age'
          onChange={handleChange2}
          defaultValue={user2.age}
          className='text-field'
         />

       
         <Button variant="contained" color="primary"  type='submit' >
                                            Save Changes
                                        </Button>
    </form>


   

             <Grid container justifyContent="flex-end" spacing={2}>
                
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={()=>{displayUser(row.id)}}>
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="secondary"  onClick={()=>{deleteUsers(row.id)}}>
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>





            <Button variant="contained" color="primary"  onClick={handleLogout} className='logout'>
                                            Logout
                                        </Button>

      
    </div>
  )
}
