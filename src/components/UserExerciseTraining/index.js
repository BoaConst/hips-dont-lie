import React, { useEffect, useState } from "react";
import { rotateColors, simulateDeuteranope, simulateProtanopia, simulateTritanopia } from "../../compute/ColorSpace";
import Slider from "../Slider";
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import { calculatePlane } from "../../compute/Normal";
import { neutralWhite, LMS1, LMS2 } from "../../constants/ImageConstants";
import { colorBlindTypes } from "../../constants/CBT";
import { parse } from "mathjs";



const UserExerciseTraining = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const type = parse(searchParams.get("colorBlind"));
    const simulation = parse(searchParams.get("simulation"));

    let testingResult = parse(searchParams.get("testingResult"));
    const incorrectlyGuessedColors = []
    
    if(testingResult.toString() !== "None") {
      testingResult = JSON.parse(testingResult);
      for(let colorDetails of testingResult) {
        if(colorDetails.correctlyGuessed.toString() !== 'true') {
          incorrectlyGuessedColors.push(colorDetails.color.name);
        }
      }
    }

    const colorArray = [[237, 238, 51, 0], [79, 255, 79, 0], [58, 62, 233, 0], [141, 0, 216, 0], [224, 3, 0, 0], [151, 91, 57, 0]]

    const [rotationAngle, setRotationAngle] = useState(0);
    const [resetSlider, setResetSlider] = useState(false);

    const colorOne = colorArray[0];
    const colorTwo = colorArray[1];
    const colorThree = colorArray[2];
    const colorFour = colorArray[3];
    const colorFive = colorArray[4];
    const colorSix = colorArray[5];

    const [backgroundColorOne, setBackgroundColorOne] = useState(colorOne);
    const [backgroundColorTwo, setBackgroundColorTwo] = useState(colorTwo);
    const [backgroundColorThree, setBackgroundColorThree] = useState(colorThree);
    const [backgroundColorFour, setBackgroundColorFour] = useState(colorFour);
    const [backgroundColorFive, setBackgroundColorFive] = useState(colorFive);
    const [backgroundColorSix, setBackgroundColorSix] = useState(colorSix);

    const circleRadius = 250;
    const smallCircleRadius = 70;
    const smallCircleColors = [{ color : backgroundColorOne, name : "Yellow" }, { color : backgroundColorTwo, name : "Green" }, { color : backgroundColorThree, name : "Blue" },
                               { color : backgroundColorFour, name : "Purple" }, { color : backgroundColorFive, name : "Red" }, { color : backgroundColorSix, name : "Brown" }]
    
    const sendDataToTest = [{ color : colorOne, name : "Yellow" }, { color : colorTwo, name : "Green" }, { color : colorThree, name : "Blue" },
                               { color : colorFour, name : "Purple" }, { color : colorFive, name : "Red" }, { color : colorSix, name : "Brown" }]               
    const Circle = (props) => {
        return (
            <div
              style={{
                width: props.size,
                height: props.size,
                backgroundColor: `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`,
                borderRadius: '50%',
                position: 'absolute',
                top: props.top,
                left: props.left,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                border: props.hasBorder ? '5px solid black' : 'none',
              }}
            >
                {props.name}
            </div>
          );
    }

    const smallCirclePositions = smallCircleColors.map((obj, i) => {
        const { color } = obj
        const { name } = obj
        let hasBorder = false;
        for(let i = 0; i <= incorrectlyGuessedColors.length; i++){
          if (name === incorrectlyGuessedColors[i]){
            hasBorder = true;
          }
        }
        const angle = (2 * Math.PI / smallCircleColors.length) * i;
        const x = circleRadius + (circleRadius - smallCircleRadius) * Math.sin(angle);
        const y = circleRadius + (circleRadius - smallCircleRadius) * Math.cos(angle);
        return { top: y - smallCircleRadius, left: x - smallCircleRadius, color: color, name : obj.name, hasBorder };
      });

    useEffect(() => {
        
        let resOne = rotateColors([colorOne], rotationAngle);
        let resTwo = rotateColors([colorTwo], rotationAngle);
        let resThree = rotateColors([colorThree], rotationAngle);
        let resFour = rotateColors([colorFour], rotationAngle);
        let resFive = rotateColors([colorFive], rotationAngle);
        let resSix = rotateColors([colorSix], rotationAngle);

        if(simulation.toString() === 'true') {
          switch(type.toString()) {
            case colorBlindTypes.Protanopia: 
                                            resOne = simulateProtanopia([resOne[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resTwo = simulateProtanopia([resTwo[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resThree = simulateProtanopia([resThree[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resFour = simulateProtanopia([resFour[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resFive = simulateProtanopia([resFive[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resSix = simulateProtanopia([resSix[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            break;
            case colorBlindTypes.Deuteranopia:
                                            resOne = simulateDeuteranope([resOne[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resTwo = simulateDeuteranope([resTwo[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resThree = simulateDeuteranope([resThree[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resFour = simulateDeuteranope([resFour[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resFive = simulateDeuteranope([resFive[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            resSix = simulateDeuteranope([resSix[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                                            break;
            default:
                    resOne = simulateTritanopia([resOne[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    resTwo = simulateTritanopia([resTwo[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    resThree = simulateTritanopia([resThree[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    resFour = simulateTritanopia([resFour[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    resFive = simulateTritanopia([resFive[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
                    resSix = simulateTritanopia([resSix[0]], calculatePlane(neutralWhite, LMS1), calculatePlane(neutralWhite, LMS2), neutralWhite, false);
          }
        }

        setBackgroundColorOne(resOne[0]);
        setBackgroundColorTwo(resTwo[0]);
        setBackgroundColorThree(resThree[0])
        setBackgroundColorFour(resFour[0]);
        setBackgroundColorFive(resFive[0]);
        setBackgroundColorSix(resSix[0]);
            
    }, [rotationAngle, setBackgroundColorOne, setBackgroundColorTwo, setBackgroundColorThree, setBackgroundColorFour, 
        setBackgroundColorFive, setBackgroundColorSix]);
    
    const handleSliderInput = (value) => {
        setResetSlider(false);
        setRotationAngle(value);
    }

    const resetSlide = () =>{
        setRotationAngle(0);
        setResetSlider(true);
    }

    const navigateToTesting = () => {
        navigate({
            pathname: "/userExerciseTesting",
            search: createSearchParams({
                colorBlind : type,
                simulation : simulation,
                colorNameValue : JSON.stringify(sendDataToTest)
            }).toString()
        });
    }
    const navigateToOptions = () => {
      navigate("/");
    }
    return(
        <div>
          <button onClick={navigateToOptions}>Options</button>
        <div style={{ position: 'relative', width: circleRadius * 2, height: circleRadius * 2 }}>
        <div
          style={{
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: '50%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        ></div>
        <div style={{ position: 'absolute', left: '50%',
                      transform: 'translate(-50%, -50%)' }}>
        {smallCirclePositions.map((pos, i) => (
          <Circle
            key={i}
            size={smallCircleRadius * 2}
            color={pos.color}
            top={pos.top}
            left={pos.left}
            name={pos.name}
            hasBorder={pos.hasBorder}
          />
        ))}
        </div>
      </div>
      <div style={{display: "flex", marginTop: "20px"}}>
            <button style={{display: "flex", width: "10%", justifyContent: "center", alignItems: "center", marginRight: "100px", marginLeft : "150px"}} onClick={resetSlide}>Reset</button>
            <Slider min={-60} max={60} onChangeCallback={handleSliderInput} reset={resetSlider}></Slider>
            <button style={{display: "flex", width: "10%", justifyContent: "center", alignItems: "center", marginLeft: "100px"}} onClick={navigateToTesting}>Test</button>
      </div>
      </div>
      
    )
}


export default UserExerciseTraining;