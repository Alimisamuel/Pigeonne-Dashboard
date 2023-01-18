import { useReducer, useEffect, useState } from "react";
import { projectFirestore , timestamp} from "../firebase/Config";



export const useCollection = (collection) =>{
    const [document, setDocument] = useState(null)
    const [ error, setError] =useState (null)

    useEffect(()=>{
const ref = projectFirestore.collection(collection)

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
    }, [collection])

    return {document, error}

}