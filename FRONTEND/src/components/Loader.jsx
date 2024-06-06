import React from 'react';



function Loader() {
  return (
    <>
    <div className='w-full h-screen flex justify-center'>
    <div
    className="inline-block h-20 w-20 mt-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    
  </div>
  </div>
  </>
  )
}

export default Loader
  