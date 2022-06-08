import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReclamationService from '../../../services/AdminService/ReclamationService';
import AppNavbar from '../../PageAccueil/AppNavbar';
import swal from 'sweetalert';

const ShowReclamation = () => {

    const [reclamations, setReclamation] = useState([])
    const username=sessionStorage.getItem("UserName");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8080/Api/Reclamation/username/${username}?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, reclamations }) => {
            setReclamation(reclamations);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);

    
    const deleteReclamation = (reclamationId) =>{
        ReclamationService.deleteReclamation(reclamationId).then( res => {
          swal("Cette réclamation est supprimée avec succès");
            this.setState({reclamations: this.state.reclamations.filter(reclamation => reclamation.reclamationId!== reclamationId)});
        });
    }

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };


    return (
        <>
        <AppNavbar/>
        <div className='main__container'>
            <h2 className = "main__title"> Vos réclamations </h2>
            
          
            {
                        reclamations.map(
                            reclamation=>
                            <section className="sujet">
                            <article>
                            <div key = {reclamation.id_R}> 
                            <p> La réclamation est criée  {reclamation.dateDeclaration} par <div className="btn btn-outline-primary">{reclamation.username}</div> </p><br></br>
                            <p> Le message : {reclamation.message}</p>
                            <p> Le numéro de réclamation : {reclamation.id_R}
                            </p>
                            <p>             
                            <Link className="btn btn-info" to={`/edit-reclamation-user/${reclamation.id_R}`} >Update</Link>
                      <button className = "btn btn-danger" onClick = {() =>deleteReclamation(reclamation.id_R)}
                      style = {{marginLeft:"10px"}}> Delete</button>
 
                  </p>
                            </div>
                            </article></section>
                        )
                    }
    </div>
    <button onClick={gotoPrevious}>Précédent</button>
              {pages.map((pageIndex) => (
             <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
             {pageIndex + 1}
             </button>
                         ))}
            <button onClick={gotoNext}>Suivant</button>
    </>
    )
}

export default ShowReclamation;