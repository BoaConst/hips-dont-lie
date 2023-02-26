import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Content, Wrapper } from '../../HealthInformationLanding.styles';
import './HealthInformationLanding.css';
import { useEffect } from 'react';
import { COMMON_AILMETS } from '../../constants/COMMON_AILMENTS';
import { AILMENT_STRING } from '../../constants/AILMENT_STRING';


const HealthInformationLanding = (props) => {
	const tiles = document.querySelectorAll('.tile');
	const tileNames = Object.keys(COMMON_AILMETS);
	
	tiles.forEach(tile => {
		let isClicked = false;
		tile.addEventListener('click', () => {
			if (!isClicked) {
				// Display information about the clicked tile
				console.log("here")
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

	const [showTable, setShowTable] = useState(props.showTable);
	const [query, setQuery] = useState("");
	const [data, setData] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			if (query) {
				const apiUrl = 'https://api.openai.com/v1/completions';

				const postData = {
					"model": "text-davinci-003",
					"prompt": query + ", Provide answer in medical/health context.",
					"temperature": 0,
					"max_tokens": 200
				};

				console.log(postData.prompt)

				try {
					const response = await fetch(apiUrl, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer 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'
						},
						body: JSON.stringify(postData)
					});
					let result = await response.json();
					setData(result.choices[0].text);
					console.log(data);
				} catch (error) {
					console.error(error);
				}
			}

		};

		fetchData();
	}, [query]);

	const handleChange = () => {
		const element = document.getElementById("query");
		setQuery(element.value);
		if (query && data) {
			toggleTable();
		}
	};

	const updateResults = () => {

	};

	const toggleTable = () => {
		setShowTable(!showTable);
	};

	return (
			<Content className="row" style={{ backgroundColor: "#D3D3D3" }}>
				{!showTable && (<div>
					<div style={{ display: "flex", marginLeft:"15%", marginTop: "1%" }}>
						<div className="tile tileColor tileCPR">{AILMENT_STRING.CPR}</div>
						<div className="tile tileColor tileHeatStroke">{AILMENT_STRING.HEAT_STROKE}</div>
						<div className="tile tileColor tileMinorBurns">{AILMENT_STRING.MINOR_BURNS}</div>
					</div>
					<div style={{ display: "flex", marginLeft:"15%", marginTop: "2%" }}>
						<div className="tile tileColor tileMinorCuts">{AILMENT_STRING.MINOR_CUTS}</div>
						<div className="tile tileColor tileInsulin">{AILMENT_STRING.DIABETES}</div>
						<div className="tile tileColor tileAsthmaAttack">{AILMENT_STRING.ASTHMA_ATTACK}</div>
					</div>
				</div>)}
				<div className="search-bar">
					{showTable && (<div>
						<button type="submit"
							onClick={handleChange}>
							<FontAwesomeIcon icon={faSearch} />
						</button>
						<input
						style={{
							height: "50px",
							width: "80%",
							marginTop: "3%",
							marginBottom: "3%",
							marginLeft: "8%",
							backgroundColor: "#5A5A5A"
						}}
						id="query"
						type="text"
					/>

					<button type="submit"
						onClick={updateResults}>
						<FontAwesomeIcon icon={faSearch} />
					</button>
					</div>)}
					{!showTable && (<div style={{textAlign:"center"}}>
						<input
						style={{
							height: "50px",
							width: "70%",
							marginTop: "2%",
							marginBottom: "3%",
							backgroundColor: "#5A5A5A"
						}}
						id="query"
						type="text"
					/>

					<button type="submit"
						onClick={handleChange}>
						<FontAwesomeIcon icon={faSearch} />
					</button>
					</div>)}
					
				</div>
				{showTable && (<div>
					<span className="tile tileColor" style={{ marginLeft: "6%", marginBottom: "3%", width: "90%", height: "fit-content" }}><p style={{ whiteSpace: "pre-line" }}>{data}</p></span>
				</div>

				)}

			</Content>

	);
}

export default HealthInformationLanding;
