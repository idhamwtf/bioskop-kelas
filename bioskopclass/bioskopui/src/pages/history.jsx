import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Table,TableBody,TableHead,TableCell,TableRow} from '@material-ui/core'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';


class History extends Component {
    state = { 
        datahistory:[],
        modaldetail:false,
     }

     componentDidMount(){
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=true`)
        .then((res)=>{
            var datahistory=res.data
            var qtyarr=[]
            // console.log('resdata',res.data)
            res.data.forEach(element => {
                qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
            });
            var qtyarrfinal=[]
            // console.log(qtyarr)
            Axios.all(qtyarr)
            .then((res1)=>{
                res1.forEach((val)=>{
                    qtyarrfinal.push(val.data)
                })
                // console.log(qtyarrfinal)
                var datafinal=[]
                datahistory.forEach((val,index)=>{
                    datafinal.push({...val,qty:qtyarrfinal[index]})
                })
                // console.log(datafinal)
                this.setState({
                    datahistory:datafinal
                })
            }).catch((err)=>{

            })
        }).catch((err)=>{
            console.log(err)
        })
     }

     dapethari=(a='')=>{
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${a}${month<10?`0${month}`:`${month}`}${a}${date}`
     }






    renderhistory=()=>{
        return this.state.datahistory.map((val,index)=>{
           return(
               <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{this.dapethari()}</TableCell>
                <TableCell>{val.totalharga}</TableCell>
                <TableCell><button className='btn btn-outline-primary' onClick={()=>this.setState({modaldetail:true})}>Details</button></TableCell>
               </TableRow>
           )
        })
        
    }


    render() { 
    if(this.props.AuthLog){
        if(this.props.role==='user'){
            return ( 
                <div>

                    <Modal isOpen={this.state.modaldetail} toggle={()=>this.setState({modaldetail:false})}>
                        <ModalHeader>
                            Detail Belanja
                        </ModalHeader>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>

                    </Modal>
                    <center>
                        <div>
                              <Table size='small' >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Tanggal</TableCell>
                                        <TableCell>Total Harga</TableCell>
                                        <TableCell>Rincian</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.renderhistory()}
                                </TableBody>
                            </Table>
                        </div>
                    </center>
                </div>
                );
            }else{
                return (
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
        }else
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
}

const MapstateToprops=(state)=>{
    return{
        namauser:state.Auth.username,
        AuthLog:state.Auth.login,
        role:state.Auth.role,
        Tambcart:state.tambahcart,
        userId:state.Auth.id,
  
    }
  }
 
export default connect(MapstateToprops)(History);