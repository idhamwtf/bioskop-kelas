import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';

class Gantipass extends Component {
    state = { 
        datavalid:0
     }


    onClickSubmitGantiPass=()=>{
        var passlama = this.refs.passlama.value
        var passbaru = this.refs.passbaru.value
        var repassbaru = this.refs.repassbaru.value
        // console.log(passlama)
        // console.log(passbaru)
        // console.log(repassbaru)
        var data = {
            password : passbaru
        }

        if(passlama===this.props.password && passbaru===repassbaru && passbaru!==this.props.password){
            Axios.patch(`${APIURL}users/${this.props.UserId}`, data)
            .then((res)=>{
                this.setState({datavalid:0})
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            this.setState({datavalid:1})
        }
    }



    render() { 
        // console.log(this.props.password)
        if(this.props.AuthLog){
            return ( 
                <div>
                    <center>
                        <div style={{width:'500px', border:'2px black solid', marginTop:'30px', padding:'15px'}}>
                             <h1>Ganti Password</h1>
                            <input type='password' className='form-control inputgantipassword' ref='passlama' placeholder='password lama'/>
                            <input type='password' className='form-control inputgantipassword' ref='passbaru' placeholder='password baru'/>
                            <input type='password' className='form-control inputgantipassword' ref = 'repassbaru' placeholder='re-enter password baru'/>
                            {this.state.datavalid===1?
                            <div className="alert alert-danger inputregis d-flex flex-column" role="alert">
                             <span >DATA TIDAK VALID !!</span>
                             <span >- Pastikan password baru dan reenter password sama</span>
                             <span >- Password lama dan baru tidak boleh sama</span>
                            </div>
                            :
                            <div></div>
                            }
                            <button type="button" class="btn btn-outline-dark inputgantipassword" onClick={this.onClickSubmitGantiPass}>Submit</button>
                        </div>
                    </center>
                </div>
             );
        }else{
            return (
                <div>anda belom login</div>
            )
        }
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        role:state.Auth.role,
        password:state.Auth.password
    }
  }
 
export default connect(MapstateToprops)(Gantipass);