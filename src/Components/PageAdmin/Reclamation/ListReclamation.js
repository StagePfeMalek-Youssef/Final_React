import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListReclamation.css';
import ReclamationService from '../../../services/AdminService/ReclamationService';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';

const useStyles = makeStyles({
    table: {
        minWidth: 95,
    },
    thead: {
        minWidth: 135,
    },
    action: {
        minWidth: 200,
    },
});

const ListReclamation = () => {

    const [reclamations, setReclamation] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        fetch(`http://localhost:8080/Api/Reclamation?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, reclamations }) => {
            setReclamation(reclamations);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);


    const deleteReclamation = (reclamationId) => {
        ReclamationService.deleteReclamation(reclamationId).then(res => {
            swal("Cette réclamation est supprimée avec succès");
            this.setState({ reclamations: this.state.reclamations.filter(reclamation => reclamation.reclamationId !== reclamationId) });
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
            <h2 className="main__title"> Toutes Les Reclamations </h2>
            <Link to="/add-reclamation" className="btn btn-primary mb-2" > Ajouter Reclamation </Link>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.table}>
                        <TableRow className={classes.table}>
                            <TableCell className={classes.table}><h6>Numéro De Déclaration </h6></TableCell>
                            <TableCell className={classes.thead}><h6>Message </h6></TableCell>
                            <TableCell className={classes.thead}><h6>Objet </h6></TableCell>
                            <TableCell className={classes.action}><h6> Actions </h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            reclamations.map(
                                reclamation =>
                                    <TableRow key={reclamation.id_R}>
                                        <TableCell> {reclamation.id_R} </TableCell>
                                        <TableCell> {reclamation.message}  </TableCell>
                                        <TableCell>{reclamation.objet} </TableCell>
                                        <TableCell>
                                            <Link className="btn btn-info" to={`/edit-reclamation/${reclamation.id_R}`} >Update</Link>
                                            <button className="btn btn-danger" onClick={() => deleteReclamation(reclamation.id_R)}
                                                style={{ marginLeft: "10px" }}> Delete</button>
                                        </TableCell>
                                    </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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

export default ListReclamation;