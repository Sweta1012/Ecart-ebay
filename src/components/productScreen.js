import React, {Component} from 'react';
import './productScreen.css';
import { NavLink, Redirect} from 'react-router-dom';


class ProductScreen extends Component{
	constructor(props) {
		super(props);
		this.goToCart = this.goToCart.bind(this);
	}
	goToCart = (e, index, item) => {
		console.log(e, index, item)
		this.props.goToCart(index, item);
		this.props.history.push('/productDetail');
	}

	render(){
		return(
				
				<div className="mainDiv">
					

					<h3> Top Products </h3>
						<div className="grid-container">
						{
							this.props.products.map((item, index) => {
								return(
									<div key={index}>
										<div className="innerDiv"> {item.name} </div>
										<span> {item.name} </span> <br/>
										<span> {item.price} </span> <br/>
										<button className="btn" onClick={(e) => this.goToCart(e, index, item)}> Add to Cart </button>
									</div>
								)
							})
						}

						</div>

				</div>
			 	

			)
	}
}

export default ProductScreen;