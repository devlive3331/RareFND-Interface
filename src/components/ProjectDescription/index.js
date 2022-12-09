import "bootstrap/dist/css/bootstrap.css";
import "./descriptionStyle.css";
import Incentives from "../Incentives";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

export default function ProjectDescription(props) {
	let incentivesData = props.incentivesData;
	if (incentivesData) {
		incentivesData.sort(function (a, b) {
			var x = a.price;
			var y = b.price;
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}
	return (
		<div
			className="project-description bg-white w-100"
			style={{
				padding: "5vw",
			}}
		>
			<Row>
				<Col md={8}>
					<div
						dangerouslySetInnerHTML={{ __html: props.description }}
						style={{
							maxWidth: "100vw",
						}}
					></div>
				</Col>
				<Col md={4}>
					<div
						className="mx-auto"
						style={{
							width: "80%",
							marginLeft: "1vw",
							border: "1px solid",
							padding: "10px",
							marginBottom: "10px",
							borderColor: "#DBDEDD",
						}}
					>
						<Link
							to={`/profile/${props.ownerId}`}
							style={{ textDecoration: "none" }}
						>
							<div className="centerDiv" style={{ color: "black" }}>
								Project by
							</div>
							<div className="centerDiv">
								<img
									id="profileImage"
									className="rounded-circle"
									width="80"
									src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
								></img>
							</div>
							<div
								className="centerDiv"
								style={{ textDecoration: "underline #000000", color: "Dark" }}
							>
								<h3>{props.ownerUsername}</h3>
							</div>
						</Link>
					</div>
					{incentivesData && incentivesData.length > 0 && (
						<div>
							<h1 className="text-center">Incentives</h1>
							{incentivesData &&
								Array.from(incentivesData).map((_, idx) => (
									<Incentives
										title={_.title}
										description={_.description}
										included_incentives={_.included_incentives}
										estimated_delivery={_.estimated_delivery}
										available_items={_.available_items}
										price={_.price}
										reserved={_.reserved}
										project={_.project}
										projectLive={props.projectLive}
									/>
								))}
						</div>
					)}
				</Col>
			</Row>
		</div>
	);
}
