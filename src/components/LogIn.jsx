import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOG_IN } from '../redux/userSlice';

const LogIn = () => {
	const [pType, setPType] = useState('password');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();
		if (
			email !== null &&
			email !== '' &&
			password !== null &&
			password !== ''
		) {
			dispatch(LOG_IN({ email: email, password: parseInt(password) }));
			navigate('/');
		} else {
			setError('please fill valid email and password');
		}
	};

	function handlePassword() {
		if (pType === 'password') {
			setPType('text');
		} else {
			setPType('password');
		}
	}

	return (
		<div
			style={{
				width: '500px',
				top: '50%',
				left: '50%',
				margin: '15vh 30%',
			}}
		>
			<Form onSubmit={(e) => handleLogin(e)}>
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail"
				>
					<FloatingLabel
						controlId="floatingInput"
						label="Email"
						className="mb-3"
					>
						<Form.Control
							type="email"
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					{' '}
					<FloatingLabel
						controlId="floatingInput1"
						label="Password"
						className="mb-3"
					>
						<Form.Control
							type={pType}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FloatingLabel>
					<Form.Check
						type="checkbox"
						id="default-checkbox"
						label="Show Password"
						onClick={() => handlePassword()}
					/>
				</Form.Group>
				<div className="d-flex justify-content-between">
					<Button
						variant="primary"
						type="submit"
					>
						Log in
					</Button>
					<small>{error}</small>
				</div>
			</Form>
		</div>
	);
};

export default LogIn;
