import React, { useState } from 'react';
import db from '../../firebase/firebase';
import './FormStepOne.css';

const FormStepOne = ({ setStepForm, data, setData }) => {
    
    const [modal, setmodal] = useState(false);
    const [cedula, setCedula] = useState('');
    const [oldUser, setoldUser] = useState({});
    const regexCedula = /[0-9]\d{2}-[0-9]\d{6}-[0-9]/g;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cedula.trim() === '' || regexCedula.test(cedula) === false) return;        

        if (verifyIfExistsRegister(cedula.replace('-', '').replace('-', ''))) {
            //seterror(true);
            setmodal(true);
            console.log(oldUser);
            return;
        }

        setmodal(false);
        await setData({
            ...data,
            id: cedula.replace('-', '').replace('-', '')
        });

        setStepForm(value => value + 1);

    }

    const verifyIfExistsRegister = async (id) => {

        let exists;
        let data;

        await db.collection('pacientes').doc(id).get().then(doc => {
            if (doc.exists) {
                data = doc.data();                                
                exists = true;
            } else {                
                exists = false;
            }
        })

        setoldUser(data);
        return exists;
    }

    const onChangeCedula = (e) => {

        if (!isNaN(e.target.value) || e.target.value.includes('-')) {
            setCedula(e.target.value);
            if (e.target.value.length === 3) {
                if (e.nativeEvent.inputType === 'deleteContentBackward') {
                    setCedula(e.target.value);
                } else {
                    setCedula(e.target.value + '-')
                }
            }

            if (e.target.value.length === 11) {
                if (e.nativeEvent.inputType === 'deleteContentBackward') {
                    setCedula(e.target.value);
                } else {
                    setCedula(e.target.value + '-')
                }
            }
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">

                <h1 className="form__title">Cédula de Identidad y Electoral</h1>

                <div className="form__div">
                    <input
                        maxLength={13}
                        type='text'
                        className="form__input"
                        placeholder=" "
                        value={cedula}
                        onChange={(e) => onChangeCedula(e)}
                    />
                    <label htmlFor="" className="form__label">XXX-XXXXXXX-X</label>
                </div>

                {/* {error && <small style ={{
                    position: 'relative',
                    top: -15
                }}>Cedula incorrecta</small>} */}

                {modal ? (
                    <div>
                        <div className="alert alert-danger" role="alert">
                            Esta Cedula Ya Esta Registrada.
                        </div>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Ver Registro
                        </button>
                    </div>
                )

                    : (
                        <input
                            type="submit"
                            className="form__button"
                            value="Siguiente"
                        />
                    )}

            </form>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Información De Registro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(typeof oldUser === "object") ? (
                                <>
                                    <p><b>Cedula:</b> {oldUser.id}</p>
                                    <p><b>Nombres:</b> {oldUser.name}</p>
                                    <p><b>Apellidos:</b> {oldUser.lastName}</p>
                                    <p><b>Vacuna:</b> {oldUser.vaccine.typeVaccine}</p>
                                    <p><b>Vacunas Aplicadas:</b> {oldUser.vaccine.appliedVaccines}</p>
                                    <p><b>Fecha De Vacunación:</b> {oldUser.vaccine.vaccinationDate}</p>
                                    <p><b>Provincia:</b> {oldUser.province}</p>
                                    <p><b>Telefono:</b> {oldUser.numberPhone}</p>
                                    <p><b>Signo Zodiacal:</b> {oldUser.zodiacSign}</p>
                                    <p><b>Fecha De Nacimiento:</b> {oldUser.dateOfBirth}</p>
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                            >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default FormStepOne;