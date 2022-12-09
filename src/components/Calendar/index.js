import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "./Calendar.css";
import "./DatePicker.css";

export default function MyApp(props) {
	const [value, onChange] = useState(props.value || null);

	useEffect(() => {
		if (props.updateProjectData) {
			props.updateProjectData(
				{ target: { name: props.name, value: value } },
				props.source
			);
		}
		if (props.setProjectData && props.source === "rewards") {
			props.handleInputErrors(props.name, value, `rewards.${props.rowId}`);
			let projectData_ = { ...props.projectDataRef.current };
			projectData_["rewards"][props.rowId] = {
				...projectData_["rewards"][props.rowId],
				[props.name]: value,
			};

			props.setProjectData(projectData_);
		} else if (props.setProjectData && value && props.source === "payment") {
			let projectData_ = { ...props.projectDataRef.current };
			projectData_["payment"]["UBOs"][props.rowId] = {
				...projectData_["payment"]["UBOs"][props.rowId],
				[props.name]: value,
			};

			props.setProjectData(projectData_);
		}
	}, [value]);
	return (
		<div>
			<DatePicker onChange={onChange} value={value} />
		</div>
	);
}
