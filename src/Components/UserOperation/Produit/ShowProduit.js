import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProduitsService from '../../../services/AdminService/ProduitsService';
import AppNavbar from '../../PageAccueil/AppNavbar';
import swal from 'sweetalert';


const ShowProduit = () => {

    const [produits, setProduits] = useState([])
    const  username=sessionStorage.getItem("UserName");
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
   
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/produits/username/${username}?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, produits }) => {
            setProduits(produits);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);

    
    const deleteProduit = (produitId) =>{
        ProduitsService.deleteProduit(produitId).then( res => {
            swal("Cette produit est supprimée avec succès");
            this.setState({produits: this.state.produits.filter(produit => produit.produitId!== produitId)});
        });
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
             <div className='main__container' >
              <h2 className = "main__title"> Vos produits </h2>

              {
                    produits.map(
                        produit=>
                        <section className="sujet">
                        <article>
                        <div key = {produit.idPrd}> 
                        <p>Le titre de produit {produit.titre}
                            , le numéro de produit {produit.idPrd}  et le nom de produit {produit.nomPrd} sont crient à {produit.createdAt}
                            <div className="btn btn-outline-primary">{produit.username}</div>
                            <br></br>
                        <Link className="btn btn-info" to={`/edit-produit-user/${produit.idPrd}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteProduit(produit.idPrd)}
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
        </div>
   
    )
}

export default ShowProduit;