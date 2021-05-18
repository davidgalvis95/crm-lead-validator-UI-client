import React, {useState, useEffect} from 'react';

import OutputForm from './OutputForm';
import Search from './Search';
import "./MainView.css";
import LoadingIndicator from "../UI/LoadingIndicator";

function MainView() {

    const initialLead = {
        leadId: false,
        name: null,
        birthDate: null,
        email: null,
        score: null,
        isAProspect: null,
        reason: null
    }

    const sampleLead = {
        leadId: 1232124,
        name: 'David Galvis',
        birthDate: '1995-04-01',
        email: 'someemail@gmail.com',
        score: 50,
        isAProspect: 'YES',
        reason: 'I dont know'
    }


    const [lead, setLead] = useState(initialLead);
    const [shouldSendRequest, setShouldSendRequest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [leadId, setLeadId] = useState('');
    const [isSample, setIsSample] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (shouldSendRequest && leadId !=='') {

            console.log(shouldSendRequest)
            console.log(leadId);
            setShowOutput(true);
            validateLead(leadId, isSample);
        }
    }, [shouldSendRequest, leadId])


    const validateLead = (leadId, isSample) => {
        const url = `http://localhost:7000/api/v1/validate/${leadId}?isSampleLead=${isSample}`;
        console.log(url);
        setIsLoading(true);
        console.log('SENDING REQUEST....!')
        // setTimeout(() => leadValidationResponseHandler(null), 1000)

        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                leadValidationResponseHandler(responseData);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setError(true);
            });
    }

    const shouldSendRequestHandler = (sendRequest, leadId, isSample) => {
        setShouldSendRequest(sendRequest);
        setLeadId(leadId);
        setIsSample(isSample);
    }

    const leadValidationResponseHandler = (data) => {
        const actualLead = {...initialLead};
        console.log(isLoading);
        // actualState.id = data.leadId
        // actualState.birthDate = data.birthDate
        // actualState.name = data.firstName + " " + data.lastName
        // actualState.score = data.score
        // actualState.reason = data.reason


        actualLead.leadId = sampleLead.leadId;
        actualLead.birthDate = sampleLead.birthDate;
        actualLead.name = sampleLead.name;
        actualLead.score = sampleLead.score;
        actualLead.email = sampleLead.email;
        actualLead.isAProspect = sampleLead.isAProspect;
        actualLead.reason = sampleLead.reason;

        // setLead(actualState);
        setLead(actualLead);
        setIsLoading(false);
        console.log(isLoading);
    }


    let display = null;
    if(showOutput){
        display = <OutputForm lead={lead}/>;
        if (isLoading) {
            display = (
                <div>
                    <div className="loader-location">
                        <LoadingIndicator/>
                    </div>
                    <p className="validation-msg">{isSample ? 'Validating sample lead' : 'Validating...'}</p>
                </div>);
        }
    }



    return (
        <div className="main-view">
            <section>
                <Search sendRequest={shouldSendRequestHandler}/>
            </section>
            {display}
        </div>
    );
}

export default MainView;
