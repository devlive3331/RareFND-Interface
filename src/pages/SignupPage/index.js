import { useState, useEffect, useContext, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./index.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { ProviderContext } from "../../web3/ProviderContext";
import { Link } from "react-router-dom";
import DialogPopup from "../../components/DialogPopup";

var regexp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
function isValidPhonenumber(value) {
	if (!value) return false;
	return regexp.test(value.replace(/[\s()+\-\.]|ext/gi, ""));
}

export default function () {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	const initialValues = { email: "", password: "" };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [accountCreated, setAccountCreated] = useState(false);
	const [realTimeFormErrors, setRealTimeFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [walletAddress, setWalletAddress] = useState();
	const { provider, setProvider } = useContext(ProviderContext);
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);

	const getWallletAdress = async () => {
		const accounts = await provider.listAccounts();
		if (accounts) setWalletAddress(accounts[0]);
	};

	useEffect(() => {
		if (provider) getWallletAdress();
	}, [provider]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors({ ...realTimeFormErrors, ...validate(formValues) });
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			axios
				.post(process.env.REACT_APP_BASE_URL + "/api/user/signup/", {
					username: formValues.username,
					email: formValues.email,
					password: formValues.password,
					first_name: formValues.firstname,
					last_name: formValues.lastname,
					phone: formValues.phone ? "+" + formValues.phone : "",
					wallet_address: formValues.walletAddress,
				})
				.then((response) => {
					if (response.status === 200) {
						setAccountCreated(true);
					}
				});
		}
	}, [formErrors]);

	useEffect(() => {
		if (formValues.username) {
			axios
				.get(
					process.env.REACT_APP_BASE_URL +
						`/api/unique/username/${document.getElementById("username").value}/`
				)
				.then(function (response) {
					if (!response.data.valid) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							username: "Username already exists",
						});
					} else if (
						document.getElementById("username") &&
						document.getElementById("username").value.length < 5
					) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							username: "Username must be more than 5 characters",
						});
					} else if (
						document.getElementById("username") &&
						document.getElementById("username").value.length > 20
					) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							username: "Username cannot exceed more than 20 characters",
						});
					} else {
						delete realTimeFormErrors.username;
						forceUpdate();
					}
				});
		}
	}, [formValues]);

	useEffect(() => {
		if (formValues.email) {
			axios
				.get(
					process.env.REACT_APP_BASE_URL +
						`/api/unique/email/${document.getElementById("email").value}/`
				)
				.then(function (response) {
					if (!response.data.valid) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							email: "Email already exists",
						});
					} else if (!regex.test(document.getElementById("email").value)) {
						setRealTimeFormErrors({
							...realTimeFormErrors,
							email: "This is not a valid email format!",
						});
					} else {
						delete realTimeFormErrors.email;
					}
				});
		}
	}, [formValues.email]);

	const validate = (values) => {
		const errors = {};

		if (!values.username) {
			errors.username = "Username is required!";
		} else if (values.username.length < 5) {
			errors.username = "Username must be more than 5 characters";
		} else if (values.username.length > 20) {
			errors.username = "Username cannot exceed more than 20 characters";
		}

		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}

		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 8) {
			errors.password = "Password must be more than 8 characters";
		} else if (values.password.length > 30) {
			errors.password = "Password cannot exceed more than 30 characters";
		}

		if (values.password !== values.password2) {
			errors.password2 = "Password confirmation doesn't match with password";
		}

		if (values.phone && !isValidPhonenumber(values.phone)) {
			errors.phone = "Invalid phone number";
		}

		if (walletAddress)
			setFormValues({ ...formValues, walletAddress: walletAddress });
		// else errors.walletAddress = "Please connect using your wallet";
		else setFormValues({ ...formValues, walletAddress: null });

		return errors;
	};

	return (
		<div className="Sign-Up-Auth-form-container p-5">
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign Up</h3>
					<div className="form-group mt-3">
						<label>
							Username <span className="text-danger">*</span>
						</label>
						<input
							id="username"
							name="username"
							className="form-control mt-1"
							placeholder="Enter Username"
							value={formValues.username}
							onChange={handleChange}
						/>
						<p className="text-danger">{realTimeFormErrors.username}</p>
					</div>
					<div className="form-group mt-3">
						<label>
							Email address <span className="text-danger">*</span>
						</label>
						<input
							id="email"
							type="email"
							name="email"
							className="form-control mt-1"
							placeholder="Enter Email"
							value={formValues.email}
							onChange={handleChange}
						/>
						<p className="text-danger">{realTimeFormErrors.email}</p>
					</div>
					<div className="form-group mt-3">
						<label>
							Password <span className="text-danger">*</span>
						</label>
						<input
							type="password"
							name="password"
							className="form-control mt-1"
							placeholder="Password"
							value={formValues.password}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password}</p>
					</div>
					<div className="form-group mt-3">
						<label>
							Password Confirmation <span className="text-danger">*</span>
						</label>
						<input
							type="password"
							name="password2"
							className="form-control mt-1"
							placeholder="Enter Password"
							value={formValues.password2}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password2}</p>
					</div>

					<div className="form-group mt-3">
						<label>First Name</label>
						<input
							type="text"
							name="firstname"
							className="form-control mt-1"
							placeholder="Enter Your First Name (Optional)"
							value={formValues.firstname}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.firstname}</p>
					</div>

					<div className="form-group mt-3">
						<label>Last Name</label>
						<input
							type="text"
							name="lastname"
							className="form-control mt-1"
							placeholder="Enter Your Last Name (Optional)"
							value={formValues.lastname}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.lastname}</p>
					</div>

					<div className="form-group mt-3">
						<label>Phone Number</label>
						<PhoneInput
							id="phonenumber"
							name="phone"
							className="mt-1"
							inputStyle={{ width: "100%" }}
							placeholder="Enter Phone Number (Optional)"
							value={formValues.phone}
							onChange={(value) =>
								setFormValues({ ...formValues, phone: value })
							}
							inputProps={{
								name: "phone",
								// required: true,
								autoFocus: true,
							}}
						/>
						<p className="text-danger">{formErrors.phone}</p>
					</div>

					<div className="form-group mt-3">
						<label>Wallet Address</label>
						{walletAddress ? (
							<p className="text-success mt-2">
								{walletAddress.slice(0, 10) +
									"....." +
									walletAddress.slice(-10)}
							</p>
						) : (
							<p>No wallet connected</p>
						)}
						<p className="text-danger">{formErrors.walletAddress}</p>
					</div>

					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-warning">
							Submit
						</button>
					</div>
					<p className="forgot-password text-right mt-2">
						Have an account? <Link to="/login">Login</Link>
					</p>
				</div>
			</form>
			{accountCreated && (
				<DialogPopup
					title="Verify your email"
					description="You will receive an email confirmation, please check your spam section too, 
					and follow the instructions to verify your account."
					show={true}
					function_={() => setAccountCreated(false)}
				/>
			)}
		</div>
	);
}
