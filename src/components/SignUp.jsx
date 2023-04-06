import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP } from '../redux/userSlice';

const SignUp = () => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [mobile, setMobile] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const err = useSelector((state) => state.user.error);

	const handleSignUp = () => {
		if (
			email !== null &&
			email !== '' &&
			password !== null &&
			password !== ''
		) {
			dispatch(
				SIGN_UP({
					name: name,
					surname: surname,
					mobile: mobile,
					email: email,
					password: password,
				}),
			);
			navigate('/login');
		} else {
			setError('please fill valid email and password');
		}
	};

	return (
		<div
			style={{
				width: '500px',
				top: '50%',
				left: '50%',
				margin: '15vh 30%',
			}}
		>
			<Form onSubmit={(e) => handleSignUp(e)}>
				<Form.Group
					className="mb-3"
					controlId=""
				>
					<FloatingLabel
						controlId="floatingInput1"
						label="Name"
						className="mb-3"
					>
						<Form.Control
							type="text"
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId=""
				>
					<FloatingLabel
						controlId="floatingInput2"
						label="Surname"
						className="mb-3"
					>
						<Form.Control
							type="text"
							placeholder="Enter surname"
							onChange={(e) => setSurname(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId=""
				>
					<FloatingLabel
						controlId="floatingInput3"
						label="Mobile No."
						className="mb-3"
					>
						<Form.Control
							type="number"
							placeholder="Enter Mobile Number"
							onChange={(e) => setMobile(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId=""
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
						controlId="floatingInput4"
						label="Password"
						className="mb-3"
					>
						<Form.Control
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<div className="d-flex justify-content-between">
					<Button
						variant="primary"
						type="submit"
						onClick={() => handleSignUp()}
					>
						Sign Up
					</Button>
					<small>{error}</small>
				</div>
			</Form>
		</div>
	);
};

export default SignUp;
