import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { projectAuth } from '../firebase/Config';
import { useAuthContext  } from './useAuthContext'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(false)
const {dispatch} = useAuthContext()
const navigate = useNavigate();

 
const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // sign user out

 try{
   const res = await projectAuth.signInWithEmailAndPassword(email, password)
    dispatch({type : 'LOGIN', payload: res.user})
navigate("/dashboard")
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
useEffect(()=>{
return () => setIsCancelled(true)
}, [])
return {error, isPending, login }
}
