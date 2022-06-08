import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import ReclamationService from '../../../services/AdminService/ReclamationService';
import AppNavbar from '../../PageAccueil/AppNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddSujet = () => {

    const [numDec, setNumDec] = useState('')
    const [message, setMessage] = useState('')
    const [objet, setObjet] = useState('')
    const history = useHistory();
    const { id } = useParams();
    
    const saveOrUpdateReclamation = (e) => {
        e.preventDefault();
       
        const reclamation = { numDec, message, objet }
        const username=sessionStorage.getItem("UserName");
       
        if (id) {
            ReclamationService.updateRecmlamation(id, reclamation).then((response) => {
                console.log(response.data)
                history.push('/lesreclamations')
                
                ToastContainer.info('Reclamation ajouter avec succes .')
            }).catch(error => {
                console.log(error)
            })

        } else {
            ReclamationService.createReclamation(username,reclamation).then((response) => {
            
                console.log(response.data.type)
                console.log(response.data)
                history.push('/lesreclamations');                 
                ToastContainer.info('Reclamation ajouter avec succes .')

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        ReclamationService.getRecmlamationById(id).then((response) => {
            setNumDec(response.data.numDec)
            setMessage(response.data.message)
            setObjet(response.data.objet)
          

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if (id) {
            return <h2 className="text-center" color='red'>Update Votre Réclamation</h2>
        } else {
            return <h2 className="text-center" color='red'>Déclarer Votre Réclamation</h2>
        }
    }
    const notify = () => toast("Wow so easy!");
    return (
        <div>
            <AppNavbar/>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                            <div className="form-group mb-2">
                                    <label className="form-label"> L'objet De Réclamation : </label>
                                    <select value={objet} onChange={(e) => setObjet(e.target.value)} className='form-control'>
                                        <option value="---Sélectionner---" disabled>---Sélectionner---</option>
                                        <option value="Agence">Agence</option>
                                        <option value="Service">Service</option>
                                        <option value="Panne Technique">Panne technique</option>
                                    </select>  

                            </div>
                            <div className="form-group mb-2">
                                        <label className="form-label"> Ecrire un message :</label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                
                                
                               
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateReclamation(e)} >Envoyer </button>
                                <Link to="/user" className="btn btn-secondary" style = {{marginLeft:"10px"}}> Annuler </Link>
                               <ToastContainer />
                            </form>

                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    )
}

export default AddSujet;