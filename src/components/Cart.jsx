import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	CHANGE_PROD_QTY,
	REMOVE_FROM_CART,
	TOTAL_AMOUNT,
} from '../redux/productSlice';

const Cart = () => {
	const [total, setTotal] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.product?.cart);
	useEffect(() => {
		setTotal(
			cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0),
		);
	}, [total, cart]);
	return (
		localStorage.getItem('email') && (
			<div className="home">
				<div className="productContainer">
					<ListGroup>
						<Button
							style={{
								width: '80px',
								height: '50px',
								marginBottom: '20px',
							}}
							onClick={() => {
								return navigate('/');
							}}
						>
							Back
						</Button>
						{cart.map((prod) => (
							<ListGroup.Item key={nanoid()}>
								<Row key={nanoid()}>
									<Col>
										<Image
											src={prod.images[0]}
											alt={prod.title}
											fluid
											rounded
										/>
									</Col>
									<Col md={2}>
										<span>{prod.title}</span>
									</Col>
									<Col md={2}>${prod.price}</Col>
									<Col md={2}>{prod.rating}</Col>
									<Col>
										<Form.Control
											as="select"
											value={prod.qty}
											onChange={(e) => {
												dispatch(
													CHANGE_PROD_QTY({
														id: prod.id,
														qty: e.target.value,
														email: localStorage.getItem(
															'email',
														),
													}),
												);
											}}
										>
											{[
												...Array(
													Number(prod.stock),
												).keys(),
											].map((q) => (
												<option key={nanoid()}>
													{q + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col>
										<AiFillDelete
											fontSize="20px"
											style={{ cursor: 'pointer' }}
											onClick={() => {
												if (
													localStorage.getItem(
														'email',
													)
												) {
													dispatch(
														REMOVE_FROM_CART({
															prod: prod,
														}),
													);
												}
											}}
										/>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
					<Row
						className="mt-3"
						key={nanoid()}
					>
						<Col className="title">Subtotal({cart.length})</Col>
						<Col style={{ fontWeight: 700, fontsize: 20 }}>
							Total: ${total}
						</Col>
						<Col>
							{cart.length > 0 ? (
								<Button
									key={nanoid()}
									onClick={() => {
										if (
											cart.length > 0 &&
											localStorage.getItem('email')
										) {
											dispatch(
												TOTAL_AMOUNT({ total: total }),
											);
											navigate('/checkout');
										}
									}}
								>
									Proceed To Checkout
								</Button>
							) : null}
						</Col>
					</Row>
				</div>
			</div>
		)
	);
};

export default Cart;
