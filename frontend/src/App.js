import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import CartView from './screens/CartView'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ShippingScreen from './screens/ShippingScreen'
import Coba from './screens/Coba'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

function App() {
  return (
    <Router>
    <Header />
    <main className="py-3">
      <Container>
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/coba' component={Coba}/>
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/product/:id' component={ProductScreen} />
      <Route path='/cart/:id?' component={CartView} />
      <Route path='/admin/users' component={UserListScreen} />
      <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
