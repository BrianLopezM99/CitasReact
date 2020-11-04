import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
const Formulario = ({crearCita}) => {

    //crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada vez que se escribe en el input

    const actualizarState = (e) =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value  
        })
        console.log(e.target.name)
    }

    //extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando el usuario presiona el boton de agregar cita

    const submitCita = (e) =>{
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
        || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true)
            return;
        }

        //eliminar mensaje previo
        actualizarError(false);
        //asignar ID
        cita.id = uuid();
        console.log(cita);

        //Crear cita
        crearCita(cita);
        //reiniciar form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
            onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Dueño"
                onChange={actualizarState}
                value={propietario}
                />
                <label>Fecha</label>
                <input 
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
                />
                <label>Hora</label>
                <input 
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
                />
                <label>Sintomas</label>
                <textarea
                className="u-full-width"
                name="sintomas"
                value={sintomas}
                onChange={actualizarState}
                placeholder="¿Que sintomas presenta la mascota?"
                ></textarea>
                <button
                type="submit"
                className="u-full-width button-primary"
                >
                    Agregar cita
                </button>
            </form>
        </Fragment>
     );
}
 
export default Formulario;