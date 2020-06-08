import React from 'react'
import classes from './Pagination.module.css';
import { useState } from 'react';

let Pagination = ({totalItems, onPageChanged, currentPage, portionSize = 5}) => {
    
    let pages = [];
    for (let i = 1; i <= totalItems; i++)
    {
        pages.push(i);
    }

    let portionCount = Math.ceil(totalItems / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return(
            <div className={classes.point}>

                <ul className={classes.pagination}>
                    {portionNumber > 1 && <li><span onClick={() => {setPortionNumber(portionNumber - 1)}}>«</span></li>}
                    {pages.map(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber && (<li key={p}><span onClick={() => onPageChanged(p)} className={currentPage === p ? classes.active : ''}>{p}</span></li>))}
                    {portionCount > portionNumber && <li><span onClick={() => {setPortionNumber(portionNumber + 1)}}>»</span></li>}
                </ul>
            </div>
    )   
}

export default Pagination