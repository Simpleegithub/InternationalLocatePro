import { useEffect } from "react"
import { UseAuth } from "../Contexts/FakeAuthContext"
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

function ProtectedRoute({children}) {
    const {isAuthenticated}=UseAuth();
    const navigate=useNavigate();

    useEffect(function(){
    if(!isAuthenticated) navigate('/');
    },[isAuthenticated,navigate])
    return (
        <div>
           {isAuthenticated ? children:null} 
        </div>
    )
}

ProtectedRoute.propTypes={
    children:PropTypes.object,

}

export default ProtectedRoute
