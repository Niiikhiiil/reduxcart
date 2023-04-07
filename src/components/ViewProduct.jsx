import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	viewProduct,
} from '../redux/productSlice';
import { Badge, Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { nanoid } from '@reduxjs/toolkit';
import Suggestion from './Suggestion';

const ViewProduct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.product?.cart);
	const currentProduct = useSelector((state) => state.product?.singleProduct);
	const emailId = localStorage.getItem('email');
	// console.log(currentProduct);
	useEffect(() => {
		dispatch(viewProduct(id));
	}, [dispatch, id]);

	const handleAdd = (addp) => {
		dispatch(ADD_TO_CART({ p: addp, email: emailId }));
	};
	const handleremove = (rp) => {
		dispatch(REMOVE_FROM_CART({ prod: rp, email: emailId }));
	};

	return (
		<>
			<Card
				style={{
					height: '60vh',
					objectFit: 'contain',
					overflowY: 'scroll',
				}}
			>
				<CardHeader>
					<Row className="d-flex justify-content-between">
						<Col md={6}>{currentProduct?.title}</Col>
						<Col
							md={6}
							className="d-flex justify-content-end"
						>
							{localStorage.getItem('email') ? (
								<>
									{cart.some(
										(p) => p.id === currentProduct.id,
									) ? (
										<Button
											variant="danger"
											style={{
												minWidth: '80px',
											}}
											onClick={() =>
												handleremove(currentProduct)
											}
										>
											Remove
										</Button>
									) : (
										<Button
											style={{
												width: '100px',
											}}
											variant="primary"
											disabled={!currentProduct?.stock}
											onClick={() =>
												handleAdd(currentProduct)
											}
										>
											{!currentProduct?.stock
												? 'Out of Stock'
												: 'Add'}
										</Button>
									)}
								</>
							) : (
								<Button
									variant="outline-primary"
									style={{
										fontSize: '0.5rem',
									}}
								>
									Log In to Add
								</Button>
							)}
						</Col>
					</Row>
				</CardHeader>

				<Carousel>
					{currentProduct?.images?.map((i) => (
						<Carousel.Item
							interval={1000}
							key={nanoid()}
						>
							<img
								className="d-block w-100"
								alt=""
								src={i}
								style={{
									width: '350px',
									height: '300px',
									objectFit: 'contain',
								}}
							/>
						</Carousel.Item>
					))}
				</Carousel>
				<Card.Body>
					<Card.Text>{currentProduct?.description}</Card.Text>
					<Row>
						<Col>Price</Col>
						<Col style={{ fontWeight: '700' }}>
							${currentProduct?.price}
						</Col>
					</Row>
					<Row>
						<Col>Brand</Col>
						<Col style={{ fontWeight: '700' }}>
							{currentProduct?.brand}
						</Col>
					</Row>
					<Row>
						<Col>Category</Col>
						<Col style={{ fontWeight: '700' }}>
							<Badge
								pill
								bg="primary"
							>
								{currentProduct?.category}
							</Badge>
						</Col>
					</Row>
					<Row>
						<Col>Stock</Col>
						<Col>
							<Badge
								pill
								bg="secondary"
							>
								{currentProduct?.stock}
							</Badge>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			<Suggestion
				category={currentProduct?.category}
				id={id}
			/>
		</>
	);
};

export default ViewProduct;
