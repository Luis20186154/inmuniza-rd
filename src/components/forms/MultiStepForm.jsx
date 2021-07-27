import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormStepOne from './FormStepOne';
import FormStepThree from './FormStepThree';
import FormStepTwo from './FormStepTwo';

const MultiStepForm = () => {
    
    const [stepForm, setStepForm] = useState(1);
    const [data, setData] = useState({
        id: '',
        dateOfBirth: '',
        name: '',	
        lastName: '',
        numberPhone: '',		
        province: '',
        zodiacSign: '',
        vaccine: {
            typeVaccine: '',
            appliedVaccines: 0,
            vaccinationDate: ''
        }
    })

    let Form;

    switch (stepForm) {
        case 1:
            Form = <FormStepOne setStepForm = {setStepForm} data = {data} setData = {setData}/>
            break;
        case 2:
            Form = <FormStepTwo setStepForm = {setStepForm} data = {data} setData = {setData}/>
            break;
        case 3:
            Form = <FormStepThree setStepForm = {setStepForm} data = {data} setData = {setData}/>
    }

    return (
        <ContainerForm>
            {Form}
        </ContainerForm>
    )
}

export default MultiStepForm;

const ContainerForm = styled.div`
    height: 650px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
