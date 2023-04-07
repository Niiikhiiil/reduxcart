import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Alert, Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BUY_ALL } from '../redux/userSlice';
import { EMPTY_CART } from '../redux/productSlice';

const CheckOut = () => {
	const [show, setShow] = useState(false);
	// const navigate = useNavigate();
	const cart = useSelector((state) => state.product?.cart);
	const total = useSelector((state) => state.product?.total);
	const dispatch = useDispatch();

	const handleBuyAll = () => {
		dispatch(
			BUY_ALL({
				cart: cart,
				email: localStorage.getItem('email'),
				orderId: nanoid(),
				date: new Date().toString(),
				total: total,
			}),
		);
		dispatch(EMPTY_CART());
		setShow(true);
	};

	return (
		<>
			{show ? (
				<Alert
					key="primary"
					variant="primary"
				>
					Thank you for Shopping &nbsp;
					<Link to="/profile"> Click Here, to get invoice</Link>
				</Alert>
			) : (
				<>
					<Table
						striped
						style={{ marginTop: '20px' }}
					>
						<thead>
							<tr>
								<th>#</th>
								<th>Product Title</th>
								<th>Quntity</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{cart?.map((c, i) => {
								return (
									<tr key={nanoid()}>
										<td>{i + 1}</td>
										<td>{c.title}</td>
										<td>{c.qty}</td>
										<td>${c.price}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Row>
						<Col style={{ fontWeight: '800' }}>Total</Col>
						<Col>${total}</Col>
						<Col>
							{cart.length > 0 && (
								<Button onClick={() => handleBuyAll()}>
									Buy All
								</Button>
							)}
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default CheckOut;
