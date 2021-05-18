import React, {useRef, useEffect, useState} from 'react';
import CheckIcon from "../UI/icons/CheckIcon";

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

    const [enteredFilter, setEnteredFilter] = useState('');
    const [checkProps, setCheckProps] = useState(["15px", "15px"])
    const inputSearchRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter != '' && enteredFilter === inputSearchRef.current.value ) {
                const pattern = new RegExp("\\d{9}");
                const matches = enteredFilter.match(pattern);
                if( matches ){
                    // console.log(isSampleLead)
                    props.sendRequest(true, enteredFilter);
                }else {
                    alert("Please enter a number of 9 digits")
                }
            }
            return () => {
                clearTimeout(timer);
            }
        }, 1000)
    }, [enteredFilter, inputSearchRef])

    const isSampleLeadHandler = () => {
        props.sampleLeadHandler();
        setCheckProps( prevState => {
            if(prevState[0] === "15px"){
                return ["20px", "20px"];
            }else {
                return ["15px", "15px"];
            }
        })
    }

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <div>
                        <label>Search by id</label>
                        <input
                            ref={inputSearchRef}
                            type="text"
                            value={enteredFilter}
                            onChange={event => setEnteredFilter(event.target.value)}/>
                    </div>
                    <div>
                        <CheckIcon height={checkProps[0]}
                                   width={checkProps[0]}
                                   className="is-sample-icon"
                                   onClick={isSampleLeadHandler}/>
                        <label>Is Sample Lead</label>
                    </div>
                </div>
            </Card>
        </section>
    );
});

export default Search;
