import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Content, Wrapper } from '../../HealthInformationLanding.styles';
import './HealthInformationLanding.css';
import { useEffect } from 'react';


const HealthInformationLanding = (props) => {

	const tiles = document.querySelectorAll('.tile');
	const [showTable, setShowTable] = useState(props.showTable);
	const [query, setQuery] = useState("");
	const [data, setData] = useState("");

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

	useEffect(() => {
		const fetchData = async () => {
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
				setData(result.choices[0].text)
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [query]);

	const handleChange = () => {
		const element = document.getElementById("query");
		setQuery(element.value);
		if (query) {
			toggleTable();
			console.log(data);
		}
	};

	const toggleTable = () => {
		setShowTable(!showTable);
	};

	return (

		<Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
			<Content className="row" style={{ backgroundColor: "#D3D3D3" }}>
				{!showTable && (<div>
					<div style={{ display: "flex", marginLeft: "15%", marginTop: "1%" }}>
						<div className="tile tileColor" value>Tile 1</div>
						<div className="tile tileColor">Tile 2</div>
						<div className="tile tileColor">Tile 3</div>
					</div>
					<div style={{ display: "flex", marginLeft: "15%", marginTop: "2%" }}>
						<div className="tile tileColor">Tile 4</div>
						<div className="tile tileColor">Tile 5</div>
						<div className="tile tileColor">Tile 6</div>
					</div>
				</div>)}
				<div>
					{showTable && (
						<table>
							<thead>
								<tr>
									<th>Header 1</th>
									<th>Header 2</th>
									<th>Header 3</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Cell 1</td>
									<td>Cell 2</td>
									<td>Cell 3</td>
								</tr>
								<tr>
									<td>Cell 4</td>
									<td>Cell 5</td>
									<td>Cell 6</td>
								</tr>
							</tbody>
						</table>
					)}
				</div>
				<div className="search-bar">
					<input
						style={{
							height: "50px",
							width: "85%",
							marginTop: "3%",
							marginBottom: "3%",
							marginLeft: "8%",
							backgroundColor: "#5A5A5A"
						}}
						id="query"
						type="text"
					/>
					<button type="submit"
						onClick={handleChange}>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</Content>
		</Wrapper>

	);
}

export default HealthInformationLanding;
