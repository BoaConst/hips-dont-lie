import React from 'react';
import { Content, Wrapper } from '../../HealthInformationLanding.styles';
import { FaSearch } from "react-icons/fa";
import './HealthInformationLanding.css';


const HealthInformationLanding = () => {

	const handleChange = () => {
		let element = document.getElementById("query");

		console.log("Value: %s", element.value)
	};

	return (
		<div >
			<Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row" style={{backgroundColor:"#D3D3D3"}}>
				<div style={{display: "inherit", marginLeft: "15%"}}>
					<div className="tile tileColor">Tile 1</div>
					<div className="tile tileColor">Tile 2</div>
					<div className="tile tileColor">Tile 3</div>
				</div>
				<div style={{display: "inherit", marginLeft: "15%", marginTop: "2%"}}>
					<div className="tile tileColor">Tile 4</div>
					<div className="tile tileColor">Tile 5</div>
					<div className="tile tileColor" onClick={handleChange}>Tile 6</div>
				</div>
				<div style = {{display : "flex"}}>
					<textarea style={{ 
						height:"40px", 
						width:"85%", 
						marginTop: "3%", 
						marginLeft:"8%", 
						backgroundColor:"#5A5A5A"}}
						id="query">
					</textarea>
					<FaSearch style={{ 
						height:"40px", 
						marginTop: "3%"}}
						onClick={handleChange}
					></FaSearch>
				</div>
			</Content>
		</Wrapper>
		</div>
	);
} 

export default HealthInformationLanding;
