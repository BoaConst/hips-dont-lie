import React from 'react';
import { Content, Wrapper } from '../../HealthInformationLanding.styles';

import ChatbotWidget from '../ChatBotWidget/ChatBotWidget';
import './HealthInformationLanding.css';
const HealthInformationLanding = () => {

	
	return (
		// <div className="container"></div>
		<Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
			<div className="tile red">Tile 1</div>
			<div className="tile green">Tile 2</div>
			<div className="tile blue">Tile 3</div>
			<div className="tile red">Tile 4</div>
			<div className="tile green">Tile 5</div>
			<div className="tile blue">Tile 6</div>

			<textarea style={{height:"24px", width:"80%", marginLeft:"10%" }}></textarea>
			</Content>
		</Wrapper>
	);
} 

export default HealthInformationLanding;
