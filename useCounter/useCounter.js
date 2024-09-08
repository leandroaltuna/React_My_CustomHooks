import { useState } from 'react';


export const useCounter = ( initialValue = 10 ) => {
    
    const [counter, setCounter] = useState( initialValue );

    const increment = ( value = 1) => {
        
        //* Este codigo es como usualmente se programa y sale bien. Solo que para testing podria no funcionar.
        // setCounter( counter + value );

        //* Este codigo garantiza que siempre estaremos trabajando con el valor más reciente de counter, porque current es el valor actualizado de counter en el momento en que se ejecuta la función. Este codigo sirve tambien para el testing ya que toma el valor actual de parametros como String, Number, Boolean. En caso de objetos se podria usar el codigo anterior.
        setCounter( ( current ) => current + value );

    }

    const decrement = ( value = 1 ) => {
        
        if ( counter === 0 ) return;
        // setCounter( counter - value );
        setCounter( ( current ) => current - value );

    }

    const reset = () => {
        setCounter( initialValue );
    }


    return {
        counter,
        increment,
        decrement,
        reset,
    }

}