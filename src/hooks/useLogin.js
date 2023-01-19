import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { projectAuth } from '../firebase/Config';
import { useAuthContext  } from './useAuthContext'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
const [isPending, setIsPending] = useState(false)
const {dispatch, user} = useAuthContext()
const navigate = useNavigate();

 
const login = async (email, password) => {
    setError(null)
    setIsPending(true)
    setSuccess(false)

    // sign user out

 try{
   const res = await projectAuth.signInWithEmailAndPassword(email, password)
    dispatch({type : 'LOGIN', payload: res.user})
navigate("/dashboard")
window.localStorage.setItem('user', JSON.stringify(res.user));
    // update state
    if (!isCancelled){

        setError(null) 
        setIsPending(true)
    }
 }
 catch(err){
    if (!isCancelled){
    console.log(err.message)
    setError(err.message) 
    setIsPending(false)}
 }

}

const forgetPassword = async (email) =>{
    setError(null)
    setIsPending(true)

    // forget password

    try{
         await projectAuth.sendPasswordResetEmail(email)
   
        setSuccess(true)
        setIsPending(false)
        // setTimeout(()=>{
        //     navigate("/login")
        // }, 3000)
    }
    catch(err){
        if(!isCancelled){
            setError(err.message)
            setIsPending(false)
        }
    }
}
useEffect(()=>{
return () => setIsCancelled(true)
}, [])
return {error, isPending, login, forgetPassword , success}
}
