import React, { useRef, useState } from 'react';
import shortid from 'shortid';
import URL from '../utils/apiUrl'

const Form = ({candidate, setCandidate}) => {

    const [error, setError] = useState(false);

    const blankRefName = useRef();
    const blankRefCargo = useRef();
    const blankRefContratar = useRef();

    const cand = {
        id: shortid.generate(),
        name: "",
        cargo: "",
        contratar: ""
    }

    // POST, comprobamos que ningún campo sea vacío para crear el nuevo candidato
    const createCandidate = candidate => {
        try
        {
            if (candidate.name !== '' && candidate.id !== '' && candidate.cargo !== '' && candidate.contratar) {
                const data = fetch(URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(candidate)
                });
            } else {
                setError(true);
            } 
        } catch(e) {
            console.log(e.message)
        }
    };

    // Gestionamos el cambio de los inputs, para que se guarde la información en el estado
    const handleChange = e => {

        setCandidate({
            ...candidate, // Hacemos una copia del state
            id :shortid.generate(), // Generamos un id aleatorio
            [ e.target.name ] : e.target.value
        }) ;
    }

    // Creamos el usuario y restablecemos los campos
    const onHandleSubmit = e => {
        e.preventDefault();

        setCandidate(cand);

        setError(false);
        createCandidate(candidate);

        blankRefName.current.value = '';
        blankRefCargo.current.value = '';
        blankRefContratar.current.value = '';
    }

    return (
        <> 
            <form onSubmit={onHandleSubmit}>
                <br />
                <div className='formInputs'>
                    <div className='name'>
                        <label htmlFor="">Nombre</label>
                        <input
                            type="text"
                            name='name'
                            onChange={handleChange}
                            placeholder="Type name"
                            ref={blankRefName}
                        />
                    </div>
                    
                    <div className='position'>
                        <label htmlFor="">Cargo</label>
                        <input
                            type="text"
                            name='cargo'
                            onChange={handleChange}
                            placeholder="Type position"
                            ref={blankRefCargo}
                        />
                    </div>

                    <div className='contract'>
                        <label htmlFor="">Contratar</label>
                        <input
                            type="text"
                            name='contratar'
                            onChange={handleChange}
                            placeholder="Type contract"
                            ref={blankRefContratar}
                        />
                    </div> 
                    </div>
                    
                    <input
                        value="Crear"
                        type="submit"
                    />

                    <br />
                    {error ? "debes introducir datos para crear un candidato" : ""}
            </form>
        </>
    )
}

export default Form;