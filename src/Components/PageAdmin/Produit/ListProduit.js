import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProduitsService from '../../../services/AdminService/ProduitsService';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UploadFilesProduit from './UploadFilesProduit';
import swal from 'sweetalert';


const useStyles = makeStyles({
    table: {
        minWidth: 95,
    },
    thead: {
        minWidth: 95,
    },
    action: {
        minWidth: 150,
    },
});


const ListProduit = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [produits, setProduits] = useState([])
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
   
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/produits?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, produits }) => {
            setProduits(produits);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);

    const deleteProduit = (produitId) => {
        ProduitsService.deleteProduit(produitId).then(res => {
            swal("Cette produit est supprimée avec succès");
            this.setState({ produits: this.state.produits.filter(produit => produit.produitId !== produitId) });
        });
    }

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };




    const classes = useStyles();
    return (
        <div>
            <produit >
                <div className='' >
                    <h2 className="main__title"> Tous Les Produits </h2>
                    <UploadFilesProduit />
                    <Link to="/add-produit" className="btn btn-primary mb-2" > Ajouter Produit </Link>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.table}>
                                <TableRow className={classes.table}>
                                    <TableCell className={classes.table}><h6>Numéro de produit</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Nom de produit </h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Catégorie </h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Titre</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Déscription courte</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Déscription longue</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Date de l'ajout</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Mise à jour</h6></TableCell>
                                    <TableCell className={classes.action}><h6>Actions </h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    produits.map(
                                        produit =>
                                            <TableRow key={produit.idPrd}>
                                                <TableCell>{produit.idPrd}</TableCell>
                                                <TableCell>{produit.nomPrd}</TableCell>
                                                <TableCell>{produit.categorie}</TableCell>
                                                <TableCell>{produit.titre}</TableCell>
                                                <TableCell>{produit.descCourte}</TableCell>
                                                <TableCell>{produit.descLong}</TableCell>
                                                <TableCell>{produit.createdAt}</TableCell>
                                                <TableCell>{produit.updatedAt}</TableCell>

                                                <TableCell>
                                                    <Link className="btn btn-info" to={`/edit-produit/${produit.idPrd}`} >Update</Link>
                                                    <button className="btn btn-danger" onClick={() => deleteProduit(produit.idPrd)}
                                                      > Delete</button>
                                                </TableCell>
                                            </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </produit>
         
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

export default ListProduit;