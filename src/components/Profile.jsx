import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { MdStar } from 'react-icons/md';
import moment from 'moment';

const Profile = () => {
	const user = useSelector((state) =>
		state?.user?.users?.filter((f) => {
			return f.email === localStorage.getItem('email');
		}),
	);
	console.log(user);
	return (
		<Row>
			<Col>
				<Card>
					<Card.Header>Personal Detail</Card.Header>
					<Card.Body>
						<Row>
							<Col>FullName:</Col>
							<Col>
								{user[0].name} &nbsp; {user[0].surname}{' '}
							</Col>
						</Row>
						<Row>
							<Col>Mobile No.:</Col>
							<Col>{user[0].mobile}</Col>
						</Row>
						<Row>
							<Col>Email ID:</Col>
							<Col>{user[0].email}</Col>
						</Row>
						<Row>
							<Col>Password:</Col>
							<Col>**********</Col>
							{/* {user[0].password} */}
						</Row>
                        <Row>
                            <Col>Address</Col>
                            <Col>{user[0].address}</Col>
                        </Row>
					</Card.Body>
				</Card>
			</Col>
			<Col
				style={{
					maxHeight: '100vh',
					overflowY: 'scroll',
				}}
			>
				{user[0].orderList?.map((o) => {
					return (
						<Card style={{ marginBottom: '10px' }}>
							<Card.Header style={{ fontWeight: '700' }}>
								Orders
							</Card.Header>
							<Card.Body>
								<Row>
									<Col>Order ID</Col>
									<Col>************</Col>
									{/* {o.orderId} */}
								</Row>
								<Row>
									<Col>Order Date:</Col>

									<Col>
										{' '}
										{moment(o.orderedDate)
											.format('MMMM Do YYYY, h:mm:ss a')
											.toString()}
									</Col>
								</Row>
								<hr />
								<Card.Title style={{ fontWeight: '700' }}>
									Order Details
								</Card.Title>
								{o.orders?.map((op, j) => {
									return (
										<>
											<Card>
												<Card.Body>
													<Table striped>
														<tbody>
															<tr>
																<td>Title</td>
																<td>
																	{op.title}
																</td>
															</tr>
															<tr>
																<td>Brand</td>
																<td>
																	{op.brand}
																</td>
															</tr>
															<tr>
																<td>
																	Quantity
																</td>
																<td>
																	{op.qty}
																</td>
															</tr>
															<tr>
																<td>Rating</td>
																<td>
																	{op.rating}
																	<MdStar />
																</td>
															</tr>
															<tr>
																<td>
																	Discount
																</td>
																<td>
																	{
																		op.discountPercentage
																	}
																	%
																</td>
															</tr>
															<tr>
																<td>Price</td>
																<td>
																	${op.price}
																</td>
															</tr>
														</tbody>
													</Table>
												</Card.Body>
											</Card>
											<hr />
										</>
									);
								})}
							</Card.Body>
							<Card.Footer>
								<Row>
									<Col style={{ fontWeight: '600' }}>
										Total
									</Col>
									<Col style={{ fontWeight: '700' }}>
										${o.total}
									</Col>
								</Row>
							</Card.Footer>
						</Card>
					);
				})}
			</Col>
		</Row>
	);
};

export default Profile;
