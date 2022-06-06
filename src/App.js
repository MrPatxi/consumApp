import React, { useState, useEffect, useRef } from 'react';
import Candidate from './components/Candidate';
import Form from './components/Form';
import useCandidate from './hooks/useCandidates';
import URL from './utils/apiUrl';
import './scss/main.scss'

function App() {

  const [candidate, setCandidate] = useState({});
  const [candidateData, setCandidateData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [candidates, getAllCandidates] = useCandidate([]);

  // Cada vez que un candidato cambie, obtenemos la lista completa
  useEffect(() => {
    getAllCandidates()
  }, [candidate])

  // GET Obtenemos el candidato
  const getCandidate = async candidateId => {
    try
    {

        fetch(URL + candidateId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            
        }).then(response => response.json())
        .then(response => {

            if (response.id !== undefined) {
              setCandidateData(response);
              setDisabled(true);
            } else {
              resetInputs();
            }
        });  
    } catch(e) {
        console.log(e.message)
    }
  };
  
  // PATCH, actualizamos los datos
  const updateCandidate = async candidateId => {
    try
    {
        fetch(URL + candidateId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(candidateData)
        });
        getAllCandidates()
    } catch(e) {
        console.log(e.message)
    }
  };

  // Guardamos los nuevos datos en el usuario
  const onhandleSubmit = e => {
    e.preventDefault();

    resetInputs();
    updateCandidate(candidateData.id);
  };

  const resetInputs = () => {
    setDisabled(false);
    setCandidateData({ id: '', name: '', cargo: '', contratar: ''});
  }

  // Cuando introducimos un id en el id de edición, obtenemos el usuario y referenciamos los datos
  const onChangeId = async e => {
    e.preventDefault();

    setDisabled(true);
    
    getCandidate(e.target.value);

  };

  const handleChange = e => {
    e.preventDefault();
      setCandidateData({
        ...candidateData, // hacemos una copia del state
        [ e.target.name ] : e.target.value
      });
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='header'>
          <h1>Candidatos Consum</h1>
        </div>

        <div className='form'>
          <Form 
            candidates={candidates}
            candidate={candidate}
            setCandidate={setCandidate}
          />
        </div>

        <div className='editCandidate'>
          <form onSubmit={ onhandleSubmit}>
            <label>Editar usuario</label>
            <br />
            <input type="text" placeholder='Pega un Identificador' name='id' disabled = {(disabled)? "disabled" : ""} value={candidateData.id} onChange={onChangeId} />
            <input type="text" name='name'  onChange={handleChange} value={candidateData.name} />
            <input type="text" name='cargo' onChange={handleChange} value={candidateData.cargo} />
            <input type="text" name='contratar' onChange={handleChange} value={candidateData.contratar} />
            <input type='submit' value='Editar' />
          </form>
        </div>

        <div className='candidates'>
          <div className='candidateHeader'>
            <label type="text" value='Id'>Id</label>
            <label type="text" value='Name'>Name</label>
            <label type="text" value='Position'>Position</label>
            <label type="text" value='Contract'>Contract</label>
          </div>
          <hr />
        
          {candidates ?
            candidates.map(candidate => (
              <Candidate
                key={candidate.id}
                id={candidate.id}
                name={candidate.name}
                cargo={candidate.cargo}
                contratar={candidate.contratar}
                getAllCandidates={getAllCandidates}
              />
            ))
            : null
          }
        </div>

        <footer>
          <p>©MrPatxi</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
