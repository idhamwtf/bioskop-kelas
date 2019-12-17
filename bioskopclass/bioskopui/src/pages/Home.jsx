import React, { Component } from 'react';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import Logo from '../supportimg/avgjadi2.gif'
import { APIURL } from '../support/ApiUrl';
import {Tambahcart} from './../redux/actions'
import {connect} from 'react-redux'



const url='http://localhost:2000/'

class Home extends Component {
    state = {
        dataMovies:[],
        datacart:[],
        loading:true
    }
    componentDidMount(){
        Axios.get(`${url}movies`)
        .then((res)=>{
            this.setState({dataMovies:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })

        // Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=false`)
        // .then((res1)=>{
        //     var datacart=res1.data
        //     // var qtyarr=[]
        //     console.log('datacart',datacart)
        //     console.log('resdata',res1.data)
        //     // res1.data.forEach(element => {
        //     //     qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
        //     // });
        //     this.setState({
        //         datacart:datacart,
        //         loading:false
        //     })

        // }).catch((err)=>{
        //     console.log(err)
        // }
    }
    renderMovies=()=>{
        
        return this.state.dataMovies.map((val,index)=>{
            return (
                    <div key={index} className="col-md-3 py-5 pr-3 pl-1 ">
                        <div className="card kartu " style={{width: '100%'}}>
                            <div className="gambaar1">
                                <Link to={'/moviedetail/'+ val.id}>
                                <img src={val.image} className="card-img-top kartu gambar" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{val.title}</h5>
                            </div>
                        </div>
                    </div>
            )
        })
    }
    render() { 
        console.log('datacart1',this.state.datacart)

        // if(this.state.loading){
        //     return(
        //         <div>Loading</div>
        //     )
        // }else
        // this.props.Tambahcart(this.state.datacart.length)
        // console.log(this.state.datacart)
        return (
            <div>
                <div className='d-flex' style={{width:'100%',background:'black'}}>
                    <div className='row-4 trailergif' style={{width:'100%', height:'650px', marginLeft:'0%'}}>
                    <img src={Logo} alt="gif" style={{width:'100%',height:'100%'}} />
                    </div>
                    {/* <div className='row-8' style={{border:'1px solid blue'}}>
                        asdasdasdasdasdkmaskdlaskdmaksdmaksdmaksldmlasm
                    </div> */}
                </div>
                <div className='mx-5'>
                <div className="row py-5 " style={{paddingLeft: '10%', paddingRight: '10%'}}>
                {/* <img src='../supportimg/avgendjadi.gif' alt="gif"/> */}
                    {this.renderMovies()}
                </div>
                </div>
            </div>
          );
    }
}

const MapStatetoProps=(state)=>{
    return{
        AuthLog:state.Auth.login,
        userId:state.Auth.id,
        Tambcart:state.tambahcart
    }
    
}
 
export default connect(MapStatetoProps,{Tambahcart})(Home);