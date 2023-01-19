import { useReducer, useEffect, useState, useRef } from "react";
import { projectFirestore , timestamp} from "../firebase/Config";
// import { useAuthContext } from "./useAuthContext";



export const useCollection = (collection, _query, _orderBy) =>{

    // const {user} = useAuthContext() 
    const [document, setDocument] = useState(null)
    const [ error, setError] =useState (null)


    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current
    useEffect(()=>{
        
let ref = projectFirestore.collection(collection)

if (query){
  ref = ref.where( ...query)
}
if(orderBy){
    ref = ref.orderBy(...orderBy)
}

const unsubscribe = ref.onSnapshot((snapshot)=>{
    const result = [ ]
    snapshot.docs.forEach(doc =>{
        result.push({...doc.data( ) , id: doc.id})
    })

    // update Stata
    setDocument(result)
    setError(null)
}, (error)=>{
    console.log(error)
    setError(error)
})

//  unsubsribe on unmount
return () => unsubscribe()
    }, [collection, query])

    return {document, error, orderBy}

}