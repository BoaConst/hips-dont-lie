import React from 'react';
import { Content, Wrapper } from '../../HealthInformationLanding.styles';
import SearchBar from '../SearchBar/SearchBar';
import './HealthInformationLanding.css';


const HealthInformationLanding = () => {

	const tiles = document.querySelectorAll('.tile');

	tiles.forEach(tile => {
		let isClicked = false;
		tile.addEventListener('click', () => {
			if (!isClicked) {
				// Display information about the clicked tile
				tile.textContent = 'Clicked!';
				tile.style.backgroundColor = 'blue';
				isClicked = true;
			} else {
				// Revert back to original state
				tile.textContent = 'Click me';
				tile.style.backgroundColor = '#5A5A5A';
				isClicked = false;
			}
		});
	});

	return (
		<div >
			<Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
				<Content className="row" style={{ backgroundColor: "#D3D3D3" }}>
					<div style={{ display: "inherit", marginLeft: "15%", marginTop: "1%" }}>
						<div className="tile tileColor" value>Tile 1</div>
						<div className="tile tileColor">Tile 2</div>
						<div className="tile tileColor">Tile 3</div>
					</div>
					<div style={{ display: "inherit", marginLeft: "15%", marginTop: "2%" }}>
						<div className="tile tileColor">Tile 4</div>
						<div className="tile tileColor">Tile 5</div>
						<div className="tile tileColor">Tile 6</div>
					</div>
					<SearchBar></SearchBar>
				</Content>
			</Wrapper>
		</div >
	);
}

export default HealthInformationLanding;
