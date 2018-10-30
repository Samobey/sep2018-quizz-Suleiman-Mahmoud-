// import {setStatus,loadHnStories,loadHnStatuses} from "../data/RrhnData"

export const chooseComponent = (component)=>{
 return {
     type: "choose-component",
     component
 }
}

export const acceptOrReject = (id,status)=>{
    return {
        type: status,
        id
    }
}

export const addPlayer = (player)=>{
    console.log('from actions')
    return {
        type: 'add-player',
        player
    }
}


// export const markAsRead=(id)=>{
//     return (dispatch)=>{
//         setStatus(id,"read")
//         .then(()=>{ dispatch({type:"readed",payload:id})})
//         .catch((err)=>{dispatch({type:"err",payload:err})});
//     }
// }
// export const loaItems=()=>{
//     return (dispatch)=>{
//         loadHnStories()
//         .then((data)=>{
//             dispatch({type:"load-data",payload:data})
//         })
//         .catch((err)=>{dispatch({type:"err",payload:err})});
//     }
// }

// export const loadStatus=()=>{
//     return (dispatch)=>{
//         loadHnStatuses()
//         .then((status)=>{
//             dispatch({type:"load-status",payload:status})
//         })
//         .catch((err)=>{dispatch({type:"err",payload:err})});
//     }
// }
// export const markAsSeen=(array)=>{
//     return (dispatch)=>{
//         array.forEach(element => { 
//             setStatus(element.id,"seen")
//         },dispatch({type:"seen",payload:array}));
//     }
    
// }