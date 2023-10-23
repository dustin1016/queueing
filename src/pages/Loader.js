import React from 'react'
import { InfinitySpin  } from 'react-loader-spinner'


const Loader = () => {

    return(
        <div className='w-full h-96 flex flex-col items-center justify-center text-center'>
            <InfinitySpin 
                width='200'
                color="#4fa94d"
                />
            <p className='text-slate-700 text-md'>Refreshing Data...</p>
        </div>
    )
}

export default Loader;