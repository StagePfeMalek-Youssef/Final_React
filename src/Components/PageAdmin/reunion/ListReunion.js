import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReunionService from '../../../services/AdminService/ReunionService';
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
        minWidth: 290,
    },
});

const ListReunion = () => {

    const [reunions, setReunion] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/Reunions?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, reunions }) => {
            setReunion(reunions);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);
    
    const deleteReunion = (reunionId) =>{
        ReunionService.deleteReunion(reunionId).then( res => {
            swal("Cette réunion est supprimée avec succès");
            this.setState({reunions: this.state.reunions.filter(reunion => reunion.reunionId!== reunionId)});
        });
    }

    const activeReunion = (sujet) =>{
        swal({
            title: "Êtes-vous sûr ?",
            text: "Voulez-vous à expier ce reunion?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Cette réunion est expiré !", {
                icon: "success",
                
              });
              ReunionService.ActiveReunion(sujet).then( res => {
            });
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
            <h2 className = "main__title"> Tous Les Réunions </h2>
            <Link to = "/add-reunions" className = "btn btn-primary mb-2" > Ajouter Reunion </Link>
            <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.table}>
                                <TableRow className={classes.table}>
                                    <TableCell className={classes.table}><h6>Id Reunion</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Date de Reunion</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Date de déclaration</h6></TableCell>
                                    <TableCell className={classes.thead}><h6>Sujet</h6></TableCell>                            
                                    <TableCell className={classes.action}><h6>Actions </h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    reunions.map(
                                        reunion =>
                                            <TableRow key={reunion.id}>
                                                <TableCell>{reunion.id}</TableCell>
                                                <TableCell>{reunion.datereunion}</TableCell>
                                                <TableCell>{reunion.createdAt}</TableCell>
                                                <TableCell>{reunion.sujet}</TableCell>

                                                <TableCell>
                                                <Link className="btn btn-info" to={`/edit-reunions/${reunion.id}`} >Update</Link>
                                             
                                                <button className={reunion.active===false ? "btn btn-danger" : "btn btn-success"} onClick = {() => activeReunion(reunion.sujet)}
                                                  style = {{marginLeft:"10px"}}> Affiche</button>

                                                <button className = "btn btn-danger" onClick = {() => deleteReunion(reunion.id)}
                                                style = {{marginLeft:"10px"}}> Delete</button>
                                        
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

export default ListReunion;