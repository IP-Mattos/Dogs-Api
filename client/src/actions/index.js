import axios from 'axios';


export  function getDogs(){
    return async function(dispatch){
        var json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export  function getTemperaments(){
    return async function(dispatch){
        var json = await axios("http://localhost:3001/temperaments");
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function filterDogsByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getNameDog(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data
            })
        }catch(error){
            console.log(error)}
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: "error"
            })
    }
}

export function postDog(payload){
    return async function(){
        try{
            const response = await axios.post("http://localhost:3001/dogs",payload);
            return response
        }catch(err){
            const response = "error"
            return response
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }catch(error){console.log(error)}
    }

    
}

export function cleanDetail(){
    return{
        type: "CLEAN_DETAIL",
        payload: {}
    }
}