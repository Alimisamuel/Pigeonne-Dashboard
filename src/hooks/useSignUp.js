import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { projectAuth } from '../firebase/Config'
import { useAuthContext } from './useAuthContext'


export const useSignUp = () =>{
    const [isCancelled, setIsCancelled] = useState(false)
const [error, setError] = useState(null)
const [isPending, setIsPending] = useState(false)
const {dispatch} = useAuthContext()
const Navigate = useNavigate()

const signup = async (email, password, displayName) =>{
setError(null)
setIsPending(true)

try{
    // siignup user
   const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    console.log(res.user)

    if (!res){
        throw new Error( 'Could not complete signUp')
    }

    // add display name
    await res.user.updateProfile({displayName})

    // dispatch login

    dispatch ({type:'LOGIN', payload : res.user })
     // update state
     if (!isCancelled){

        setError(null) 
        setIsPending(true)
        Navigate('/login')
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

return {error, isPending, signup }
} 