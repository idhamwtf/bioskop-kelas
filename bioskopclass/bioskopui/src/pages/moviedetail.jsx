import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import Belitiket from './belitiket'

class Moviedetail extends Component {
    state = { 
        datadetailfilm:[],
        traileropen:false,
        belomlogin:false,
        kelogin:false,
        belitiketok:false,
     }

componentDidMount(){
    Axios.get(`${APIURL}movies/${this.props.match.params.id}`)
    .then((res)=>{
        this.setState({datadetailfilm:res.data})
    }).catch((err)=>{
        console.log(err)
    })
}
 
onBeliTiketClick=()=>{
    if(this.props.AuthLog){
        this.setState({belitiketok:true})
    }else{
        this.setState({belomlogin:true})
    }
}

    render() { 
        console.log(this.props.match.params.id)
        console.log(this.props.location.pathname.split('/'))

        if(this.state.kelogin){
            return <Redirect to={'/login'}/>
        }
        if(this.state.belitiketok){
            return <Redirect to={{pathname:'/belitiket', state:this.state.datadetailfilm}}/>

        }

        return ( 
            <div>
                {/* modaltrailerstarts */}
                <Modal isOpen={this.state.traileropen} toggle={()=>{this.setState({traileropen:false})}} size='lg' contentClassName='trailer'>
                    <ModalBody className=' p-0 bg-transparent'>
                            <iframe width="100%" height="100%" src={this.state.datadetailfilm.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
                    </ModalBody>
                </Modal>
                {/* modaltrailerends */}
                {/* modalbelomloginstarts */}
                <Modal isOpen={this.state.belomlogin} centered toggle={()=>this.setState({belomlogin:false})}>
                    <ModalBody>
                        anda belum login, silahkan login untuk lanjut
                    </ModalBody>
                    <ModalFooter>1
                        <button className='btn btn-danger' onClick={()=>this.setState({kelogin:true})}>Login</button>
                    </ModalFooter>
                </Modal>
                {/* modalbelomloginends */}
                <div className="row p-3 mx-3 my-4">
                    <div className="col-md-5">
                        <img src={this.state.datadetailfilm.image} height='500' alt='film'/>
                        <div className="mt-3" style={{fontSize:'30px',fontWeight:'bold'}}>
                        {this.state.datadetailfilm.title}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className='mt-1'>
                            title
                        </div>
                        <div className='mt-1'>
                            sinopsis
                        </div>
                       
                    </div>
                    <div className="col-md-5">
                        <div className="mt-1">
                            {this.state.datadetailfilm.title}
                        </div>
                        <div className="mt-1">
                            {this.state.datadetailfilm.sinopsis}
                        </div>
                        {this.props.role!=='admin'?
                        <button className='mr-3  mt-5 btn btn-outline-primary' onClick={this.onBeliTiketClick}>Beli Tiket</button>
                        :
                        null
                        }
                    <button className='mr-3 mt-5 btn btn-outline-warning' onClick={()=>this.setState({traileropen:true})}>Trailer</button>
                    </div>
                </div>
            </div>
         );
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        role:state.Auth.role,
    }
}
export default connect(MapstateToprops)(Moviedetail);