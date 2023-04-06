import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LogIn from './components/LogIn';
import Home from './components/Home';
import ViewProduct from './components/ViewProduct';
import About from './components/About';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import Profile from './components/Profile';
// import Futer from './components/Futer';
const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
					path="/login"
					element={<LogIn />}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/view/:id"
					element={<ViewProduct />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route
					path="/cart"
					element={<Cart />}
				/>
				<Route
					path="/checkout"
					element={<CheckOut />}
				/>
				<Route
					path="/profile"
					element={<Profile />}
				/>
			</Routes>
			{/* <Futer /> */}
		</BrowserRouter>
	);
};

export default App;
