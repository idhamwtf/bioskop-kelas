import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

class Register extends Component {
    state = { 
        datavalid:0,
        regissucceed:false
     }

    componentDidMount(){

    }


    onClickSubmitRegis=()=>{
        var regisusername = this.refs.regisusername.value
        var regispassword = this.refs.regispassword.value
        var regisrepassword = this.refs.regisrepassword.value
        var regisrole = 'user'
        var data={
            username:regisusername,
            password:regispassword,
            role:regisrole
        }
    
        if(regisusername!==''&&regispassword!==''&&regisrepassword!==''&&regispassword===regisrepassword){
            Axios.post(`${APIURL}users`, data)
            .then((res)=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.setState({regissucceed:true})
            }).catch((err)=>{
                console.log(err)
            })
            this.setState({datavalid:0})
        }else{
            this.setState({datavalid:1})
        }
    }


    render() { 
            if(this.props.AuthLog===false){
                return ( 
                    <div>
                <center>
                    <div className='registerform'>
                        
                            <h1>Register</h1>
                            <input type='text' className='form-control inputregis' ref='regisusername' placeholder='username'/>
                            <input type='password' className='form-control inputregis' ref='regispassword' placeholder='password'/>
                            <input type='password' className='form-control inputregis' ref = 'regisrepassword' placeholder='re-enter password'/>
                            {this.state.datavalid===1?
                            <div class="alert alert-danger inputregis" role="alert">
                             DATA TIDAK VALID !!
                            </div>
                            :
                            <div></div>
                            }
                            <button type="button" class="btn btn-outline-dark inputregis" onClick={this.onClickSubmitRegis}>Submit</button>
                            {this.state.regissucceed?
                            <Redirect to="/login" />
                            :
                            null
                                }
                    </div>
                </center>
            </div> 
         );
        }else
        return(
            <div>
                udah login/admin
            </div>
        )
    }
}


const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
    }
  }


export default connect(MapstateToprops)(Register);