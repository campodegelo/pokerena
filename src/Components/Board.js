import React from 'react'
import Player from './Player';
import { useDrop } from 'react-dnd';
import ITEM_TYPE from '../utils/Items';
 
export default function Board(props) {

    const [{isOver}, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item, monitor) => {
            item.status === 'notPlaying' ? item.status = 'playing' : item.status = 'notPlaying';
            console.log(item)},
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    // const drop = e => {
    //     e.preventDefault();
    //     const playerId = e.dataTransfer.getData('player__id');

    //     const player = document.getElementById(playerId);
    //     console.log('player = ', player);
        
    //     player.style.display = 'block'; 

    //     console.log('e.target = ', e.target);

    //     e.target.appendChild(player);
    // }

    // const dragOver = e => {
    //     e.preventDefault();
    // }

    return (
        <div 
            id={props.id}
            className={props.className}
            ref={drop}
            style={{backgroundColor: isOver ? 'red' : "yellow"}}
            // onDrop={drop}
            // onDragOver={dragOver}
        >
            {props.children}
        </div>
    )
}
