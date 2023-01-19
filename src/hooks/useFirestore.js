import { useReducer, useEffect, useState } from "react";
import { projectFirestore , timestamp} from "../firebase/Config";

const initialState ={
    document: null,
    isPending: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) =>{
    switch (action.type){
        case 'IS_PENDING':
        return{  isPending:true, document:false, success:false, error:null }
        case 'ADDED_DOCUMENT':
            return{  isPending:false, document: action.payload, success:true, error:null}
        case 'DELETED_DOCUMENT':
            return {isPending: false, document: action.payload, success:true, error:null}
            case 'ERROR':
                return{isPending:false, document:null, success:false, error:action.payload}
         default:
            return state
    }
}
export const useFirestore = (collection)=>{
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    
    // collection ref
    const ref = projectFirestore.collection(collection)


    const dispatchIfNotCan=  (action)=>{
if(!isCancelled){
    dispatch(action)
}
    }
    // add

    const addDocument = async (doc) =>{
        dispatch({type:'IS_PENDING'})
try{
    const createdAt = timestamp.fromDate(new Date())
const addedDoc = await ref.add({...doc, createdAt})
dispatchIfNotCan({type: 'ADDED_DOCUMENT', payload:addedDoc})
}catch(err){
    dispatchIfNotCan({type: 'ERROR', payload:err.message})

}
    }

    // deleteDocument
    const deleteDocument = async (id) =>{
       dispatch({type: 'IS_PENDING'})

try{
const deletedDocument = await ref.doc(id).delete()
dispatchIfNotCan({type: 'DELETED_DOCUMENT', payload: deletedDocument})
}catch(err){
    dispatchIfNotCan({type:'ERROR', payload: 'could not delete'})
}
    }

    useEffect(()=> {
 return () => setIsCancelled(true)
    }, [])

    return{ addDocument, deleteDocument, response}
}