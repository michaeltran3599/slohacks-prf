import React, { Component } from 'react';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            quantity: 0,
            price: 0.00,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var newElement = event.target.value; 
        var stateCopy = Object.assign({}, this.props.parent.state);
        switch(event.target.name) {
            case 'item':
                stateCopy.payments[this.props.number].item = newElement
                break;
            case 'quantity':
                stateCopy.payments[this.props.number].quantity = newElement
                break;
            case 'price':
                stateCopy.payments[this.props.number].price = newElement
                break;
            default:
        }
        this.setState(stateCopy);
    }

    render() {
        return (
            <div className="Payment">
                <input type="text" name="item" value={this.props.parent.state.payments[this.props.number].item} onChange={this.handleChange}></input>
                <input type="text" name="quantity" value={this.props.parent.state.payments[this.props.number].quantity} onChange={this.handleChange}></input>
                <input type="text" name="price" value={this.props.parent.state.payments[this.props.number].price} onChange={this.handleChange}></input>
            </div>
        );
    }
}

export default Payment;