import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SuggestionService from '../../../services/AdminService/SuggestionService';
import AppNavbar from '../../PageAccueil/AppNavbar';
import swal from 'sweetalert';


const ShowSuggestionUser = () => {

    const [suggestions, setSuggestion] = useState([])
    const username=sessionStorage.getItem("UserName");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8080/Api/Suggestion/username/${username}?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, suggestions }) => {
            setSuggestion(suggestions);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);



    const deleteSuggestion = (suggestionId) =>{
        SuggestionService.deleteSuggestion(suggestionId).then( res => {
            swal("Cette suggestion est supprimée avec succès");
            this.setState({suggestions: this.state.suggestions.filter(suggestion => suggestion.suggestionId!== suggestionId)});
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
            <h2 className = "main__title"> Vos suggestions </h2>
            
          
                    {
                        suggestions.map(
                            suggestion=>
                            <section className="sujet">
                            <article>
                            <div key = {suggestion.id}> 
                            <p> La suggestion est créé à {suggestion.dateDeclaration} par <div className="btn btn-outline-primary">{suggestion.username}</div> </p><br></br>
                            <p> Avec le message suivant : {suggestion.message} </p>
                            <p>             
                
                      <button className = "btn btn-danger" onClick = {() =>deleteSuggestion(suggestion.id)}
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

export default ShowSuggestionUser;