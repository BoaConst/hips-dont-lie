import { faSearch, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Content, Wrapper } from '../../HealthInformationLanding.styles';
import './HealthInformationLanding.css';
import { useEffect } from 'react';
import { COMMON_AILMETS } from '../../constants/COMMON_AILMENTS';
import { AILMENT_STRING } from '../../constants/AILMENT_STRING';


const HealthInformationLanding = (props) => {
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

	const flipTileContentCPR = () => {
		let tile = document.getElementById("tile1");
		if(tile.textContent.toString() === AILMENT_STRING.CPR.toString()) {
			tile.textContent = COMMON_AILMETS.CPR
		}
		else {
			tile.textContent = AILMENT_STRING.CPR
		}
	}

	const flipTileContentHeatStroke = () => {
		let tile = document.getElementById("tile2");
		if(tile.textContent.toString() === AILMENT_STRING.HEAT_STROKE.toString()) {
			tile.textContent = COMMON_AILMETS['Heat Stroke']
		}
		else {
			tile.textContent = AILMENT_STRING.HEAT_STROKE
		}
	}
	const flipTileContentMinorBurns = () => {
		let tile = document.getElementById("tile3");
		if(tile.textContent.toString() === AILMENT_STRING.MINOR_BURNS.toString()) {
			tile.textContent = COMMON_AILMETS['Minor Burns']
		}
		else {
			tile.textContent = AILMENT_STRING.MINOR_BURNS
		}
	}
	const flipTileContentMinorCuts = () => {
		let tile = document.getElementById("tile4");
		if(tile.textContent.toString() === AILMENT_STRING.MINOR_CUTS.toString()) {
			tile.textContent = COMMON_AILMETS['Minor Cuts']
		}
		else {
			tile.textContent = AILMENT_STRING.MINOR_CUTS
		}
	}
	const flipTileContentInsulin = () => {
		let tile = document.getElementById("tile5");
		if(tile.textContent.toString() === AILMENT_STRING.DIABETES.toString()) {
			tile.textContent = COMMON_AILMETS['Diabetes (Insulin)']
		}
		else {
			tile.textContent = AILMENT_STRING.DIABETES
		}
	}
	const flipTileContentAsthmaAttack = () => {
		let tile = document.getElementById("tile6");
		if(tile.textContent.toString() === AILMENT_STRING.ASTHMA_ATTACK.toString()) {
			tile.textContent = COMMON_AILMETS['Asthma Attack']
		}
		else {
			tile.textContent = AILMENT_STRING.ASTHMA_ATTACK
		}
	}

	return (
			<Content className="row" style={{ backgroundColor: "#D3D3D3" }}>
				{!showTable && (<div>
					<img src= '/src/images/logo.png'>
						</img>
					<div style={{ display: "flex", marginLeft:"15%", marginTop: "1%" }}>
						<div id="tile1" className="tile tileColor tileCPR" onClick={flipTileContentCPR}>{AILMENT_STRING.CPR}</div>
						
						<div id="tile3" className="tile tileColor tileMinorBurns" onClick={flipTileContentMinorBurns}>{AILMENT_STRING.MINOR_BURNS}</div>
						<div id="tile2" className="tile tileColor tileHeatStroke" onClick={flipTileContentHeatStroke}>{AILMENT_STRING.HEAT_STROKE}</div>
					</div>
					<div style={{ display: "flex", marginLeft:"15%", marginTop: "2%" }}>
						<div id="tile4"className="tile tileColor tileMinorCuts" onClick={flipTileContentMinorCuts}>{AILMENT_STRING.MINOR_CUTS}</div>
						<div id="tile5" className="tile tileColor tileInsulin" onClick={flipTileContentInsulin}>{AILMENT_STRING.DIABETES}</div>
						<div id="tile6" className="tile tileColor tileAsthmaAttack" onClick={flipTileContentAsthmaAttack}>{AILMENT_STRING.ASTHMA_ATTACK}</div>
					</div>
				</div>)}
				<div className="search-bar">
					{showTable && (<div>
						<button type="submit"
							onClick={handleChange}>
							<FontAwesomeIcon icon={faBackward} />
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
