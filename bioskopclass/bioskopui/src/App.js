import React, { Component } from 'react';
import Header from './components/header'
import Home from './pages/Home'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/manageadmin'
import Login from './pages/login'
import {connect} from 'react-redux'
import {LoginSuccessAction, Tambahcart} from './redux/actions'
import Axios from 'axios';
import { APIURL } from './support/ApiUrl';
import Moviedetail from './pages/moviedetail'
import Belitiket from './pages/belitiket'
import Cart from './pages/cart'
import Register from './pages/register'
import Managestudio from './pages/managestudio';
import Gantipass from './pages/gantipass'


class App extends Component{
  state={
    loading:true,
    datacart:[]
  }

  componentDidMount(){
    var id=localStorage.getItem('dino')
    Axios.get(`${APIURL}users/${id}`)
    .then((res)=>{
      this.props.LoginSuccessAction(res.data)
      Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=false`)
        .then((res1)=>{
          // console.log(res1,'res1')
             var datacart=res1.data
            // console.log('datacart',datacart)
            // console.log('resdata',res1.data)
            this.setState({
                datacart:datacart,
                loading:false
            })
        }).catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      this.setState({loading:false})
    })
  }


  render(){
    if(this.state.loading){
      return <div>loading</div>
    }
    // console.log(this.state.datacart.length,'length')
    this.props.Tambahcart(this.state.datacart.length)
    return (
      <div>
        <Header/>
        <Switch>
          <Route path={'/'} exact>
            <Home/>
          </Route>
          <Route path={'/manageadmin'} exact>
            <ManageAdmin/>
          </Route>
          <Route path='/moviedetail/:id'component={Moviedetail} exact />
          <Route path='/belitiket' component={Belitiket} exact />  
          <Route path='/cart' component={Cart} exact/>
          <Route path={'/login'} exact component={Login}/>
          <Route path={'/register'} exact component={Register}/>
          <Route path={'/managestudio'} exact component={Managestudio}/>
          <Route path={'/changepassword'} exact component={Gantipass}/>
        </Switch>
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

export default connect(MapstateToprops,{LoginSuccessAction, Tambahcart})(App);
