import { useEffect, useState } from 'react';


const localCache = {};

export const useFetch = ( url ) => {
 
    const [state, setState] = useState({

        data: null,
        isLoading: true,
        hasError: false,
        error: null

    });

    useEffect(() => {
      
        getFetchWithCache();
      
    }, [ url ]);

    const setLoadingState = () => {
        
        setState({
            
            data: null,
            isLoading: true,
            hasError: false,
            error: null

        });

    }

    const setErrorState = ({ status, statusText }) => {
        
        setState({

            data: null,
            isLoading: false,
            hasError: true,
            error: {
                // code: resp.status,
                // message: resp.statusText,
                code: status,
                message: statusText,
            },

        });
    }

    const reloadingFetch = async () => {
        
        await getFetch();

    }

    const getFetchWithCache = async () => {
        
        if ( localCache[ url ] ) {
            
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });

            return;

        }

        await getFetch();


    }
    
    const getFetch = async () => {

        setLoadingState();

        try {
            
            const resp = await fetch( url );
    
            //Sleep
            await new Promise( resolve => setTimeout( resolve, 500) );
    
            if ( !resp.ok ) {
    
                // setState({
                //     data: null,
                //     isLoading: false,
                //     hasError: true,
                //     error: {
                //         code: resp.status,
                //         message: resp.statusText,
                //     },
                // });

                // const { status, statusText: message } = resp;
                // setErrorState({ status, message });
                setErrorState( resp );
    
                return;
    
            }
    
            const data = await resp.json();
    
            setState({
                data: data,
                isLoading: false,
                hasError: false,
                error: null,
            });

            //* Manejo del cache
            localCache[ url ] = data;

        } catch (error) {
            // const { message } = error;
            // setErrorState({ message });
            // console.log({ error });
            setErrorState({ statusText: error.message });

        }

    }

 
    return ({
        
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        reloadingFetch,

    });

}
