import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Calendar from "../../../components/Calendar";
import ExtensibleInputs from "../../../components/ExtensibleInputs";
import closeIcon from "../../../assets/closeIcon.png";

export default function Funding(props) {
	const [rewardsArray, setRewardsArray] = useState({});
	const rewardsArrayRef = useRef(rewardsArray);
	rewardsArrayRef.current = rewardsArray;
	const projectDataRef = useRef(props.projectData);
	projectDataRef.current = props.projectData;

	const handleInputChanges = (e, rowId) => {
		let { name, value } = e.target;
		props.handleInputErrors(name, value, `rewards.${rowId}`);
		let projectData_ = { ...projectDataRef.current };
		projectData_["rewards"][rowId] = {
			...projectData_["rewards"][rowId],
			[name]: value,
		};
		props.setProjectData(projectData_);
	};

	const removeIncentive = (event, item) => {
		event.preventDefault();
		let tmp = { ...projectDataRef.current };
		delete tmp.rewards[item];
		props.setProjectData(tmp);
	};

	const addRewardRow = () => {
		let projectData_ = { ...projectDataRef.current };
		const rowId = Object.keys(projectData_["rewards"]).length + 1;
		projectData_["rewards"] = {
			...projectData_["rewards"],
			[`${rowId}`]: {
				incentiveTitle: null,
				incentiveDescription: null,
				incentiveEstimatedDelivery: null,
				availableIncentives: null,
				incentivePrice: null,
				incentives: [],
			},
		};

		props.setProjectData(projectData_);
	};

	return (
		<div className="DashboardCreateProjectRewards">
			<DashboardCreateProjectItemHead
				title="Add your rewards"
				head="Offer simple, meaningful ways to bring backers closer to your project and celebrate it coming to life."
			/>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				{Object.keys(props.projectData["rewards"]).map((item, i) => {
					return (
						<div
							style={{ marginBottom: "20px", position: "relative" }}
							id={`row-${item}`}
						>
							<div style={{ position: "absolute", right: "0", top: "0" }}>
								<img
									src={closeIcon}
									style={{
										width: "30px",
										cursor: "pointer",
									}}
									onClick={(e) => removeIncentive(e, `${item}`)}
								/>
							</div>
							<Row>
								<Col>
									<h3>{`Incentive ${item}`}</h3>
									<div className="input-with-title">
										<p
											style={{
												marginBottom: "3px",
											}}
										>
											Incentive Title
											<span className="required-asterisk">*</span>
										</p>
										<input
											className="atomic-text-input w-100"
											id={`incentiveTitle${item}`}
											maxLength="60"
											name={`incentiveTitle`}
											placeholder="Title"
											type="text"
											onChange={(e) => handleInputChanges(e, `${item}`)}
											value={
												props.projectData &&
												props.projectData.rewards &&
												props.projectData.rewards[`${item}`] &&
												props.projectData.rewards[`${item}`].incentiveTitle
											}
										/>
										<p className="invalid-input-p">
											{props.formErrors &&
												props.formErrors.rewards &&
												props.formErrors.rewards[item] &&
												props.formErrors.rewards[item].incentiveTitle}
										</p>
									</div>
									<div className="input-with-title">
										<p
											style={{
												marginBottom: "3px",
											}}
										>
											Incentive description
											<span className="required-asterisk">*</span>
										</p>
										<textarea
											className="atomic-text-input w-100 h-50"
											id={`incentiveDescription${item}`}
											maxLength="135"
											name={`incentiveDescription`}
											placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
											onChange={(e) => handleInputChanges(e, `${item}`)}
											value={
												(props.projectData &&
													props.projectData.rewards &&
													props.projectData.rewards[`${item}`] &&
													props.projectData.rewards[`${item}`]
														.incentiveDescription) ||
												""
											}
										></textarea>
										<p className="invalid-input-p">
											{props.formErrors &&
												props.formErrors.rewards &&
												props.formErrors.rewards[item] &&
												props.formErrors.rewards[item].incentiveDescription}
										</p>
									</div>
									<p
										style={{
											marginBottom: "3px",
										}}
									>
										Estimated delivery
										<span className="required-asterisk">*</span>
									</p>
									<div className="input-with-title">
										{/* projectTaxCountry: "",
						taxIdNumber: "",
						whitePaperUrl: "",
						tokenomicsUrl: "",
						certificateOfIncumbency: null,
						companyStructureChart: null, */}

										<Calendar
											setProjectData={props.setProjectData}
											projectDataRef={projectDataRef}
											rowId={item}
											name="incentiveEstimatedDelivery"
											handleInputErrors={props.handleInputErrors}
											value={
												props.projectData &&
												props.projectData["rewards"] &&
												props.projectData["rewards"][`${item}`] &&
												props.projectData["rewards"][`${item}`][
													"incentiveEstimatedDelivery"
												]
											}
											source="rewards"
										/>
										<p className="invalid-input-p">
											{props.formErrors &&
												props.formErrors.rewards &&
												props.formErrors.rewards[item] &&
												props.formErrors.rewards[item]
													.incentiveEstimatedDelivery}
										</p>
									</div>
									<div className="input-with-title">
										<p
											style={{
												marginBottom: "3px",
											}}
										>
											Available items
											<span className="required-asterisk">*</span>
										</p>
										<input
											className="atomic-text-input w-100"
											id={`availableIncentives${item}`}
											maxLength="60"
											name={`availableIncentives`}
											placeholder="0"
											type="text"
											onChange={(e) => handleInputChanges(e, `${item}`)}
											pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
											value={
												props.projectData &&
												props.projectData["rewards"] &&
												props.projectData["rewards"][`${item}`] &&
												props.projectData["rewards"][`${item}`][
													"availableIncentives"
												]
											}
										/>
										<p className="invalid-input-p">
											{props.formErrors &&
												props.formErrors.rewards &&
												props.formErrors.rewards[item] &&
												props.formErrors.rewards[item].availableIncentives}
										</p>
									</div>
									<div className="input-with-title">
										<p
											style={{
												marginBottom: "3px",
											}}
										>
											Required contribution amount
											<span className="required-asterisk">*</span>
										</p>
										<input
											className="atomic-text-input w-100"
											id={`incentivePrice${item}`}
											name="incentivePrice"
											placeholder="$ 0.0"
											type="text"
											onChange={(e) => handleInputChanges(e, `${item}`)}
											pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
											value={
												props.projectData &&
												props.projectData["rewards"] &&
												props.projectData["rewards"][`${item}`] &&
												props.projectData["rewards"][`${item}`][
													"incentivePrice"
												]
											}
										/>
										<p className="invalid-input-p">
											{props.formErrors &&
												props.formErrors.rewards &&
												props.formErrors.rewards[item] &&
												props.formErrors.rewards[item].incentivePrice}
										</p>
									</div>
								</Col>
								<Col>
									<ExtensibleInputs
										title="Incentive includes:"
										className="incentive-input"
										maxLength={40}
										placeholder="Free ticket to a cinema movie"
										projectDataRef={projectDataRef}
										setProjectData={props.setProjectData}
										rowId={`${item}`}
										style={{ width: "100%" }}
									/>
								</Col>
							</Row>
							<hr />
						</div>
					);
				})}
				<Button
					variant="warning"
					size="lg"
					onMouseDown={(e) => e.preventDefault()}
					onClick={addRewardRow}
					style={{ borderRadius: "0px" }}
				>
					Add Incentive
				</Button>
			</Row>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div style={{ textAlign: "left" }}>
						<Button
							variant="warning"
							onMouseDown={(e) => e.preventDefault()}
							size="md"
							onClick={props.previousTabFunction}
							style={{
								borderRadius: "0px",
								width: "8vw",
								minWidth: "100px",
							}}
						>
							Previous
						</Button>
					</div>

					<div style={{ textAlign: "right" }}>
						<Button
							variant="warning"
							onMouseDown={(e) => e.preventDefault()}
							size="md"
							onClick={props.nextTabFunction}
							style={{
								borderRadius: "0px",
								width: "8vw",
								minWidth: "100px",
							}}
						>
							Next
						</Button>
					</div>
				</div>
			</Row>
		</div>
	);
}
