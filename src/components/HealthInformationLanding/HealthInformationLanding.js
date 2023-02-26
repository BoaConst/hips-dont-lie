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
	const [source_language, setSourceLang] = useState("");
	const [english_text, setEnglishData] = useState("");
	const [translated_data, setTData] = useState("");

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
			const googleApiKey = 'AIzaSyC3cuIyYnQR1zOPFv00jzy7tpulMNajR_0';
			const googleapiUrl = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
			const detect_url = `https://translation.googleapis.com/language/translate/v2/detect?key=${googleApiKey}`;
			// console.log(postData.prompt)
			// let openaiMessage = "";
			// Language Detect API 	
			try {
				const detectData = {
					q: query,
				}
				// console.log(googleData)
				const response_detectAPI = await fetch(detect_url, {
					method: 'POST',
					body: JSON.stringify(detectData)
				});
				let detect_language = await response_detectAPI.json();
				console.log(detect_language.data.detections[0][0].language)
				setSourceLang(detect_language.data.detections[0][0].language)
			} catch (error) {
				console.error(error);
			}
			console.log("Language")
			console.log(source_language)
			// CONVERSION TO ENGLISH
			// try {
			// 	const googleData = {
			// 		q: data,
			// 		source: source_language,
			// 		target: "en",
			// 		format: 'text',
			// 		key: googleApiKey,
			// 	}
			// 	// console.log(googleData)
			// 	const response_openAI = await fetch(googleapiUrl, {
			// 		method: 'POST',
			// 		body: JSON.stringify(googleData)
			// 	});
			// 	let english = await response_openAI.json();
			// 	console.log(english.data.translations[0].translatedText)
			// 	setEnglishData(english.data.translations[0].translatedText)
			// } catch (error) {
			// 	console.error(error);
			// }
			let message=''; 
			//OPEN AI Call
			try {
				const postData = {
					"model": "text-davinci-003",
					"prompt": query + ", Provide answer in medical/health context.",
					"temperature": 0,
					"max_tokens": 200
				};	
				const response = await fetch(apiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer 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'
					},
					body: JSON.stringify(postData)
				});
				// console.log(response)
				let result = await response.json();
				message = result.choices[0].text
				setData(result.choices[0].text)
			} catch (error) {
				console.error(error);
			}

			try {
				const googleData = {
					q: message,
					source: "en",
					target: "hi",
					format: 'text',
					key: googleApiKey,
				}
				// console.log(googleData)
				const response_openAI = await fetch(googleapiUrl, {
					method: 'POST',
					body: JSON.stringify(googleData)
				});
				let resp_openAI = await response_openAI.json();
				// console.log(resp_openAI.data.translations[0].translatedText)
				setTData(resp_openAI.data.translations[0].translatedText)
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
			console.log(translated_data)
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
