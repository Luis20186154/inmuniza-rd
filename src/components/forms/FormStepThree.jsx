import React, { useState } from 'react';
import { AddRegister, CheckRegistration } from '../../firebase/DataBaseManager';
import { fixDate } from '../../utility/utilities';
import './FormStepOne.css';

const FormStepThree = ({setStepForm, data, setData}) => {

    //const [error, seterror] = useState(false);
    const [vaccine, setVaccine] = useState('');
    const [province, setProvince] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();        

        console.log('PROVINCIA: ', province);
        console.log('VACUNA: ', vaccine);

        if (vaccine === '' || province === '') {
            return;
        }

        //let date = fixDate(new Date(Date.now()).toLocaleDateString());

        let newData = {
            ...data,
            province: province,
            vaccine: {
                typeVaccine: vaccine,
                appliedVaccines: 1,
                vaccinationDate: fixDate(new Date(Date.now()).toLocaleDateString()),
            }
        }
        
        await setData(newData);
        
        //console.log();
        //console.log('DATA FROM THREE: ', newData);

        //CheckRegistration();
        AddRegister(newData);

        //return;

        setStepForm(1);
        
    }

    return (
        <form onSubmit = {handleSubmit} className="form" style = {{width: 500}}>
            <h1 className="form__title">Tipo de vacuna, Provincia y Fecha</h1>

            <select value = {vaccine} onChange = {e => setVaccine(e.target.value)} className="form-select" aria-label="Default select example" style ={{marginBottom: '1.5rem'}}>
                <option defaultValue value = ''>Tipo de vacuna</option>
                <option value="pfizer">Pfizer</option>
                <option value="moderna">Moderna</option>
                <option value="jhonson">Jhonson & Jhonson</option>
            </select>
            
            <select value = {province} onChange = {e => setProvince(e.target.value)} className="form-select" aria-label="Default select example" style ={{marginBottom: '1.5rem'}}>
                <option defaultValue value = ''>Provincia</option>
                <option value="santoDomingo">Santo Domingo</option>
                <option value="santiago">Santiago</option>
                <option value="azua">Azua</option>
                <option value="dajabon">Dajabón</option>
                <option value="espaillat">Espaillat</option>
                <option value="laVega">La Vega</option>
                <option value="laRomana">La Romana</option>
            </select>

            <input type="submit" className="form__button" value="Registrarse" />
        </form>
    )
}

export default FormStepThree;