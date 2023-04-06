import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CONTACT_SEND } from '../redux/contactSlice';

const Contact = () => {
	const [email, setEmail] = useState('');
	const [text, setText] = useState('');
	const currentUserEmail = localStorage.getItem('email');
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			CONTACT_SEND({
				email: email,
				currentUserEmail: currentUserEmail,
				text: text,
			}),
		);
		setEmail('');
		setText('');
		setShow(true);
	};

	return (
		<div
			style={{
				width: '500px',
				display: 'flex',
				flexDirection: 'column',
				marginLeft: '20%',
				marginTop: '20%',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h2>Contact Us</h2>
			</div>
			<div>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Group
						className="mb-3"
						controlId="formBasicEmail"
					>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Form.Text className="text-muted">
							We'll never share your data with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group
						className="mb-3"
						controlId="text"
					>
						<Form.Label>Message</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter message"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
					>
						Send
					</Button>
				</Form>
				{show && (
					<Alert
						key="primary"
						variant="primary"
						style={{ marginTop: '20px' }}
					>
						Thank you for contacting... <br />
						we will contact you...
						<br />
						<Button onClick={() => setShow(false)}>Ok</Button>
					</Alert>
				)}
			</div>
		</div>
	);
};

export default Contact;
