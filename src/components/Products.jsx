import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../redux/productSlice';

const Products = () => {
	const product = useSelector((state) => state.product?.product?.products);
	const emailId = localStorage.getItem('email');
	const navigate = useNavigate();
	const cart = useSelector((state) => state.product?.cart);
	const filterProduct = useSelector(
		(state) =>
			state.product?.search[0]?.products ||
			state.product?.filter?.products,
	);
	const dispatch = useDispatch();

	console.log(filterProduct);
	const handleView = (id) => {
		navigate(`/view/${id}`);
	};

	const handleAdd = (addp) => {
		dispatch(ADD_TO_CART({ p: addp, email: emailId }));
	};
	const handleremove = (rp) => {
		dispatch(REMOVE_FROM_CART({ prod: rp, email: emailId }));
	};

	return (
		<Row
			xs={1}
			md={3}
			className="g-2 justify-content-md-center"
		>
			{Array.isArray(filterProduct) && filterProduct?.length
				? filterProduct?.map((q) => {
						return (
							<Col
								md={3}
								key={q.id}
								style={{ minHeight: '450px' }}
							>
								<Card className="g-2">
									<CardHeader>{q.title}</CardHeader>
									<Card.Img
										style={{
											minWidth: '300px',
											height: '250px',
											objectFit: 'cover',
										}}
										thumbnail="true"
										variant="top"
										src={q.thumbnail}
									/>
									<Card.Body>
										<Row
											style={{
												height: '180px',
												objectFit: 'cover',
											}}
										>
											<Col>Description:</Col>
											<Col style={{ fontSize: '0.9rem' }}>
												{q.description.substring(
													0,
													100,
												)}
											</Col>
										</Row>
										<Row>
											<Col>Brand:</Col>
											<Col>{q.brand}</Col>
										</Row>
										<Row>
											<Col>Category:</Col>
											<Col>{q.category}</Col>
										</Row>
										<Row>
											<Col>Discount:</Col>
											<Col>
												<Badge
													pill
													bg="primary"
												>
													{q.discountPercentage}%
												</Badge>
											</Col>
										</Row>
										<Row>
											<Col>Rating:</Col>
											<Col>
												<Badge
													pill
													bg="success"
												>
													{q.rating}
												</Badge>
											</Col>
										</Row>
										<Row>
											<Col>Stock:</Col>
											<Col>
												<Badge
													pill
													bg="secondary"
												>
													{q.stock} available
												</Badge>
											</Col>
										</Row>
									</Card.Body>
									<Card.Footer>
										<Row>
											<Col>Price: ${q.price}</Col>
											<Col>
												{localStorage.getItem(
													'email',
												) ? (
													<>
														{cart.some(
															(p) =>
																p.id === q.id,
														) ? (
															<Button
																variant="danger"
																style={{
																	minWidth:
																		'80px',
																}}
																onClick={() =>
																	handleremove(
																		q,
																	)
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
																disabled={
																	!q.stock
																}
																onClick={() =>
																	handleAdd(q)
																}
															>
																{!q.stock
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
														onClick={() =>
															navigate('/login')
														}
													>
														Log In to Add
													</Button>
												)}
											</Col>
											<Col>
												<Button
													variant="success"
													onClick={() =>
														handleView(q.id)
													}
												>
													View
												</Button>
											</Col>
										</Row>
									</Card.Footer>
								</Card>
							</Col>
						);
				  })
				: product?.map((p) => {
						return (
							<Col
								md={3}
								key={p.id}
								style={{ minHeight: '450px' }}
							>
								<Card className="g-2">
									<CardHeader>{p.title}</CardHeader>
									<Card.Img
										style={{
											minWidth: '300px',
											height: '250px',
											objectFit: 'cover',
										}}
										thumbnail="true"
										variant="top"
										src={p.thumbnail}
									/>
									<Card.Body>
										<Row
											style={{
												height: '180px',
												objectFit: 'cover',
											}}
										>
											<Col>Description:</Col>
											<Col>
												{p.description.substring(
													0,
													120,
												)}
											</Col>
										</Row>
										<Row>
											<Col>Brand:</Col>
											<Col>{p.brand}</Col>
										</Row>
										<Row>
											<Col>Category:</Col>
											<Col>{p.category}</Col>
										</Row>
										<Row>
											<Col>Discount:</Col>
											<Col>
												<Badge
													pill
													bg="primary"
												>
													{p.discountPercentage}%
												</Badge>
											</Col>
										</Row>
										<Row>
											<Col>Rating:</Col>
											<Col>
												<Badge
													pill
													bg="success"
												>
													{p.rating}
												</Badge>
											</Col>
										</Row>
										<Row>
											<Col>Stock:</Col>
											<Col>
												<Badge
													pill
													bg="secondary"
												>
													{p.stock} available
												</Badge>
											</Col>
										</Row>
									</Card.Body>
									<Card.Footer>
										<Row>
											<Col>Price: ${p.price}</Col>
											<Col>
												{localStorage.getItem(
													'email',
												) ? (
													<>
														{cart.some(
															(c) =>
																c.id === p.id,
														) ? (
															<Button
																variant="danger"
																style={{
																	minWidth:
																		'80px',
																}}
																onClick={() =>
																	handleremove(
																		p,
																	)
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
																disabled={
																	!p.stock
																}
																onClick={() =>
																	handleAdd(p)
																}
															>
																{!p.stock
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
														onClick={() =>
															navigate('/login')
														}
													>
														Log In to Add
													</Button>
												)}
											</Col>
											<Col>
												<Button
													variant="success"
													onClick={() =>
														handleView(p.id)
													}
												>
													View
												</Button>
											</Col>
										</Row>
									</Card.Footer>
								</Card>
							</Col>
						);
				  })}
			{/* </Row> */}
		</Row>
	);
};

export default Products;
