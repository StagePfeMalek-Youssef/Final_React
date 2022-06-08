import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import SujetService from '../../../services/AdminService/SujetService';

export const MotsSujet = () => {
    const history = useHistory();
    const [mot, setMot] = useState();
    const formData = new FormData();
    formData.append("mots",mot)
    const Ajoutedesmots = (e) => {
        e.preventDefault();

                
        SujetService.AjoutsMots(formData).then((response) => {
          swal("","Le mot est ajouté avec succès", "success");
                console.log(response.data)

                history.push('/ListeSujet');

          
        })

    }

  return (
    <div>
        <input  
        type="mot"
        name="mot"
        className="input" 
        value={mot} 
        onChange={(e) => setMot(e.target.value)}/>
        <button className="btn btn-success" onClick={(e) => Ajoutedesmots(e)} >Envoyer </button>
    </div>
  )
}
