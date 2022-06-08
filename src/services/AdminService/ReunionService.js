import axios from 'axios'

const REUNION_BASE_REST_API_URL = 'http://localhost:8080/api/v1/Reunions';

class ReunionService{

    getAllReunions(){
        return axios.get(REUNION_BASE_REST_API_URL)
    }

    getByActive(){
        return axios.get(REUNION_BASE_REST_API_URL+"/active")
    }
    ActiveReunion(sujet){
        return axios.get(REUNION_BASE_REST_API_URL+"/activeReunion/"+sujet)
    }


    createReunion(reunion){
        return axios.post(REUNION_BASE_REST_API_URL+"/create", reunion)
    }

    getReunionById(reunionId){
        return axios.get(REUNION_BASE_REST_API_URL + '/' + reunionId);
    }

    updateReunion(reunionId, reunion){
        return axios.put(REUNION_BASE_REST_API_URL + '/' +reunionId, reunion);
    }

    deleteReunion(reunionId){
        return axios.delete(REUNION_BASE_REST_API_URL + '/' + reunionId);
    }
}

export default new ReunionService();