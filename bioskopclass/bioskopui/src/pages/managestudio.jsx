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

     }

     componentDidMount(){
         Axios.get(`${APIURL}studios`)
         .then((res)=>{
             console.log(res.data,'datastudios')
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

         console.log(studio)
         console.log(jumlahKursi)

         if(studio!=='' && jumlahKursi!==''){
            Axios.post(`${APIURL}studios`, data)
            .then((res)=>{
                console.log('res',res)
                this.setState({modaladd:false})
            }).catch((err)=>{
                console.log(err)
            })
         }else{
             console.log('gagal')
         }
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
        }else
        // console.log(this.state.datastudio,'asdasdas')
        return ( 
            <div>
                <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
                    <ModalHeader>
                        ADD STUDIOS
                    </ModalHeader>
                    <ModalBody>
                    <input type='text' className='form-control inputaddstudio' ref='studio' placeholder='nama studio'/>
                    <input type='number' className='form-control inputaddstudio' ref='kursi' placeholder='jumlah kursi'/>
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
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        Tambcart:state.tambahcart,
        userId:state.Auth.id,
    }
  }
 
export default connect(MapstateToprops)(Managestudio);