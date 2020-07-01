import React, {useState, useEffect} from 'react';
import { useStatefulFields } from "../Hooks/useStatefulFields";
// import { useAuthSumbit } from "../Hooks/useAuthSubmit";
import axios from '../scripts/axios';

const Increment = ({userId, tournamentId, updatePrize}) => {
    const [values, handleChange] = useStatefulFields();
    // const [totalPrize, setTotalPrize] = useState(null);
    // const [error, loading, handleSubmit] = useAuthSumbit("/increment", values);
    const [editBtn, setEditBtn] = useState(false);
    const [buyin, setBuyin] = useState();
    const [addon, setAddon] = useState();
    const [prize, setPrize] = useState();

    const handleSubmit = () => {
        (async () => {
            console.log('values = ', values);
            if (typeof values.addon === 'undefined'){
                values.addon = addon;
            }
            if (typeof values.buyin === 'undefined'){
                values.buyin = buyin;
            }
            if (typeof values.prize === 'undefined'){
                values.prize = prize;
            }
            const {data} = await axios.post('/increment', {
                userId, tournamentId, values
            });
            const totalPrize = await axios.post('/getTotalPrize', {tournamentId});
            updatePrize(totalPrize.data[0].sum * totalPrize.data[0].value_entry);
            console.log('data from /increment ', data);
        })();
    }

    useEffect(() => {
        (async () => {
            // needs to wait otherwise a select in the DB is made before the register is there
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log(userId, tournamentId);
            const {data} = await axios.post('/searchBA', {userId, tournamentId});
            // await new Promise(resolve => setTimeout(resolve, 500));
            console.log('user: ', userId);
            console.log('tournament: ', tournamentId);
            console.log('data from searchBA = ', data);
            setBuyin(data[0].buyin);
            setAddon(data[0].addon);
            setPrize(data[0].prize);

        })();
    },[]);

    return(
        <div className="increment" key={userId}>
            <div className="increment__options">
                <div className="increment__formgroup">
                    <label htmlFor="buyin" className="increment__label">buyin</label>
                    <input
                        type="number"
                        name="buyin"
                        className="increment__input"
                        autoComplete="off"
                        min='1'
                        max='10'
                    placeholder={buyin}
                        readOnly={!editBtn}
                        onChange={e => handleChange(e)}                  
                    ></input>
                </div>

                <div className="increment__formgroup">
                    <label htmlFor="addon" className="increment__label">addon</label>
                    <input
                        type="number"
                        name='addon'                       className="increment__input"
                        autoComplete="off"
                        min='0'
                        max='1'
                        placeholder={addon}
                        readOnly={!editBtn} 
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
        

                <div className="increment__formgroup">
                    <label htmlFor="prize" className="increment__label">prize</label>
                    <input
                        type="number"
                        name='prize'                       className="increment__input"
                        autoComplete="off"
                        min='0'
                        placeholder={prize}
                        readOnly={!editBtn} 
                        onChange={e => handleChange(e)}
                    ></input>
                </div>
            
                <input type="hidden" name="_csrf" value="{{csrfToken}}"/>
            </div>
        

            {editBtn && (
                <button className="btn btn--primary btn--small" onClick={() => {
                    handleSubmit();
                    setEditBtn(false);
                }}>Confirmar</button>
            )}
            {!editBtn && (
                <button className="btn btn--primary btn--small" onClick={() => setEditBtn(true)}>Editar</button>
            )}
        </div>
    )

}

export default Increment;