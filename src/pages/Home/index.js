import HomeCarousel from '../../components/HomeCarousel';
import HomeCards from '../../components/CardGrid';
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

export default function Home() {
  	const [searchParams] = useSearchParams();
	const [searchParamsMessage] = useState(searchParams.get('message'));

	useEffect(() => {
		// console.log("message: ", searchParamsMessage);
		setTimeout(() => {
			if(searchParamsMessage === "completed") {
				alert("Thank You For Contribution! You will get confirmation email soon. Thanks");
				window.location.replace("/");
			}
		}, 1000)
	}, [searchParamsMessage])

	// console.log("venlyAuth: ", venlyAuth);
  return (
    <div className="Home">
      <HomeCarousel />
      <HomeCards />
    </div>
  );
}
