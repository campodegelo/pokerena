import React, { Fragment, useState, useRef} from "react";
import {useDrag, useDrop} from 'react-dnd';
import Window from './Window';
import Increment from './Increment';
import ITEM_TYPE from '../utils/Items';

const Item = ({item, index, moveItem, status, tournamentId}) => {

    // console.log('item = ', item);
    const ref = useRef(null);

    const [,drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if(!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;
            console.log('dragIndex = ', dragIndex);
            console.log('hoverIndex = ', hoverIndex);

            if(dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) /2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y = hoveredRect.top;

            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        item: {type: ITEM_TYPE, ...item, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    const isTournament = item.status === 'torneio';

    drag(drop(ref));

    return (
        <Fragment>
            <div
                ref={ref}
                style={{opacity: isDragging ? 0 : 1}}
                className={"item"}
                >
                <div className={"item__bar"} style={{backgroundColor: status.color}}>

                </div>
                
                <p className={"item__title"}>{item.first} {item.last}</p>
                <img src="/img/chart.png" alt="report" className={"item__status"} onClick={onOpen}></img>
                <img                
                    id={item.id}
                    src={item.image}
                    alt={item.last}
                    className={"player__image--small"}
                ></img>
                {isTournament && (
                        <Increment
                          userId={item.id}
                            tournamentId={tournamentId}
                        ></Increment>
                )}
            </div>

            <Window
                item={item}
                onClose={onClose}
                show={show} 
            >
            </Window>
        </Fragment>
    )
}

export default Item;