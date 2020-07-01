import React from 'react'
import ITEM_TYPE from '../utils/Items';
import { useDrag } from 'react-dnd'

function Player(props) {

    const [{isDragging }, drag ] = useDrag({
        item: {
            type: ITEM_TYPE,
            id: props.id, 
            status: props.status
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    // const dragStart = e => {
    //     const target = e.target;

    //     console.log('e.target = ', e.target);
        

    //     console.log('element to be dragged is : ', e.target.id);
        

    //     e.dataTransfer.setData('player__id', target.id);

    //     setTimeout(() => {
    //         target.style.display = 'none';
    //     }, 0);
    // }

    // const dragOver = e => {
    //     e.stopPropagation();
    // }

    // console.log('props are ', props);

    return (
        <div
            ref={drag}
            style={{opacity: isDragging ? '0.2' : '1'}}
        >
            <img
                
                id={props.id}
                src={props.src}
                alt={props.last}
                className={props.className}
                // draggable={props.draggable}
                // onDragStart={dragStart}
                // onDragOver={dragOver}
            >
                {/* {props.children} */}
            </img>

        </div>
    )
}

export default Player
