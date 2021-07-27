import db from './firebase';

const AddRegister = async (data) => {

    //await db.collection('pacientes').add(data);
    await db.collection('pacientes').doc(data.id).set(data).catch((e) => {
        console.log('ERROR AL REGISTRAR: ', e);
    });
}

const DeleRegister = async (id) => {
    await db.collection("pacientes").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

const CheckRegistration = () => [
    db.collection('pacientes').onSnapshot( (snapshot) => {
        snapshot.docs.map( (doc) => {
            console.log('DESDE MAP', doc.data());
        })
    })
]

export {AddRegister, CheckRegistration, DeleRegister};