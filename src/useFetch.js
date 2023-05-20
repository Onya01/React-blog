import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
         fetch(url, { signal: abortCont.signal })
         .then(res => {
             if(!res.ok) {
                 throw Error('could not fetch the data for that resource')
             }
             return res.json();
         })
         .then(data => {
             setData(data);
             setIsloading(false);
             setError(null);
         })
         .catch(err => {
            if (err.name === 'AbortError') {
                // console.log('fetch aborted');
            } else {
              setIsloading(false);
              setError(err.message);
            }
         })
        }, 1000);

        return() => abortCont.abort();
        
     }, [url]);

     return { data, isLoading, error }
}

export default useFetch;