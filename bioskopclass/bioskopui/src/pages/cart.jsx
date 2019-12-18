import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux'
import {Table,ModalHeader,ModalBody,ModalFooter,Modal} from 'reactstrap'
import { APIURL } from '../support/ApiUrl';
import {Tambahcart} from './../redux/actions'



class Cart extends Component {
    state = { 
        datacart:[],
        datacheckout:[],
        modaldetail:false,
        indexdetail:0
     }

     componentDidMount(){
        // console.log(this.props)
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=false`)
        .then((res)=>{
            var datacart=res.data
            var qtyarr=[]
            // console.log('resdata',res.data)
            res.data.forEach(element => {
                qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
                // {this.props.Tambahcart()}
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
                datacart.forEach((val,index)=>{
                    datafinal.push({...val,qty:qtyarrfinal[index]})
                })
                // console.log(datafinal)
                this.setState({
                    datacart:datafinal
                })
            }).catch((err)=>{

            })
        }).catch((err)=>{
            console.log(err)
        })
     }

     renderCart=()=>{
        //  console.log('datacart',this.state.datacart)
         if(this.state.datacart!==null){
            //  if(this.state.datacart.length===0){
            //      return (
            
            //          <tr>
            //              <td>bangku kosong</td>
            //          </tr>
            //      )
            //  }
             return this.state.datacart.map((val,index)=>{
                 return(
                     <tr key={index}>
                        <th style={{width:100}}>{index+1}</th>
                        <th style={{width:100}}>{val.movie.title}</th>
                        <th style={{width:100}}>{val.jadwal}</th>
                        <th style={{width:100}}>{val.qty.length}</th>
                        <th style={{width:100}}><button onClick={()=>this.setState({modaldetail:true,indexdetail:index
                        })}>Details</button></th>
                     </tr>
                 )
             })
         }
     }


    onClickCheckout=()=>{
        Axios.get(`${APIURL}orders?userId=${this.props.userId}`)
        .then((res)=>{
            // console.log(res.data)
            var datacheck=[]
            var data = {
                bayar:true
            }

            var dataudahbayar=[]
            res.data.forEach((val,index)=>{
                datacheck.push(Axios.patch(`${APIURL}orders/${val.id}`, data))
            })
            Axios.all(datacheck)
            .then((res1)=>{
                console.log(res1,'apa?')
                // Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=true`)
                // .then((res2)=>{
                //     dataudahbayar=res2.data
                //     var qtytiket=[]
                //     res.data.forEach((val) => {
                //         qtytiket.push(Axios.get(`${APIURL}ordersDetails?orderId=${val.id}`))
                //     });
                    

                // }).catch((err2)=>{
                //     console.log(err2)
                // })
                window.location.reload()
            }).catch((err1)=>{
                console.log(err1)
            })
            console.log(datacheck,'datacheck')
        }).catch((err)=>[
            console.log(err)
        ])
        // Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=false`)
        // .then((res)=>{
        //     this.setState({datacheckout:res.data})
            
        //     this.state.datacheckout.map((val,index)=>{
        //         // console.log(this.state.datacheckout[index].id)
        //         var id = this.state.datacheckout[index].id
        //     var data={
        //         bayar : true
        //     }

        //     Axios.patch(`${APIURL}orders/${id}`, data)
        //     .then((res1)=>{
        //         console.log(res1,`res1`)
        //         window.location.reload()
        //         // Axios.post(`${APIURL}transactions`)

        //     }).catch((err1)=>{
        //         console.log(err1)
        //     })
        //     })
        // })
    }







    render() { 
        // console.log(this.props.userId)
        // console.log(this.state.datacart,'datacartt')

        if(this.props.userId!==1){
        return ( 
            <div>
                <center>
                <Modal isOpen={this.state.modaldetail} toggle={()=>{this.setState({modaldetail:false})}}>
                        <ModalHeader >
                            Details
                        </ModalHeader>
                        <ModalBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Bangku</th>
                                        {/* <th>Harga</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.datacart!==null && this.state.datacart.length!==0 ? 
                                    this.state.datacart[this.state.indexdetail].qty.map((val,index)=>{
                                        // console.log(this.state.datacart,'datacartttt')
                                        return (
                                            <tr key={index}>
                                             <td>{index+1}</td>
                                             <td>{'abcdefghijklmnopqrstu'.toLocaleUpperCase()[val.row]+(val.seat+1)}</td>
                                             {/* <td></td> */}
                                            </tr>
                                        )
                                    })
                                    :
                                    null
                                }
                                </tbody>
                            </Table>
                        </ModalBody>
                    </Modal>
                    <Table style={{width:600}}>
                        <thead>
                            <tr>
                                <th style={{width:100}}>No.</th>
                                <th style={{width:100}}>Title</th>
                                <th style={{width:100}}>Jadwal</th>
                                <th style={{width:100}}>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                        <tfoot>
                                <button onClick={this.onClickCheckout}>checkout</button>
                        </tfoot>
                    </Table>
                </center>
            </div>
        )
        }else if(this.props.role==='admin'){
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
        }else
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
}

const MapStatetoProps=(state)=>{
    return{
        AuthLog:state.Auth.login,
        userId:state.Auth.id,
        Tambcart:state.tambahcart,
        role:state.Auth.role,
    }
    
}
 
export default connect(MapStatetoProps,{Tambahcart})(Cart);