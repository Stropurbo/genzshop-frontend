import React from 'react';

const Pagination = ({totalpage, currentpage ,handlePageChange}) => {
    
    return (
        <div className='flex justify-center py-8'>
            {Array.from({length:totalpage}, ( _, i) => (

               <button key={i}
               onClick={() => handlePageChange(i+1)}
                className= {`mx-1 p-4 mb-5 btn ${currentpage === i+1 ? "btn-warning" : "btn-active"}`} >
                {i+1}
               </button> 

            ))}


           
        </div>
    );
};

export default Pagination;