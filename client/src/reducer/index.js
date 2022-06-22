const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs;

            let filteredDogs = action.payload === "all" ? allDogs :
                allDogs.filter((e) => {
                    if (e.temperament) {
                        if (e.temperament.includes(action.payload)) {
                            console.log("filtrado", e)
                            return e;
                            
                        }
                    }
                    else if (e.temperaments) {
                        const x = e.temperaments?.map(el => el.name)
                        if (x.includes(action.payload)) { return e }
                        console.log("filtrado")
                    }
                    return false;
                });
            if (filteredDogs.length <= 0) {
                filteredDogs = allDogs;
                alert("No hay perro con ese temperamento");
            }
            return {
                ...state,
                dogs: filteredDogs,
            }
        case 'FILTER_CREATED':
            const allDogss = state.allDogs;
            console.log(allDogss.filter(e => e.id.length < 4))
            const createdFilter = action.payload === 'created' ?
                allDogss.filter(e => e.id.length > 4) :
                allDogss.filter(e => e.id.length > 0 && e.id.length < 4);
            if (createdFilter.length > 0) {
                return {
                    ...state,
                    dogs: action.payload === 'all' ? state.allDogs : createdFilter
                }
            }
            else {
                return {
                    ...state,
                    dogs: "error"
                }
            }


        case 'ORDER_BY_NAME':
            let sorted = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) { return -1 }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1 }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) { return 1 }
                    return 0
                })
            return {
                ...state,
                dogs: sorted
            }
        case 'ORDER_BY_WEIGHT':
            let sortedW = action.payload === "menor" ?
                state.dogs.sort(function (a, b) {

                    if (parseInt(a.min_weight) > parseInt(b.min_weight)) { return 1 }
                    if (parseInt(a.min_weight) < parseInt(b.min_weight)) { return -1 }
                    return 0;

                }) :
                state.dogs.sort(function (a, b) {
                    if (parseInt(a.max_weight) > parseInt(b.max_weight)) { return -1 }
                    if (parseInt(a.max_weight) < parseInt(b.max_weight)) { return 1 }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedW
            }
        case "GET_NAME_DOGS":
            return {
                ...state,
                dogs: action.payload,
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case "CLEAN_DETAIL":
            return {
                ...state,
                detail: {}
            }

        default:
            return state;
    }
}

export default rootReducer;