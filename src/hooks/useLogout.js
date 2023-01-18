import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { projectAuth } from '../firebase/Config';
import { useAuthContext  } from './useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(false)
const {dispatch, authIsReady} = useAuthContext()
const navigate = useNavigate();

 
const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign user out

 try{
    await projectAuth.signOut()
    dispatch({type : 'LOGOUT'})
    navigate("/login")


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
return {error, isPending, logout }
}
