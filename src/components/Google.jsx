import axios from 'axios';
import React, {useEffect} from 'react'

function Google() {

    function handelCallbackResponse (response){
        console.log(response);
        axios.post("http://localhost:8000/api/users/google/",
            {
                'auth_token':response.credential
            })
            .then((res)=>console.log(res))
            .catch((err)=> console.log(err))
        }   

    useEffect(()=>{
        
        window.google.accounts.id.initialize({
            client_id:"969780072688-i0icr3imsmc17jbe192odp4kdco6rb4f.apps.googleusercontent.com",
            callback: res => handelCallbackResponse(res)
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme:"outline", 
                size:"large"                
            }
        )

    },[])

  return (
    <div>
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-3">
                    <div id="signInDiv"></div>
                </div>
            </div>
        </div>
            
    </div>
  )
}

export default Google;