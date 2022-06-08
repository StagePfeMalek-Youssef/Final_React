import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SinistreService from '../../../services/AdminService/SinistreService'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../PageAccueil/AppNavbar';
import swal from 'sweetalert';
const ShowSinistre = () => {

    const [sinistres, setSinistres] = useState([])
    const username=sessionStorage.getItem("UserName");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/sinistres/username/${username}?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, sinistres }) => {
            setSinistres(sinistres);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);


    
    const deleteSinistre = (sinistreId) =>{
        SinistreService.deleteSinistre(sinistreId).then( res => {
            swal("Cette sinsitre est supprimée avec succès");
            this.setState({sinistres: this.state.sinistres.filter(sinistre => sinistre.sinistreId!== sinistreId)});
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
        <h2 className = "main__title"> Vos sinistres </h2>
        
      
                {
                    sinistres.map(
                        sinistre=>
                        <section className="sujet">
                        <article>
                        <div key = {sinistre.idS}> 
                        <p> Le sinistre est créé à {sinistre.dateDeclaration} par <div className="btn btn-outline-primary">{sinistre.username}</div> </p><br></br>
                        <p> Avec l'état : {sinistre.etat} </p>
                         Et l'image : 
                        <img src={"data:image/jpeg;base64," + sinistre.image} />
                        <p>             
                        <Link className="btn btn-info" to={`/edit-sinistre-user/${sinistre.idS}`} >Update</Link>
                  <button className = "btn btn-danger" onClick = {() =>deleteSinistre(sinistre.idS)}
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

export default ShowSinistre;