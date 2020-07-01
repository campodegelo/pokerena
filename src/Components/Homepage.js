import React, {useState, useEffect} from "react";
import Item from './Item';
import DropWrapper from './DropWrapper';
import Col from './Col';
import {statuses} from '../data/index';
import axios from '../scripts/axios';

const Homepage = () => {

    const [items, setItems] = useState(null);
    const [tournamentId, setTournamentId] = useState(null);

    useEffect(() => {
        (async() => {
            const {data} = await axios.get('/findOnGoingTournament');
            const players = await axios.get('/allPlayers');
            console.log('tournament going on = ', data);
            console.log("info about users = ", players.data);

            // no tournaments unfinished  
            if(data.length === 0) {
                players.data.forEach(element => {
                    element.status = 'jogadores';
                    if(element.image === null) {
                        element.image = "/img/default.png"
                    }
                });
                setItems(players.data);
            } else {
                console.log('tournament happening');
                setTournamentId(data[0].tournament_id);
                players.data.forEach(element => {
                    element.status = 'jogadores';
                    if(element.image === null) {
                        element.image = "/img/default.png"
                    }
                    data.forEach(el => {
                        if (el.id === element.id) {
                            element.status = 'torneio';
                            return;
                        }
                    })

                });
                setItems(players.data);
            }
            
            
        })();


    }, []);
    

    console.log('items = ', items);
    console.log('tournamentId = ', tournamentId);

    const onDrop = (item, monitor, status) => {
        //const mapping = statuses.find(si => si.status === status);

        
        setItems(prevState => {
            console.log('prevState = ', prevState);
            const newItems = prevState.filter(i => i.id !== item.id).concat({...item, status});
            console.log('item has been dropped ', item);
            console.log('status of item = ', status)
            const playerId = item.id;
            // Insert the player in the DB for the New Tournament
            if (status === 'torneio') {
                console.log('inserting in the db');
                if (tournamentId === null) {
                    // a new tournament will be created
                    (async () => {
                        console.log('a new tournament will be created');
                        const currentDate = new Date().getDate() + '-' + new Date().getMonth();
                        const value = 10;
                        const newTournament = await axios.post('/newTournament', {currentDate, value, playerId});
                        console.log('new tournament created = ', newTournament.data);
                        setTournamentId(newTournament.data[0].tournament_id);
                    })();
                } else {
                    // an open tournament is found
                    // insert player into the tournament
                    (async () => {
                        console.log('will insert player in the tournament');
                        const {data} = await axios.post('/joinPlayer', {
                            playerId, tournamentId
                        });
                        console.log('player inserted = ', data);
                    })();

                }
            }
            // Remove the player from the DB
            if(status === 'jogadores'){
                console.log('removing from the db');
                (async () => {
                    console.log('a player will be removed from the table');
                    const {data} = await axios.post('/removePlayer', {
                        playerId, tournamentId
                    });
                    console.log('user has been removed: ', data);
                    if (data.delete) {
                        setTournamentId(null);
                    }

                })();
            }
            return [ ...newItems];
        });

    }
    
    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            console.log('item has been moved');
            return [ ...newItems]
        })
    }

    return (
        <div className={"row"}>
            {statuses.map(s => {
                return (
                    <div key={s.status} className={"col__wrapper"}>
                        <h2 className={"col__header"}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                                {items && items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} tournamentId={tournamentId}></Item>)}
                            </Col>
                        </DropWrapper>
                    </div>
                )
            })}
        </div>
    )
}

export default Homepage;