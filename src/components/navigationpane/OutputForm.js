import React from 'react';
import ManIcon from "../UI/icons/BeardManIcon";
import BlondeWomanIcon from "../UI/icons/BlondeWomanIcon";
import ColorfulWomanIcon from "../UI/icons/ColorfulWomanIcon";
import SuitManIcon from "../UI/icons/SuitManIcon";
import YoungManIcon from "../UI/icons/YoungManIcon";
import {RiEmotionHappyFill} from 'react-icons/ri'
import {ImSad2} from 'react-icons/im'

import Card from '../UI/Card';
import './OutputForm.css';


const OutputForm = React.memo(props => {

    const lead = props.lead;

    const icons = [
        <ManIcon width="250px" heigth="250px" margin-right="1.5rem"/>,
        <BlondeWomanIcon width="250px" heigth="250px" margin-right="1.5rem"/>,
        <ColorfulWomanIcon width="250px" heigth="250px" margin-right="1.5rem"/>,
        <SuitManIcon width="250px" heigth="250px" margin-right="1.5rem"/>,
        <YoungManIcon width="250px" heigth="250px" margin-right="1.5rem"/>
    ];

    return (
        <section className="ingredient-form">
            <Card>
                <h1>Lead Validation Results</h1>
                <div className="result-output">
                    <div>
                        {icons[parseInt((Math.random() * 4), 10)]}
                    </div>
                    <div className="form-control">
                        <div>
                            <label htmlFor="id">Id:</label>
                            <p>{lead ? lead.leadId : 'No data available'}</p>
                        </div>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <p>{lead ? lead.name : 'No data available'}</p>
                        </div>
                        <div>
                            <label htmlFor="amount">Email:</label>
                            <p>{lead ? lead.email : 'No data available'}</p>
                        </div>
                        <div>
                            <label htmlFor="phone">Birth Date:</label>
                            <p>{lead ? lead.birthDate : 'No data available'}</p>
                        </div>
                        <div>
                            <div className="result-reaction-w">
                                <label htmlFor="score">Score:</label>
                                {lead.isAProspect !== null ?
                                    (lead.score > 60 ?
                                        <RiEmotionHappyFill className="face"/> :
                                        <ImSad2 className="face"/>) :
                                    null}
                            </div>
                            <p>{lead && lead.score ? lead.score : 0}</p>
                        </div>
                        <div>
                            <div className="result-reaction-w">
                                <label htmlFor="prospect">The lead is a prospect:</label>
                                {lead.isAProspect !== null ?
                                    (lead.score > 60 ?
                                        <RiEmotionHappyFill className="face"/> :
                                        <ImSad2 className="face"/>) :
                                    null}
                            </div>
                            <p className="result-reaction">{lead.isAProspect ? lead.isAProspect : 'No data available'}</p>
                        </div>
                        <div>
                            <label htmlFor="reason">Reason:</label>
                            <p>{lead.reason ? lead.reason : 'No data available'}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    );
});

export default OutputForm;
