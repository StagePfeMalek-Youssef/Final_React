import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import SujetService from '../../../services/AdminService/SujetService';
import AppNavbar from '../../PageAccueil/AppNavbar';
import "./Sujet.css"

const SujetShow = () => {



    const [sujets, setSujets] = useState([])
    const username=sessionStorage.getItem("UserName");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8080/Api/Sujet/username/${username}?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, sujets }) => {
            setSujets(sujets);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);
    
   
    const deleteSujet = (sujetId) =>{
      
        SujetService.deleteSujet({sujets: this.state.sujet.filter(sujet => sujet.sujetId!== sujetId)});
        
    }
    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };

    return (
        
        
   <div>
      <AppNavbar/> 
        <div className='main__container'>
            <h2 className = "main__title"> Page de discussion </h2>
            La MAE Assurance offre un espace de discussion ici
            <br/> 
            <Link to = "/AjouteSujet" className = "btn btn-info mb-2" > Ajouter un sujet </Link>
        </div>

       
       
       
  
       
        {
         
         sujets.map(
             sujet =>
             <section className="sujet">
             <article>
             
             <div key = {sujet.idSu}> 
                 <p> Le sujet {sujet.titreSujet} est créé par <div className="btn btn-outline-primary">{sujet.username} </div> à {sujet.createdAt} </p><br></br>
                 <p> {sujet.message} </p>
       

                 <p>             
                  <Link className="btn btn-info" to={`/ViewSujet/${sujet.idSu}`} >Lire la publication</Link>

                 </p>
             </div>
             </article>
           </section>
         )
     }
             
             <button onClick={gotoPrevious}>Précédent</button>
              {pages.map((pageIndex) => (
             <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
             {pageIndex + 1}
             </button>
                         ))}
            <button onClick={gotoNext}>Suivant</button>


       
        

   </div>

           

        
    )
}

export default SujetShow;