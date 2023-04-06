import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../redux/productSlice';
import { Button, Carousel } from 'react-bootstrap';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const Suggestion = ({ category, id }) => {
	let suggestionProduct = useSelector(
		(state) => state.product?.filter?.products,
	);
	const navigate = useNavigate();
	console.log(suggestionProduct);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(selectCategory(category));
	}, [category, dispatch]);

	const handleView = (sid) => {
		navigate(`/view/${sid}`);
		suggestionProduct = suggestionProduct?.filter((csp) => csp.id != id);
	};

	return (
		<Carousel style={{ height: '70px', marginTop: '10px' }}>
			{suggestionProduct?.map((sp) => {
				return (
					<Carousel.Item
						interval={1200}
						key={nanoid()}
					>
						<img
							className="d-block w-100"
							src={sp.thumbnail}
							alt=""
							style={{
								width: '350px',
								height: '230px',
								objectFit: 'contain',
							}}
						/>
						<Carousel.Caption>
							<h3>{sp?.title}</h3>
							<p>{sp?.description}</p>
							<Button
								variant="success"
								onClick={() => handleView(sp.id)}
							>
								View
							</Button>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};

export default Suggestion;
