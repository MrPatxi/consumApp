import React from 'react';
import URL from '../utils/apiUrl';

const Candidate = ({id, name, cargo, contratar, getAllCandidates }) => {
    
    // DELETE, y actualizamos el listado de candidatos
    const deleteCandidate = async candidateId => {
        try
        {
            const data = fetch(URL + id, {
                method: 'DELETE'
            });
            
            getAllCandidates();
        } catch(e) {
            console.log(e.message)
        }
    };

    return (
        <div className={`candidate_${id}`}>
            
            <input type="text" name='id' value={id} />
            <input type="text" name='name' value={name} />
            <input type="text" name='cargo' value={cargo} />
            <input type="text" name='contratar' value={contratar} />

            <button onClick={(e) => deleteCandidate({id})}>Delete</button>
        </div>
    )
}

export default Candidate;