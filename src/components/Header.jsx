import React, { useEffect, useState } from 'react';
import {
	Badge,
	Button,
	Container,
	Dropdown,
	DropdownButton,
	Form,
	Navbar,
	Stack,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import {
	REMOVE_FROM_CART,
	fetchCategory,
	resetProducts,
	searchProduct,
	selectCategory,
} from '../redux/productSlice';
import { nanoid } from '@reduxjs/toolkit';
import { LOG_OUT } from '../redux/userSlice';

const Header = () => {
	const [show, setShow] = useState(false);
	const [search, setSearch] = useState('');
	const category = useSelector((state) => state.product?.category);
	const users = useSelector((state) => state.user?.users);
	const [currentUser, setCurrentUser] = useState([]);
	const emailId = localStorage.getItem('email') || null;
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.product?.cart);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCategory());
		if (emailId !== '' || emailId !== null) {
			return setCurrentUser([
				...users.filter((cu) => cu.email === emailId),
			]);
		}
	}, [dispatch, emailId, users]);

	const handleLogOut = () => {
		dispatch(LOG_OUT());
		navigate('/');
	};

	const handleSearch = () => {
		dispatch(searchProduct(search));
		setShow(true);
	};

	const handleReset = () => {
		dispatch(resetProducts());
		setSearch('');
		setShow(false);
	};

	const handleCategory = (c) => {
		navigate('/');
		dispatch(selectCategory(c));
		setShow(true);
	};

	return (
		<>
			<Navbar
				bg="light"
				variant="light"
			>
				<Container className="d-flex justify-content-around">
					<Navbar.Brand>
						<Link
							to="/"
							style={{ textDecoration: 'none', color: 'blue' }}
						>
							Cart
						</Link>
					</Navbar.Brand>
					<Stack
						direction="horizontal"
						gap={2}
					>
						<Form.Control
							className="me-auto"
							value={search}
							placeholder="Search here..."
							onChange={(e) => setSearch(e.target.value)}
						/>

						<Button
							variant="primary"
							onClick={() => handleSearch()}
						>
							Search
						</Button>
						{show && (
							<Button
								variant="secondary"
								onClick={() => handleReset()}
							>
								Reset
							</Button>
						)}
					</Stack>
					<Stack direction="horizontal">
						<Button
							variant="light"
							style={{
								textDecoration: 'none',
								color: 'inherit',
								marginLeft: '5px',
								marginRight: '5px',
							}}
							onClick={() => navigate('/about')}
						>
							About
						</Button>
						<Button
							variant="light"
							style={{
								textDecoration: 'none',
								color: 'inherit',
								marginLeft: '5px',
								marginRight: '5px',
							}}
							onClick={() => navigate('/contact')}
						>
							Contact
						</Button>
						<DropdownButton
							id="dropdown-item-button"
							title="Categories"
							variant="light"
							className="border-none"
							style={{
								textDecoration: 'none',
								marginLeft: '5px',
								marginRight: '5px',
								border: 'none',
							}}
						>
							{category.length ? (
								category?.map((cat) => {
									return (
										<Dropdown.Item
											key={nanoid()}
											onClick={() => handleCategory(cat)}
										>
											{cat.charAt(0).toUpperCase() +
												cat.slice(1)}
										</Dropdown.Item>
									);
								})
							) : (
								<p>Loading....</p>
							)}
						</DropdownButton>
						{emailId !== null ? (
							<>
								<Dropdown
									// id="dropdown-item-button"
									title="Cart"
									variant="light"
									className="border-none"
									style={{
										textDecoration: 'none',
										marginLeft: '5px',
										marginRight: '5px',
										border: 'none',
									}}
								>
									<Dropdown.Toggle variant="light">
										<FaShoppingCart
											color="blue"
											fontSize="25px"
										/>
										<Badge>{cart.length}</Badge>
									</Dropdown.Toggle>
									<Dropdown.Menu
										style={{
											minWidth: '360px',
											left: '-200px',
										}}
									>
										{cart.length > 0 ? (
											<>
												{cart.map((prod) => (
													<div
														className="cartitem"
														key={prod.id}
													>
														<img
															src={prod.images[0]}
															className="cartItemImg"
															alt={prod.title}
														/>
														<div className="cartItemDetail">
															<span>
																{prod.title}
															</span>
															<span>
																Rs.{prod.price}
															</span>
														</div>

														<AiFillDelete
															fontSize="20px"
															style={{
																cursor: 'pointer',
															}}
															onClick={() => {
																if (
																	localStorage.getItem(
																		'email',
																	)
																) {
																	dispatch(
																		REMOVE_FROM_CART(
																			{
																				prod: prod,
																			},
																		),
																	);
																}
															}}
														/>
													</div>
												))}
												<Link to="/cart">
													<Button
														style={{
															width: '95%',
															margin: '0 10px',
														}}
													>
														Go To Cart
													</Button>
												</Link>
											</>
										) : (
											<span style={{ padding: 10 }}>
												Cart is Empty!
											</span>
										)}
									</Dropdown.Menu>
								</Dropdown>
								<DropdownButton
									id="dropdown-item-button"
									title={
										emailId !== ''
											? currentUser[0]?.name
											: null
									}
									variant="outline-secondary"
									className="border-none"
									style={{
										textDecoration: 'none',
										marginLeft: '5px',
										marginRight: '5px',
										border: 'none',
									}}
								>
									<Dropdown.Item>Profile</Dropdown.Item>
									<Dropdown.Divider></Dropdown.Divider>
									<Dropdown.Item
										onClick={() => handleLogOut()}
									>
										LogOut
									</Dropdown.Item>
								</DropdownButton>
							</>
						) : (
							<>
								<Button
									variant="light"
									style={{
										textDecoration: 'none',
										color: 'inherit',
										marginLeft: '5px',
										marginRight: '5px',
									}}
									onClick={() => navigate('/login')}
								>
									LogIn
								</Button>
								<Button
									variant="light"
									style={{
										textDecoration: 'none',
										color: 'inherit',
										marginLeft: '5px',
										marginRight: '5px',
									}}
									onClick={() => navigate('/signup')}
								>
									SignUp
								</Button>
							</>
						)}
					</Stack>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
