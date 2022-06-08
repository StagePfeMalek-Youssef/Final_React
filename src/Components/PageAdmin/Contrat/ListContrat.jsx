import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './listContrat.css';
import './UploadFilesContrat';
import ContratService from '../../../services/AdminService/ContratService';
import UploadFilesContrat from './UploadFilesContrat';
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
        minWidth: 100,
    },
    action: {
        minWidth: 200,
    },
});

const ListContrat = () => {
    const [contrats, setContrats] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/contrats?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, contrats }) => {
            setContrats(contrats);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);

 


    const deleteContrat = (contratId) => {
        ContratService.deleteContrat(contratId).then(res => {
            swal("Cette contrat est supprimée avec succès");
            this.setState({ contrats: this.state.contrats.filter(contrat => contrat.contratId !== contratId) });
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
            <h2 className="main__title"> Tous Les Contrats </h2>
            <UploadFilesContrat />
            <Link to="/add-contrat" className="btn btn-primary mb-2" > Ajouter Contrat </Link>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.table}>
                        <TableRow className={classes.table}>
                            <TableCell className={classes.table}><h6> Id contrat </h6></TableCell>
                            <TableCell className={classes.thead}><h6> Numéro de police</h6></TableCell>
                            <TableCell className={classes.thead}><h6> Date de l'effet </h6></TableCell>
                            <TableCell className={classes.thead}><h6> Date fin de l'effet </h6></TableCell>
                            <TableCell className={classes.thead}><h6>Type de contrat </h6></TableCell>
                            <TableCell className={classes.thead}><h6>Etat </h6></TableCell>
                            <TableCell className={classes.thead}><h6> Date de l'ajout </h6></TableCell>
                            <TableCell className={classes.action}><h6> Actions </h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            contrats.map(
                                    
                                contrat =>
                                    <TableRow key={contrat.idC}>
                                        <TableCell> {contrat.idC} </TableCell>
                                        <TableCell> {contrat.numPolice} </TableCell>
                                        <TableCell>{contrat.dateEffet}</TableCell>
                                        <TableCell>{contrat.dateFinEffet}</TableCell>
                                        <TableCell>{contrat.type}</TableCell>
                                        <TableCell>{contrat.etat}</TableCell>
                                        <TableCell>{contrat.creation}</TableCell>

                                        <TableCell>
                                            <Link className="btn btn-info" to={`/edit-contrat/${contrat.idC}`} >Update</Link>
                                            <button className="btn btn-danger" onClick={() => deleteContrat(contrat.idC)}
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

export default ListContrat;