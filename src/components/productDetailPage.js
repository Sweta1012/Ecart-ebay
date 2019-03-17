import React, { Component } from 'react';
import './productDetail.css';



class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.updateProductQuantity = this.updateProductQuantity.bind(this);
    }

    state = {
        products: [
            { name: 'Product 1' },
            { name: 'Product 2' },
            { name: 'Product 3' },
            { name: 'product 4' }
        ],
        prodName: 'Product 1',
        prodColor: 'prod-0',
        quantity: 0,
        selectedProduct: this.props.Cart_product[0],
        basePrice: this.props.Cart_product[0].price ? this.props.Cart_product[0].price : '',
        // baseQuantity: this.props.Cart_product[0].quantity


    }
    updateProductQuantity(evt) {
        console.log('================', evt.target.value);
        const selectedProd = this.state.selectedProduct;
        this.setState({selectedProduct: {...selectedProd, quantity: +evt.target.value}});
    }


    getProduct = (event) => {
        console.log("hi", event.currentTarget.getAttribute('name'))
        let prodId = event.currentTarget.id
        let prodName = this.state.prodName
        prodName = event.currentTarget.getAttribute('name')
        console.log(prodId, 'prod:::');

        this.setState({
            prodColor: prodId,
            prodName
        })
    }

    onDecrement(val) {
        let quantity = val.quantity === 1 ? val.quantity : val.quantity - 1;
        let price = (this.state.basePrice * quantity).toFixed(2);
        let name = val.name;
        this.setState({
            selectedProduct: {
                quantity,
                price,
                name
            }
        })
    }

    onIncrement(val) {
        let quantity = val.quantity + 1;
        let price = (this.state.basePrice * quantity).toFixed(2);
        let name = val.name;
        this.setState({
            selectedProduct: {
                quantity,
                price,
                name
            }
        })


    }

    onAddCart = (product) => {
        this.props.history.push('/cartpage');
        product['basePrice'] = this.state.basePrice;
        this.props.addProductToCart(product);

    }

    componentDidMount(){
        console.log(this.props, this.state, ':::state');
    }


    render() {
        let myId = this.state.prodColor
        let prodName = this.state.prodName
        let quantity = this.state.quantity
        const { selectedProduct } = this.state;
        console.log(this.props, '::select', selectedProduct);
      //  this.state.prodColor = 0;
        return (
            <div className="wrapper">
                <div className="product-list">
                    {this.state.products.map((item, index) => {
                        return (
                            <div className="prod" name={item.name} id={`prod-${index}`}
                                key={index} onClick={this.getProduct}>
                                {item.name}
                            </div>
                        )
                    })

                    }

                </div>

                <div className="product">

                    <div className="product-image" id={myId }>
                        {prodName}
                    </div>

                    <div className="product-detail">
                        {selectedProduct.name}

                        <p>$ {selectedProduct.price}</p>
                        <div style={{ fontSize: "10px" }}>Product detail pages and offers. A product detail page is where a customer discovers a unique product sold on Amazon. It can include one or more offers from sellers or from Amazon. This page is a shared space that displays attributes that are common to all offers for the product </div>
                        <hr />


                        <button onClick={(e) => this.onDecrement(selectedProduct)}> - </button>
                        <input
                            type="text"
                            value={selectedProduct.quantity}
                            onChange={this.updateProductQuantity}
                            ref={input => { this.input = input }}
                        />
                        <button onClick={(e) => this.onIncrement(selectedProduct)}> + </button>
                        <button className="btn1" onClick={(e) => this.onAddCart(selectedProduct)}> Add to Cart </button>
                    </div>
                </div>


            </div>
        )
    }
}

export default ProductDetail;



