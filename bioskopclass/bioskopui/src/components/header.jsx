import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from 'reactstrap';
import {LogoutSuccessAction, Tambahcart} from './../redux/actions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaCartArrowDown} from 'react-icons/fa'




const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const Logout=()=>{
    localStorage.clear()
    LogoutSuccessAction()
  }


  return (
    <div style={{width:'100%', fontWeight:'bolder'}}>
      <Navbar style={{backgroundColor:'black', height:'60px',textDecoration:'none',color:'white'}} expand="md">
        <NavbarBrand href="/" style={{textDecoration:'none',color:'white', fontSize:'26px'}} >JC11 Studios</NavbarBrand>
        <Nav className='mr-2 mt-1' >
              <Link to={'/'} style={{textDecoration:'none',color:'white'}}>HOME</Link>
        </Nav>
        <Nav className='mr-2 mt-1' >
              <Link to={'/'} style={{textDecoration:'none',color:'white'}}>TIKET</Link>
        </Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="d-flex ml-auto" navbar>
              {props.role==='admin'?
            <NavItem className='mr-2' >
              <Link to={'/manageadmin'} style={{textDecoration:'none',color:'white', marginRight:'50px'}}>Manage Film</Link>
              <Link to={'/managestudio'} style={{textDecoration:'none',color:'white', marginRight:'50px'}}><span>Manage Studios</span></Link>
            </NavItem>
              :
              null
              }
              {props.role==='user'?
            <NavItem className='mr-2' >
              <Link to={'/cart'} style={{textDecoration:'none',color:'white', marginRight:'50px'}}><FaCartArrowDown style={{fontSize:28}}/><span style={{color:'white', fontSize:28, marginRight:'5px'}}>{props.Tambcart}</span></Link>
            </NavItem>
            :
            null
              }
            {props.namauser===''?
            <div className='d-flex'>
              <NavItem>
                <Link to={'/login'} style={{textDecoration:'none',color:'white', marginRight:'10px'}} >Login</Link>
              </NavItem>
              <NavItem>
              <Link to={'/register'} style={{textDecoration:'none',color:'white',marginLeft:'5px'}} >Register</Link>
            </NavItem>
            </div>
              :
              null
            }
              {
                props.namauser===''?
                null
                :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className=''style={{textDecoration:'none',color:'white'}}>
                    {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to={'/history'}>
                    <DropdownItem>
                      History
                    </DropdownItem>
                    </Link>
                    <Link to={'/changepassword'}>
                    <DropdownItem>
                      Ganti Password
                    </DropdownItem>
                    </Link>
                    <DropdownItem divider />

                    <DropdownItem>
                      <NavLink href="/" onClick={()=>Logout()}>
                      Logout
                      </NavLink>
                    </DropdownItem>

                  </DropdownMenu>
                </UncontrolledDropdown>

              }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
const MapstateToprops=(state)=>{
  return{
      namauser:state.Auth.username,
      AuthLog:state.Auth.login,
      role:state.Auth.role,
      Tambcart:state.tambahcart

  }
}
export default connect(MapstateToprops,{LogoutSuccessAction, Tambahcart}) (Header);