import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';


const initialState = [];

const init = () => {
    return JSON.parse( localStorage.getItem( 'todos' ) ) || [];
}

export const useTodo = () => {
    

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {

        localStorage.setItem( 'todos', JSON.stringify( todos ) );

    }, [ todos ]);

    const handleNewTodo = ( newTodo ) => {
        
        // console.log( newTodo[0].id );
        // console.log( newTodo.id, newTodo.description );
        const action = {
            type: '[TODO] Add Todo',
            payload: newTodo,
        };

        //* Ejecuta el todoReducer para agregar el nuevo TODO.
        dispatch( action );

    }

    const handleDeleteTodo = ( id ) => {
        
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })

    }
    
    const handleToggleTodo = ( id ) => {
        
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })

    }


    return {
        todos,
        todosCount: todos.length, 
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }

}