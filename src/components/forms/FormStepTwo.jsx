import React, { useState } from 'react';
import { getZodiacSign } from '../../utility/utilities';
import './FormStepOne.css';

const FormStepTwo = ({setStepForm, data, setData}) => {

    //const [error, seterror] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [name, setname] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setphone] = useState('');

    const regexPhone = /[0-9]\d{2}-[0-9]\d{2}-[0-9]\d{3}/g;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(name === '' || lastName === '' || phone === '' || dateOfBirth === '' || regexPhone.test(phone) === false){
            return;
        }

        //console.log('DATA FROM TWO: ', data);

        await setData({
            ...data,
            dateOfBirth: dateOfBirth,
            zodiacSign: getZodiacSign(dateOfBirth),
            name: name,
            lastName: lastName,
            numberPhone: phone.replace('-', '').replace('-', '')
        });

        setStepForm(value => value + 1);
        
    }

    const onChangePhone = (e) => {                       

        if (!isNaN(e.target.value) || e.target.value.includes('-')) {
            setphone(e.target.value); 
            if(e.target.value.length === 3) {
                if(e.nativeEvent.inputType === 'deleteContentBackward'){
                    setphone(e.target.value); 
                } else {
                    setphone(e.target.value + '-')
                }            
            }

            if(e.target.value.length === 7) {
                if(e.nativeEvent.inputType === 'deleteContentBackward'){
                    setphone(e.target.value); 
                } else {
                    setphone(e.target.value + '-')
                }            
            } 
        }

    }

    return (
        <form onSubmit = {handleSubmit} className="form" style = {{width: 500}}>
            <h1 className="form__title">Regístrate</h1>

            <div className="form__div">
                <input 
                    type="text" 
                    className="form__input" 
                    placeholder=" " 
                    value = {name}
                    onChange = {e => setname(e.target.value)}
                />
                <label htmlFor="" className="form__label">Nombre</label>
            </div>

            <div className="form__div">
                <input 
                    type="text" 
                    className="form__input" 
                    placeholder=" "
                    value = {lastName}
                    onChange = {e => setLastName(e.target.value)} 
                />
                <label htmlFor="" className="form__label">Apellido</label>
            </div>

            <div className="form__div">
                <input 
                    maxLength = {12}
                    type="text" 
                    className="form__input" 
                    placeholder=" "
                    value = {phone}
                    onChange = {e => onChangePhone(e)} 
                />
                <label htmlFor="" className="form__label">Teléfono</label>
            </div>

            <div className="form__div">
                <input 
                    type="date" 
                    className="form__input"
                    onChange = {e => setDateOfBirth(e.target.value)}
                />                
            </div>

            <input 
                type="submit" 
                className="form__button" 
                value="Siguiente" 
            />
        </form>
    )
}

export default FormStepTwo;
