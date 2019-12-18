import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Table,TableBody,TableHead,TableCell,TableRow} from '@material-ui/core'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Fade from 'react-reveal/Fade'
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';



class Managestudio extends Component {
    state = { 
        loading:true,
        datastudio:[],
        modaladd:false,
        studioada:false,
        isisalah:false,

     }

     componentDidMount(){
         Axios.get(`${APIURL}studios`)
         .then((res)=>{
            //  console.log(res.data,'datastudios')
             var data=res.data
             this.setState({datastudio:data,loading:false})


         }).catch((err)=>{
             console.log(err)
         })

     }

     onClickAddStudio=()=>{
         var studio=this.refs.studio.value
         var jumlahKursi=this.refs.kursi.value
         var data={
             nama:studio,
             jumlahKursi
         }
        //  console.log(studio)
        //  console.log(jumlahKursi)
         Axios.get(`${APIURL}studios?nama=${studio}`)
         .then((res)=>{
            //  console.log(res.data.length)
            if(res.data.length===0){
                if(studio!=='' && jumlahKursi!==''){
                    Axios.post(`${APIURL}studios`, data)
                    .then((res)=>{
                        console.log('res',res)
                        this.setState({modaladd:false})
                        window.location.reload()
                    }).catch((err)=>{
                        console.log(err)
                    })
                    // console.log('berhasil')
                 }else{
                     this.setState({isisalah:true})
                    //  console.log('isi yang bener')
                 }
            }else{
                // console.log('nama studio udah ada')
                this.setState({studioada:true})
            }
         }).catch((err)=>{
             console.log(err)
         })

        
     }

    renderstudios=()=>{
        return this.state.datastudio.map((val,index)=>{
           return(
               <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.nama}</TableCell>
                <TableCell>{val.jumlahKursi}</TableCell>
               </TableRow>
           )
        })
        
    }


    
    
    
    render() { 
        if(this.state.loading){
            return(
                <div>Loading</div>
                )
            }else if (this.props.role==='admin'){
                return ( 
                    <div>
                    <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
                        <ModalHeader>
                            ADD STUDIOS
                        </ModalHeader>
                        <ModalBody>
                        <input type='text' className='form-control inputaddstudio' ref='studio' placeholder='nama studio'/>
                        <input type='number' className='form-control inputaddstudio' ref='kursi' placeholder='jumlah kursi'/>
                        {this.state.studioada===true?
                        <div className="alert alert-danger inputregis d-flex flex-column" role="alert">Studio udah ada !</div>
                        :
                         this.state.isisalah===true?
                         <div className="alert alert-danger inputregis d-flex flex-column" role="alert">Isi yang bener !</div> 
                         :                    
                        <div></div>
                        }
                        </ModalBody>
                        <ModalFooter>
                        <button type="button" className="btn btn-outline-dark" onClick={this.onClickAddStudio}>Submit</button>
                        </ModalFooter>
                    </Modal>
    
    
                    <button className='btn btn-success' style={{margin:'10px'}} onClick={()=>this.setState({modaladd:true})}> add Data</button>
                   <Fade>
                            {/* <button className='btn btn-success' onClick={()=>this.setState({modaladd:true})}> add Data</button> */}
                            <Table size='small' >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Jumlah Kursi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.renderstudios()}
                                </TableBody>
                            </Table>
                        </Fade>
                </div>
             );
            }else{
                return(
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h3>Oops! Page not found</h3>
                            <h1><span>4</span><span>0</span><span>4</span></h1>
                        </div>
                        <h2>we are sorry, but the page you requested was not found</h2>
                    </div>
                </div>
                )
            }
            // console.log(this.state.datastudio,'nama')
            
        }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        Tambcart:state.tambahcart,
        userId:state.Auth.id,
        role:state.Auth.role,
    }
  }
 
export default connect(MapstateToprops)(Managestudio);