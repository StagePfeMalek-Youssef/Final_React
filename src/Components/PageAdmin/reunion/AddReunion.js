import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import ReunionService from '../../../services/AdminService/ReunionService';
const AddReunion = () => {
    const [datereunion, setDatereunion] = useState('')
    const [sujet, setSujet] = useState('')
    const history = useHistory();
    const { id } = useParams();


    const saveOrUpdateReunion = (e) => {
        e.preventDefault();  
        
        const reunion = { datereunion,sujet }
        const username=sessionStorage.getItem("UserName");
        if (id) {
            ReunionService.updateReunion(id,reunion).then((response) => {
                console.log(response.data)
                history.push('/Reunions')
            }).catch(error => {
                console.log(error)
            })

        } else {
            ReunionService.createReunion(reunion).then((response) => {
         swal("La date de la réunion va être envoyée à tous les adhérents de la MAE par un email");
            sessionStorage.setItem("sujet",response.data.sujet);
                console.log(response.data.type)
                console.log(response.data)

                history.push('/Reunions');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        ReunionService.getReunionById(id).then((response) => {
            setDatereunion(response.data.datereunion)
            setSujet(response.data.sujet)
  

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if (id) {
            return <h2 className="text-center" color='red'>Update Reunion</h2>
        } else {
            return <h2 className="text-center" color='red'>Ajouter Reunion</h2>
        }
    }

    return (
        
            <div className="wrapper">
                <div className="title">
                   
                        {
                            title()
                        }
                        <div className="form">


                                <div className="inputfield">
                                    <label> déclarer la date </label>
                                    <input
                                        id='datereunion'
                                        type="datetime-local"
                                        name="datereunion"
                                        className="datereunion"
                                        value={datereunion}
                                        onChange={(e) => setDatereunion(e.target.value)}
                                    />
                                   
                                </div>

                                <div className="inputfield">
                                    <label> déclarer le sujet </label>
                                    <input
                          
                                    type="text"
                                        name="sujet"
                                        className="sujet"
                                        value={sujet}
                                        onChange={(e) => setSujet(e.target.value)}
                                    />
                                   
                                </div>


                                
                                
                                    
                                

                                </div>
                                
                              <div className='inputfield'>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateReunion(e)} >Envoyer </button>
                                <Link to="/Reunions" className="btn btn-secondary" style = {{marginLeft:"10px"}}> Annuler </Link>
                                </div>

                        </div>
               </div>

    )
}

export default AddReunion