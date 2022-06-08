import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SujetService from '../../../services/AdminService/SujetService';
import { MotsSujet } from './MotsSujet';

const useStyles = makeStyles({
    table: {
      minWidth: 95,
    },
    thead:{
        minWidth:135,
    },
    action:{
        minWidth:290,
    },
  });


const Listsujet = () => {

    const [sujets, setSujets] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8080/Api/Sujet?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, sujets }) => {
            setSujets(sujets);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);
    
    const deleteSujet = (sujetId) =>{
        SujetService.deleteSujet(sujetId).then( res => {
            this.setState({sujets: this.state.sujets.filter(sujet => sujet.sujetId!== sujetId)});
        });
    }
    
    const activeSujet = (sujetId) =>{
        SujetService.active(sujetId).then( res => {
        })
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
            <h2 className = "main__title"> Tous Les Sujets </h2>
            
            <Link to = "/add-sujet" className = "btn btn-primary mb-2" > Ajouter un sujet </Link>
            
            <TableContainer component={Paper}>
               <Table className={classes.table} aria-label="simple table"> 
                <TableHead className={classes.table}>
                    <TableRow className={classes.table}>
                    <TableCell className={classes.table}><h6> Id sujet </h6></TableCell>
                    <TableCell className={classes.thead}><h6>Titre de sujet</h6></TableCell>
                    <TableCell className={classes.thead}><h6> Message </h6> </TableCell>
                    <TableCell className={classes.action}><h6> Actions </h6></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sujets.map(
                            sujet =>
                            <TableRow key = {sujet.idSu}> 
                                <TableCell> {sujet.idSu} </TableCell>
                                <TableCell> {sujet.titreSujet} </TableCell>
                                <TableCell> {sujet.message} </TableCell>
                      

                                <TableCell>
                                    <Link className="btn btn-info" to={`/edit-sujet/${sujet.idSu}`} >Update</Link>
                                
                                
                                  <button className={sujet.active===false ? "btn btn-warning" : "btn btn-success"} onClick = {() => activeSujet(sujet.idSu)}
                                  style = {{marginLeft:"10px"}}> Accept</button>
                                
                                    <button className = "btn btn-danger" onClick = {() => deleteSujet(sujet.idSu)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <MotsSujet/>
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

export default Listsujet;