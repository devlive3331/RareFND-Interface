import CategoryGridCard from "../../components/CategoryGridCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CategoryCarousel from "../../components/CategoryCarousel";

export default function Category() {
	const [categoryData, setCategoryData] = useState({});
	const [categoryProjects, setCategoryProjects] = useState({});
	const location = useLocation();
	const [categoryName, setCategoryName] = useState(
		window.location.pathname
			.split("/")
			.at(-1)
			.replace(new RegExp("-", "g"), " ")
	);
	useEffect(() => {
		setCategoryName(
			window.location.pathname
			.split("/")
			.at(-1)
			.replace(new RegExp("-", "g"), " ")
		);
	}, [location.pathname]);
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/category/")
			.then((response) => {
				const data = response.data.categories;
				for (let i = 0; i < data.length; i++) {
					if (data[i].name.toLowerCase() === categoryName.toLowerCase()) {
						setCategoryData({
							title: data[i].name,
							image: data[i].image,
						});
						break;
					}
				}
			})
			.then(() => {
				axios
					.get(
						process.env.REACT_APP_BASE_URL +
							`/api/project/category/${categoryName}/`
					)
					.then((response) => {
						setCategoryProjects(response.data.projects);
					});
			});
	}, [categoryName]);
	return (
		<div>
			<CategoryCarousel image={categoryData.image} title={categoryData.title} />
			<CategoryGridCard
				categoryProjects={categoryProjects}
				title={categoryData.title}
			/>
		</div>
	);
}
