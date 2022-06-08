import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import SujetService from '../../../services/AdminService/SujetService';
import AppNavbar from '../../PageAccueil/AppNavbar';




const AjouteSujet = () => {

    const [titreSujet, setTitreSujet] = useState('')
    const [message, setMessage] = useState('')
    const history = useHistory();
    const { id } = useParams();


    const saveOrUpdateSujet = (e) => {
        e.preventDefault();
        const username=sessionStorage.getItem("UserName");
        const sujet = { titreSujet, message }
        if (id) {
            SujetService.updateSujet(id,sujet).then((response) => {
                history.push('/SujetShow')
            }).catch(error => {
                console.log(error)
            })

        } else {
                
            SujetService.createSujet(username,sujet).then((response) => {
                sessionStorage.setItem("titresujetsujet",response.data.titreSujet)
                console.log(response.data.titreSujet)
               console.log(response.data)
               
                
                

                
            
                history.push('/SujetShow');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    
  

  

     
    useEffect(() => {

        SujetService.getSujetById(id).then((response) => {
            setTitreSujet(response.data.titreSujet)
            setMessage(response.data.message)
        

        }).catch(error => {
            console.log(error)
        })
    }, [])
    

    const title = () => {

        if (id) {
            return <h2 className="text-center">Update Sujet</h2>
        } else {
            return <h2 className="text-center">Ajouter Sujet</h2>
        }
    }

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
                        <div className="card-form">
                           <form>
                                <div className="form-group mb-2">
                                    <label className='form-label'> Titre de Sujet :</label>
                                    <input
                                        type="text"
                                        name="titreSujet"
                                        className="form-control"
                                        value={titreSujet}
                                        onChange={(e) => setTitreSujet(e.target.value)}
                                    >
                                    </input>
                                </div>

                               
                                <div className="form-group mb-2">
                                        <label className='form-label'> Message </label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}>
                                        </textarea>
                                </div>
                               
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateSujet(e)} >Envoyer </button>
                                <Link to="/SujetShow" className="btn btn-secondary" style = {{marginLeft:"10px"}}> Annuler </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default AjouteSujet;