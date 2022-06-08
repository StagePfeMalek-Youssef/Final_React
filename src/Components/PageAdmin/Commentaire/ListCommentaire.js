import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListCommentaire.css';
import CommentaireService from '../../../services/AdminService/CommentaireService';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MotCommentaire } from './MotCommentaire';
import swal from 'sweetalert';

const useStyles = makeStyles({
    table: {
        minWidth: 80,
    },
    thead: {
        minWidth: 135,
    },
    action: {
        minWidth: 290,
    },
});

const ListCommentaire = () => {

    const [commentaires, setCommentaire] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        fetch(`http://localhost:8080/Api/Commentaire?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, commentaires }) => {
            setCommentaire(commentaires);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);


    const deleteCommentaire = (commentaireId) => {
        CommentaireService.deleteCommentaire(commentaireId).then(res => {
            swal("Cette commentaire est supprimée avec succès");
            this.setState({ commentaires: this.state.commentaire.filter(commentaire => commentaire.commentaireId !== commentaireId) });
        });
    }

    const activeCommentaire = (commentaireId) => {

        swal({
            title: "Êtes-vous sûr ?",
            text: "Voulez-vous à afficher ce commentaire?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("La commentaire est affichée!", {
                icon: "success",
                
              });
              CommentaireService.active(commentaireId).then(res => {
            })
            } else {
              swal("operation annuler !");
            }
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
        <div className='main__container'>
            <h2 className="main__title"> Tous les commentaires </h2>
            <Link to="/add-commantaire" className="btn btn-primary mb-2" > Ajouter un commentaire </Link>
            
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.table}>
                        <TableRow className={classes.table}>
                            <TableCell className={classes.table}><h6> Id commentaire </h6></TableCell>
                            <TableCell className={classes.thead}><h6> Message </h6></TableCell>
                            <TableCell className={classes.thead}><h6> Titre de sujet </h6></TableCell>
                            <TableCell className={classes.action}><h6>Actions </h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            commentaires.map(
                                commentaire =>
                                    <TableRow key={commentaire.id}>
                                        <TableCell>{commentaire.id} </TableCell>
                                        <TableCell>{commentaire.message} </TableCell>
                                        <TableCell>{commentaire.titresujet}</TableCell>

                                        <TableCell>
                                            <Link className="btn btn-info" to={`/edit-reclamation/${commentaire.id}`} >Update</Link>


                                            <button className={commentaire.active === false ? "btn btn-warning" : "btn btn-success"} onClick={() => activeCommentaire(commentaire.id)}
                                                style={{ marginLeft: "10px" }}> Accept</button>


                                            <button className="btn btn-danger" onClick={() => deleteCommentaire(commentaire.id)}
                                                style={{ marginLeft: "10px" }}> Delete</button>
                                        </TableCell>
                                    </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <MotCommentaire/>
            <br></br>
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

export default ListCommentaire;