import React, { Component, Fragment } from 'react';
import './cartPage.css';


class CartPage extends Component {
	constructor(props) {
		super(props);
		this.onCartChange = this.onCartChange.bind(this);
		this.onRefreshUpdate = this.onRefreshUpdate.bind(this);
		this.state = {
			cartData: [this.props.Cart_product]
		}
	}
	onRefreshUpdate(value, item, ind){
		console.log(this.state, '::ref',value, item, ind);
		let updatedCart = {
			quantity: item.quantity,
			price: (item.basePrice * item.quantity).toFixed(2),
			basePrice: item.basePrice,
			name: item.name
		}
		const cartData = this.state.cartData;
		cartData.map((data, index) => {
			if (ind === index) {
				this.state.cartData[index] = updatedCart
			}
		})
		this.setState({
			cartData,
			FinalCartQunatity: item.quantity
		})
	}
	onCartChange(value, item, ind) {
		console.log(value, item, ind, '::ind');
		const arr = this.state.cartData;
		arr[ind] = { ...arr[ind], quantity: value };
		console.log('----- arr -------', arr);
		this.setState({ cartData: arr });
		// this.setState({
		// 	cartData
		// })
		

		// this.setState()
		// this.setState({
		// 	 name: value
		// });
	}
	deleteCart(index) {
		const cartData = this.state.cartData.filter((data, ind) => {
			return index !== ind;
		});
		this.setState({
			cartData
		})
		console.log('onchange', this.state);

	}
	render() {
		const { cartData } = this.state;
		console.log(cartData, '::cartData', this.props);
		return (
			<div className="maindiv">
				<h3> Shopping Cart </h3>


				<table>
					<tbody>

						<tr className="heading">
							<th> Product </th>
							<th> Price </th>
							<th> Quantity </th>
							<th> Item Total </th>
							<th> Action </th>
						</tr>

						<tr className="data">
							{
								cartData.map((item, index) => {
									return (
										<Fragment>
											<td key={index} >
												{item.name}
											</td>

											<td key={index} >
												{item.basePrice}
											</td>

											<td key={index} className='updateCart'>
												<input key={index + Math.random()}
													className="form-control"
													type="text"
													value={item.quantity}
													ref="searchStringInput"
													onChange={(e) => this.onCartChange(e.target.value, item, index)}
												/>
												<span >
												<i class="fa fa-refresh" aria-hidden="true" onClick={(e) => this.onRefreshUpdate(e.target.value, item, index)}></i>
												</span>
											</td>
											<td key={index} >
												{item.price}
											</td>
											<td key={index} className='deleteCart' >
												<span onClick={e => this.deleteCart(index)}>
												<i class="fa fa-trash" aria-hidden="true"></i>
												</span>
											</td>
										</Fragment>



									)
								})
							}
						</tr>

					</tbody>
				</table>
			</div>

		)
	}
}

export default CartPage;