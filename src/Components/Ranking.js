import React, { useState, useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
import Month from './Month';
import axios from "../scripts/axios";


const Ranking = () => {

    const monthName = [ "January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December" ];
    
    const [monthsPlayed, setMonthsPlayed] = useState(null);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('/getMonthsPlayed');
            console.log('data from /getMonthsPlayed = ', data);

            if (data.success) {
                const monthsArray = [];
                data.data.forEach(el => {
                    monthsArray.push(monthName[el.month - 1]);
                });

                console.log('months array = ', monthsArray);
                setMonthsPlayed(monthsArray);
            }
        })();
    },[]);

    return (
        <BrowserRouter>
              <div className="main__text-box">
                  <h1 className="heading-primary">
                      <span className="heading-primary--main">Ranking</span>
                  </h1>
              </div>

              {monthsPlayed && (
                <div className='months'>
                    {monthsPlayed.map(month => (
                        <Link to={`/month/${monthName.indexOf(month) + 1}`} key={month}>
                            <div className="months__single">
                                <p>
                                    {month}
                                </p>
                            </div>

                        </Link>
                    ))}
                </div>
              )}

            <Route path="/month/:id" component={Month} />

              
        </BrowserRouter>
      );
}

export default Ranking;