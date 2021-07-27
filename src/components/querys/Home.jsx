import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from 'styled-components';
import db from '../../firebase/firebase';
import { DeleRegister } from '../../firebase/DataBaseManager';

export default function Home() {

	//console.log(window.screen.height);
	const [registers, setRegisters] = useState([]);
	const [provinveFilter, setProvinveFilter] = useState('santoDomingo');
	const [filters, setFilters] = useState([]);
	const MySwal = withReactContent(Swal);

	useEffect(() => {

		
		const ac = new AbortController();

		db.collection('pacientes').onSnapshot((snapshot) => {
			setRegisters(snapshot.docs.map((documento) => {
				return { ...documento.data() }
			}));
		})


		/* db.collection('pacientes').doc('prueba').set({
			nombre: 'MANITO',
			direccion: {
				calle: 'JUANA MEJIA',
				casa: '3 C'
			}
		}) */

		//* FILTRO DE DOCUMENTOS DE UNA COLECCION
		db.collection('pacientes').where('name', '==', 'Lui').get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					//console.log(doc.id, ' => ', doc.data());
				});
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});

		//* FILTRO DE UN DOCUMENTO DE UNA COLECCION
		db.collection('pacientes').doc('prueba').get().then(doc => {
			if (doc.exists) {
				//console.log('Document data:', doc.data());
			} else {
				// doc.data() will be undefined in this case
				//console.log('No such document!');
			}
		})


		/* registers.forEach(element => {
			
			for (let i = 0; i < filter.length; i++) {
				
				

			}			

		}); */
		return () => ac.abort();
		//console.log('FILTRADOS: ', db.collection('pacientes').doc('123456789'));;

		//console.log('CANTIDAD DE REGISRO:', registers.length);
	}, [])	

	const handleChangeCheckBox = (e) => {		
		if(e.target.checked) {
			if(filters.includes(e.target.id)){
				return;	
			}else{
				filters.push(e.target.id);
			}
		}

		let registersFiltereds = registers.filter((register) => {

			for (let i = 0; i < filters.length; i++) {
				switch (filters[i]) {
					case register.name.toLowerCase():
						//console.log('DATA OF NAME', register)	
						return true;
						break;
	
					case register.province.toLowerCase():
						//console.log('DATA OF PROVINCE', register)	
						return true;
						break;

					case register.vaccine.typeVaccine.toLowerCase():					
						return true;
						break;
					
					default:
						return false
						break;
				}
			}
		})

		setRegisters(registersFiltereds);
	}

	const applyFilters = (e) => {
		e.preventDefault();			

		if(filters.includes(provinveFilter)) return;

		filters.push(provinveFilter);

		//setFilter([]);
		console.log('APPLIED FILTERS: ', filters);

		let registersFiltereds = registers.filter((register) => {

			for (let i = 0; i < filters.length; i++) {
				switch (filters[i]) {
					case register.name.toLowerCase():
						//console.log('DATA OF NAME', register)	
						return true;
						break;
	
					case register.province.toLowerCase():
						//console.log('DATA OF PROVINCE', register)	
						return true;
						break;
					
					default:
						return false
						break;
				}
			}
		})

		setRegisters(registersFiltereds);

	}

	const cancelFilters = async () => {
		await db.collection('pacientes').get().then((snapshot) => {
			setRegisters(snapshot.docs.map((documento) => {
				return { ...documento.data() }
			}));
		})
	}
	
	const deleteRegister = async (id) => {
		
		await MySwal.fire({
			title: `¿Estás seguro de eliminar el registro '${id}'?`,
			showDenyButton: true,	
			confirmButtonText: `Sí`,
			denyButtonText: `No`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				DeleRegister(id);
			  	Swal.fire('Registro eliminado!', '', 'success')
			} /* else if (result.isDenied) {
			  Swal.fire('Changes are not saved', '', 'info')
			} */
		})

		//console.log(prueba);
		console.log(id)
	}

	if(registers.length == 0) return <h2>NO TIENES REGISTROS</h2>; 

	return (		  

		<MainTable>
			<TableContainer>

				<TableHeader>
					<ButtonFilter
						type='button'
						value='Filtros'
						className='btn btn-dark'
						data-bs-toggle="modal"
						data-bs-target="#staticBackdrop"
					/>

					<Seacher
						/* type = 'text'
						placeholder = 'Buscar por nombre...' */
						className="form-control me-2" type="search" placeholder="Buscar por nombre..."
					/>
				</TableHeader>
				
				<TableBody>					
					<table className="table" style={{ textAlign: 'center' }}>
						<thead>
							<tr style={{ backgroundColor: 'black', color: 'white' }}>
								<th scope="col">id</th>
								<th scope="col">Nombres Y Apellidos</th>
								<th scope="col">Vacuna</th>
								<th scope="col">Dósis Aplicada</th>
								<th scope="col">Fecha De Vacunación</th>
								<th scope="col">Signo Zodiacal</th>
								<th scope="col">Provincia</th>
								<th scope="col">Número De Teléfono</th>
								<th scope="col">Fecha De Nacimiento</th>
							</tr>
						</thead>
						<tbody>

							{registers.map((register, index) => (
								<Row key={index} onClick = {() => deleteRegister(register.id)}>
									<th scope="row">{register.id}</th>
									<td>{register.name + ' ' + register.lastName}</td>
									<td>{register.vaccine.typeVaccine}</td>
									<td>{register.vaccine.appliedVaccines}</td>
									<td>{register.vaccine.vaccinationDate}</td>
									<td>Virgo</td>
									<td>{register.province}</td>
									<td>{register.numberPhone}</td>
									<td>{register.dateOfBirth}</td>
								</Row>
							))}

						</tbody>
					</table>
				</TableBody>

			</TableContainer>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">

						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Filtrar Por</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
							</button>
						</div>

						<div className="modal-body">
							<form onSubmit = {applyFilters}>
								<div className="accordion accordion-flush" id="accordionFlushExample">
									<div className="accordion-item">
										<h2 className="accordion-header" id="flush-headingOne">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
												Provincia
											</button>
										</h2>
										<div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">

											<div className="accordion-body">
												<select value = {provinveFilter} onChange = {(e) => setProvinveFilter(e.target.value)} className="form-select" aria-label="Default select example" >
													<option defaultValue value="santoDomingo">Santo Domingo</option>
													<option value="santiago">Santiago</option>
													<option value="azua">Azua</option>
													<option value="dajabon">Dajabón</option>
													<option value="espaillat">Espaillat</option>
													<option value="laVega">La Vega</option>
													<option value="laRomana">La Romana</option>
												</select>
											</div>

										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="flush-headingTwo">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
												Tipo De Vacuna
											</button>
										</h2>
										<div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">

												<div className="form-check">
													<input className="form-check-input" type="checkbox" onChange = {(e) => handleChangeCheckBox(e)} id="pfizer" />
													<label className="form-check-label" htmlFor="pfizer">
														Pfizer
													</label>
												</div>

												<div className="form-check">
													<input className="form-check-input" type="checkbox" value="moderna" onChange = {(e) => handleChangeCheckBox(e)} id="moderna" />
													<label className="form-check-label" htmlFor="moderna">
														Moderna
													</label>
												</div>

												<div className="form-check">
													<input className="form-check-input" type="checkbox" value="jhonson" onChange = {(e) => handleChangeCheckBox(e)} id="jhonson" />
													<label className="form-check-label" htmlFor="jhonson">
														Jhonson & Jhonson
													</label>
												</div>

											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="flush-headingThree">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
												Signo Zodiacal
											</button>
										</h2>
										<div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
											
											<div className="accordion-body">

											</div>

										</div>
									</div>
								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
									
									<button 
										type="button" 
										className="btn btn-danger" 
										data-bs-dismiss="modal"
										onClick = {cancelFilters}
									>Anular Filtros</button>
									
									<button 
										type="submit" 
										className="btn btn-primary" 
										data-bs-dismiss="modal" 										
									>Aplicar filtros</button>
								</div>

							</form>
						</div>						

					</div>
				</div>
			</div>
		</MainTable>
	)
}

const Row = styled.tr`

	&:hover{
		cursor: pointer;
		font-weight: 'bold';
		opacity: 0.6;
	}
`;

const MainTable = styled.div`
	min-height: 600px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TableContainer = styled.div`
	width: 1250px;
	border-radius: 10px;
	padding: 10px;
	border: 2px solid black;
`;

const TableHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;
	margin-top: 0.5rem;
`;

const TableBody = styled.div`

`;

const ButtonFilter = styled.input`
	/* color: #03256C;
	background-color: white;
	font-weight: bold;
	padding: 5px 20px;
	border: none;
	color: brown;
	border-radius: 10px;
	cursor: pointer; */
`;

const Seacher = styled.input`
	/* border-radius: 10px;
	width: 250px;
	height: 2.3rem;
	padding-left: 10px;
	border: 2px solid blue;
	outline: none;

	&:focus {
		border: 3px solid blue;
	}  */
	width: 250px;
`;