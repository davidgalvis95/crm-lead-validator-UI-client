import React, {useState, useEffect} from 'react';

import OutputForm from './OutputForm';
import Search from './Search';
import "./MainView.css";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorModal from "../UI/ErrorModal";

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


    const [lead, setLead] = useState(initialLead);
    const [shouldSendRequest, setShouldSendRequest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [leadId, setLeadId] = useState('');
    const [isSample, setIsSample] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (shouldSendRequest && leadId !=='') {
            setShowOutput(true);
            validateLead(leadId, isSample);
        }
    }, [shouldSendRequest, leadId, isSample])


    const validateLead = (leadId, isSample) => {
        const url = `http://localhost:7000/api/v1/validate/${leadId}?isSampleLead=${isSample}`;
        setIsLoading(true);
        console.log('SENDING REQUEST....!')
        setTimeout(() =>
            fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(responseData => {
                    leadValidationResponseHandler(responseData);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                    setError(true);
                })
            , 500 );
    }

    const shouldSendRequestHandler = (sendRequest, leadId) => {
        setShouldSendRequest(sendRequest);
        setLeadId(leadId);
    }

    const leadValidationResponseHandler = (data) => {
        const actualLead = {...initialLead};
        console.log(data.isAProspect);

        actualLead.leadId = data.lead.idNumber;
        actualLead.name = data.lead.firstName; // + " " + data.lead.lastName TODO THIS IS TOO LONG
        actualLead.birthDate = `${data.lead.birthDate[0]}-${data.lead.birthDate[1]}-${data.lead.birthDate[2]}`;
        actualLead.email = data.lead.email;
        actualLead.score = data.score;
        actualLead.isAProspect = data.isAProspect ? 'YES' : 'NO';
        actualLead.reason = data.reasonMessage;

        setLead(actualLead);
        setIsLoading(false);
        console.log(isLoading);
    }

    const sampleLeadHandler = () => {
        setIsSample( prevState => !prevState )
    }

    const clearError = () => {
        setError(false);
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
        if(error){
            display = <ErrorModal onClose={clearError}>{error}</ErrorModal>
        }
    }



    return (
        <div className="main-view">
            { error? null :<section>
                <Search sendRequest={shouldSendRequestHandler} sampleLeadHandler={sampleLeadHandler}/>
            </section> }
            {display}
        </div>
    );
}

export default MainView;
