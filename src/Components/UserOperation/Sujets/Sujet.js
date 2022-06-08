import React, { Component, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentaireService from '../../../services/AdminService/CommentaireService'
import SujetService from '../../../services/AdminService/SujetService'
import AppNavbar from '../../PageAccueil/AppNavbar'
import AjouteCommentaire from './AjouteCommentaire'
import {useState} from 'react';
import ShowComment from './ShowComment '
import "./Sujet.css"
import swal from 'sweetalert'

const Sujet  = () => {

    const [Sujet, setSujet] = useState([])
    const { id } = useParams();
        useEffect(() => {

        getById();

    }, [])

    const getById = () => {
        SujetService.getSujetById(id).then((response) => {
    
            setSujet(response.data)
                console.log(response.data);
                sessionStorage.setItem("titrecomment",response.data.titreSujet)
                sessionStorage.setItem("usercomment",response.data.username)
                console.log(response.data.titreSujet);
                console.log(response.data.username);
            
        }).catch(error =>{
            console.log(error);
        })
        
    }
    const deleteSujet = (sujetId) =>{
        SujetService.deleteSujet(sujetId).then( res => {
          swal("Cette sujet  est supprimée avec succès");
            this.setState({sujets: this.state.sujets.filter(sujet => sujet.sujetId!== sujetId)});
        });
    }

    return (
        
     
   <div>
       <AppNavbar/>
             <section class="articles">
            <article>
            <label><h5> Le titre de sujet : </h5></label> { Sujet.titreSujet } 
            
             <div className = "row">
                            <label><h5> Le message : </h5></label>
                            <div> { Sujet.message } </div>
             </div>
             <Link className="btn btn-info" to={`/edit-sujetuser/${Sujet.idSu}`} >Update</Link>
                     <button className = "btn btn-danger" onClick = {() => deleteSujet(Sujet.idSu)}
                     style = {{marginLeft:"10px"}}> Delete</button>
             <AjouteCommentaire/>
            </article>
            </section>
       <ShowComment />
     </div>

        
    )
}

export default Sujet ;