import React, {useState, useEffect} from 'react';
import axios from '../scripts/axios';

const Month = (props) => {

    useEffect(() => {
        (async () => {
            console.log("this.props.match.params.id: ", props.match.params.id);
            const {data} = await axios.get('/getMonthInfo/' + props.match.params.id);
        })();
    });

    return (
        <div>
            
        </div>
    )
}

export default Month;