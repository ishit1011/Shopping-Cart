import React, { useEffect, useState } from "react";
import { CartState } from "./context/Context";
import {Button,ListGroup,Row,Col,FormControl,Card,} from "react-bootstrap";
import Rating from "./components/Rating";
import { AiFillDelete } from "react-icons/ai";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import GooglePayButton from '@google-pay/button-react'

const Cart = () => {
  const {state: { cart },dispatch,} = CartState();


  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal
    (cart.reduce((adder, currVal) => Number(currVal.price) * currVal.qty + adder,0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => {
            return (
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Card.Img src={prod.image} alt={prod.name} fluid rounded />
                  </Col>

                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>

                  <Col md={2}>
                    <span>₹ {prod.price}</span>
                  </Col>

                  <Col md={2}>
                    <Rating rating={prod.ratings} />
                  </Col>

                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={prod.qty}
                      onChange={(event) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: { id: prod.id, qty: event.target.value },
                        })
                      }
                    >
                      {[...Array(prod.inStock).keys()].map((amount) => (
                        <option key={amount + 1}>{amount + 1}</option>
                      ))}
                    </FormControl>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>

      <div className="filters summary" style={{ width: "30%" }}>
        <span className="title">Total of ({cart.length}) items </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <PayPalScriptProvider options={{ clientId: "test" }}>
          <PayPalButtons style={{ layout: "horizontal" }} />

          <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "12.00",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />

        </PayPalScriptProvider>
        
        <GooglePayButton
          buttonType="checkout"
          buttonSizeMode="fill"
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: "100.00",
              currencyCode: "INR",
              countryCode: "IN",
            },
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
        >Proceed to Checkout</GooglePayButton>
      </div>
    </div>
  );
};

export default Cart;
