import { useState } from "react";
import URL from '../utils/apiUrl';

const useCandidate = (init) => {

    const [candidates, setCandidates] = useState(init);

    const getAllCandidates = () => {
        fetch(URL)
        .then(response => response.json())
        .then(response => {
            setCandidates(response);
        });
    }
    return [candidates, getAllCandidates];
}

export default useCandidate;