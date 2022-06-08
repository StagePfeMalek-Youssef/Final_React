import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminUserService from '../../../services/AdminService/AdminUserService';
import { BsFilePdfFill } from "react-icons/bs";
import { FaFileCsv } from "react-icons/fa";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import swal from 'sweetalert';
const ListUser = () => {

    const [users, setUsers] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        fetch(`http://localhost:8080/api/auth/admin/user?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, users }) => {
            setUsers(users);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);
      
    
    const deleteUser = (userId) =>{
        AdminUserService.deleteUser(userId).then( res => {
            swal("Cette utilisateur  est supprimée avec succès");
            this.setState({users: this.state.users.filter(user => user.id!== userId)});
        });
    }


    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };


    return (
        <div className='main__container'>

            <h2 className = "main__title"> Tous Les utulisateur </h2>
            <a href='http://localhost:8080/api/auth/admin/export'><FaFileCsv size={50}/></a>
            <a href='http://localhost:8080/api/auth/admin/users/export/pdf'><BsFilePdfFill size={50}/></a>
            <a href='http://localhost:8080/api/auth/admin/users/export/excel'><BsFileEarmarkExcelFill size={50}/></a>
            

            <br></br>
    
                                   
            <Link to = "/add-user" className = "btn btn-primary mb-2" > Ajouter Contrat </Link>
            <table>
            <thead>
                            <th className='th1'> ID</th>
                            <th className='th1'> Prenom </th>
                            <th className='th1'> Nom</th>
                            <th className='th1'> Username</th>
                            <th className='th1'> Date naissance</th>
                            <th className='th1'> Code postal </th>
                            <th className='th1'> Telephone </th>
                            <th className='th1'> Ville </th>
                            <th className='th1'> Date d'ajout</th>
                            <th className='th1'> CIN</th>
                            <th className='th1'> Email</th>
                            <th className='th1'> Password</th>
                            <th> action</th>
                </thead>
                <tbody>
                    {
                        users.map(
                            user =>
                            <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.prenom}</td>
                            <td>{user.nom}</td>
                            <td>{user.username}</td>
                            <td>{user.datenaissance}</td>
                            <td>{user.codepostal}</td>
                            <td>{user.telephone}</td>
                            <td>{user.ville}</td>
                            <td>{user.dateajout}</td>
                            <td>{user.cin}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-user/${user.id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteUser(user.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
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

export default ListUser;