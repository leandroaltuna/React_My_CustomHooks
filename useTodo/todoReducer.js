

export const todoReducer = ( initialState = [], action ) => {

    //* filter and map, crean un nuevo arreglo y es lo recomendable de usar. Push and unpush, mutan el arreglo y se debe evitar en la mayoria de ocaciones.

    switch ( action.type ) {
        case '[TODO] Add Todo':
            return [ ...initialState, action.payload ];
    
        case '[TODO] Remove Todo':
            return initialState.filter( todo => todo.id !== action.payload );

        case '[TODO] Toggle Todo':
            return initialState.map( todo => {

                if ( todo.id === action.payload ) {
                    return { 
                        ...todo, 
                        done: !todo.done // devuelve lo contrario del valor.
                    }
                }

                return todo;
            });
        
        default:
            return initialState;
    }
    
}