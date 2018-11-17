import React, { Component } from 'react';
import Question from './Question'
import Radio from './Radio'
import Payment from './Payment'

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            mail: '',
            name: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            payments: [
                {
                    key: 0,
                    item: '',
                    quantity: 0,
                    price: 0
                }
            ]
        };
        this.initialState = this.state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.togglePage = this.togglePage.bind(this);
        this.reset = this.reset.bind(this);
    }

    personalErrorCheck(state) {
        var errors = [];
        if(state.name === '') 
            errors.push("Name cannot be empty.");
        if(state.mail === '')
            errors.push("Select how you want to receive your check");
        if(state.email === '')
            errors.push("Email cannot be empty.");
        if(state.phone === '') 
            errors.push("Phone Number cannot be empty.");
        if(state.street === '') 
            errors.push("Street Address cannot be empty.");
        if(state.city === '') 
            errors.push("City cannot be empty.");
        if(state.state === '') 
            errors.push("State cannot be empty.");
        if(state.zip === '') 
            errors.push("ZIP Code cannot be empty.");
        if(state.email.slice(-12) !== "@calpoly.edu") 
            errors.push("Please enter your Cal Poly email.");
        return errors;
    }

    paymentErrorCheck(state) {
        var errors = [];
        if(state.payments.length === 0) 
            errors.push("No payments have been entered");
        else {
            state.payments.forEach(function(payment) {
                if(payment.quantity === 0) 
                    errors.push("Payment #" + (payment.key + 1) + " has no quanity.");
                if(payment.item === '') 
                    errors.push("Payment #" + (payment.key + 1) + " has no description.");
                if(payment.price === 0) 
                    errors.push("Payment #" + (payment.key + 1) + " has no price.");
                if(isNaN(parseInt(payment.quantity))) 
                    errors.push("Payment #" + (payment.key + 1) + "'s quantity is not a number.");
                if(isNaN(parseFloat(payment.price)))
                    errors.push("Payment #" + (payment.key + 1) + "'s price is not a number.");
            });
        }
        return errors;
    }

    handleSubmit(event) {
        event.preventDefault();
        const state = this.state;
        var errors = this.paymentErrorCheck(state);
        var axios = require('axios');
        if(errors.length === 0) {
            axios.post('api/submit', {state})
                .then(res => {
                    console.log(res);
                })  
            this.setState({
                page: 3
            })
        }  
        else 
            alert(errors[0]);
    }
   
    reset() {
        this.setState(this.initialState);
        this.setState({
            payments: [
                {
                    key: 0,
                    item: '',
                    quantity: 0,
                    price: 0
                }
            ]
        })
    }
   
    togglePage(event) {
        var errors = this.personalErrorCheck(this.state);
        var newPage = this.state.page === 1 ? 0 : 1;
        if(errors.length === 0) {
            this.setState(prevState => ({
                page: newPage
            }));
        }
        else 
            alert(errors[0]);
    }
    
    addChild(event) {
        if(this.state.payments.length < 10) {
            this.setState(prevState => ({
                payments: this.state.payments.concat({key: this.state.payments.length, item: '', quantity: 0, price: 0})
              }))
        }
    }

    removeChild(event) {
        if(this.state.payments.length !== 1) {
            var array = [...this.state.payments];
            array.pop();
            this.setState({
                payments: array
            })
        }
    }

    renderPayment(payment) {
        return <Payment key={payment.key} number={payment.key} parent={this}></Payment>
    }
     
    render() {
        var container;
        if(this.state.page === 0) {
            container = (
                <div className="QuestionContainer personal">
                    <div className="header">
                        <h1>SLO Hacks PRF Form</h1>
                        <p>Personal Info</p>
                    </div> 
                    <form>
                        <Question type='text' question="Name" name="name" parent={this} value={this.state.name}></Question>
                        <Radio type='choice' question="How do you want to receive your check?" name="mail" choice1="Mail to address" choice2="Hold with club services" parent={this} value={this.state.mail}></Radio>
                        <Question type='text' question="Email" name="email" parent={this} value={this.state.email}></Question>
                        <Question type='text' question="Phone Number" name="phone" parent={this} value={this.state.phone}></Question>
                        <Question type='text' question="Street Address" name="street" parent={this} value={this.state.street}></Question>
                        <Question type='text' question="City" name="city" parent={this} value={this.state.city}></Question>
                        <Question type='text' question="State" name="state" parent={this} value={this.state.state}></Question>
                        <Question type='text' question="Zip Code" name="zip" parent={this} value={this.state.zip}></Question>
                    </form>
                    <button className="button" onClick={this.togglePage}>Next</button>
                </div>
            );
        }
        else if(this.state.page === 1) {
            container = (
                <div className="QuestionContainer payments">
                    <div className="header">
                        <h1>SLO Hacks PRF Form</h1>
                        <p>Payments</p>
                    </div> 
                    <form onSubmit={this.handleSubmit}>
                        <div className="paymentLabels">
                            <h4>Description</h4>
                            <h4>Qty.</h4>
                            <h4>Price</h4>
                        </div>
                        <div className='paymentContainer'>
                            {this.state.payments.map(payment => this.renderPayment(payment))}
                        </div>
                        <button className="button" type='button' onClick={this.togglePage}>Previous</button>
                        <button className="button" type='button' onClick={this.addChild}>Add Item</button>
                        <button className="button" type='button' onClick={this.removeChild}>Remove Item</button>
                        <input className="button" type='submit'></input>
                    </form>
                </div>
                );
            }
            else {
                container = (
                    <div>
                        <h1>Form Successfully Submitted!</h1>
                        <button className="button" type='button' onClick={this.reset}>Submit Another Form</button>
                    </div>
                )
            }
            return container
        }
    }

export default QuestionContainer;
