import React from 'react'
import {AiFillStar,AiOutlineStar} from "react-icons/ai";

const Rating = (props) => {
  return (
    <>
        {[...Array(5)].map((_,index) => {return(
            <span  onClick={() => props.onClick(index)} style={props.style}>
                { 
                    index < props.rating ? (<AiFillStar fontsize='15px'/>) : (<AiOutlineStar fontSize='15px' />)
                                        // All indexes less than rating   OR   All indexes more than rating
                                        // indexes: 0 ---> 4    rating: 1 ---> 5
                }
            </span>
        )})}
    </>
  )
}

export default Rating

/* 
    This code is using the map function to create an array of 5 items. 
        
    1.  The underscore in the first argument of the map function is a placeholder 
        for a value that is not used in the code. 
    2.  The second argument (i) is the index of each item in the array. 
        
    **( A placeholder is a value or variable that is used as a temporary substitute 
        for another value or variable that will be added later.) 

    **( Placeholders are often used in programming when the programmer knows that a 
        certain value or variable will be needed, but does not yet know what that 
        value or variable will be. )
*/
