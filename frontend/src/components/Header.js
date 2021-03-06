import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'


const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                  <LinkContainer to="/">
                    <Navbar.Brand>Suka Buku</Navbar.Brand>
                  </LinkContainer>
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse id="basic-navbar-nav">
                     <Route render={({history}) => <SearchBox history={history}/>} />
                      <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                          <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                          <NavDropdown title={userInfo.name} id="username">
                            <LinkContainer to='/profile' >
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) 
                        : 
                          <LinkContainer to="/login">
                          <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                        </LinkContainer>
                        }
                        {userInfo && userInfo.isAdmin && (
                          <NavDropdown title="admin access" id="username">
                          <LinkContainer to='/admin/userlist' >
                            <NavDropdown.Item>User List</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Product List</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Order List</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        )}
                      </Nav>
                    </Navbar.Collapse>
                </Container>
          </Navbar>
        </header>
    )
}

export default Header
