import React, { Component } from 'react';
import './App.css';
import ProductScreen from './components/productScreen';
import CartPage from './components/cartPage';
import Cart from './components/cart';
import ProductDetail from './components/productDetailPage';
import { NavLink, Redirect, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
class App extends Component {

  state={
      products:[
          {name:"Product1", price:"3086.04"},
          {name:"Wark Stokes", price:"3178.76"},
          {name:"Graham Fox", price:"1378.34"},
          {name:"Owens Wyatt", price:"2784.33"},
          {name:"Hansen Daniels", price:"2587.98"},
          {name:"Gray Williams", price:"2984.66"},
          {name:"Burch Charles", price:"3178.45"},
          {name:"Whitaker Hunter", price:"1983.20"},
        ],
        Cart_product: [
          {name: '', price:0, quantity:1}
        ],
        FinalCartQunatity: null
    }


    onClickButton=(id, item)=>{
      console.log(id, item);      
      let products = this.state.products;
      let Cart_product = products.filter((item, index) => {
        if(index === id){
          item['quantity'] = 1;
          return item
        }       
      })
      console.log(Cart_product, ':::');
      this.setState({
        Cart_product
      })
    }
    addProductToCart = (cart) => {
      console.log(cart, '::qunat')
      let Cart_product = cart;
      // cart_product.push({name: cart_product, price: 0, quantity: quantity});


        this.setState({
          Cart_product,
          FinalCartQunatity: cart.quantity
        })
    }

    

  render() {
    const {FinalCartQunatity} = this.state;
    return (
      <Router>
      <div className="App">
      <div className="topBar">
						<span> React eCommerce </span>
						
							<NavLink className="navLink1" to="/"> Home </NavLink>
						 
						 	<NavLink className="navLink2" to="/cart"> Cart({FinalCartQunatity ? FinalCartQunatity : 0}) </NavLink>
					 	
					 </div>
              <Route path='/' exact={true} render={({history}) => {
                return <ProductScreen products={this.state.products} goToCart={this.onClickButton} history={history}/>
              }}/> 
         

              <Route path="/productDetail" render={({history}) => {
                return <ProductDetail history={history} addProductToCart={this.addProductToCart} Cart_product={this.state.Cart_product}/>
              }} exact />

               <Route path='/cartpage' render={({history}) => {
                return <CartPage products={this.state.products} 
                goToCart={this.onClickButton} 
                Cart_product={this.state.Cart_product}
                history={history}
                FinalCartQunatity = {this.state.FinalCartQunatity}/>
              }} exact/> 


              <Route path='/cart' component={Cart} exact/> 

      
      </div>

      </Router>
    );
  }
}

export default App;
