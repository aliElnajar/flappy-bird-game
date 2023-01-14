import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  GRAVITY,
  BIRD_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  OBSTACLE_WIDTH,
  JUMB_HEIGHT,
} from "./Constans";
let OBSTACLE_GAP = 200;
function App() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(150);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);
  const BOTTOM_OBSTACLE_HEIGHT = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;

  // gravity effect on bird to make its position decrease overtime
  useEffect(() => {
    let gravityTimer;
    if (gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      gravityTimer = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY);
      }, 30);
    }
    return () => clearInterval(gravityTimer);
  }, [gameHasStarted, birdPosition]);

  // to move obstacle position through the gamebox we change its left positioning from the highest till its completely passed the box
  useEffect(() => {
    let obstacleTimer;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleTimer = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
      }, 30);
    } else {
      setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
      setObstacleHeight(
        Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP))
      );
      OBSTACLE_GAP = OBSTACLE_GAP > 60 ? OBSTACLE_GAP - 5 : OBSTACLE_GAP;
      gameHasStarted && setScore((score) => score + 1);
    }
    return () => clearInterval(obstacleTimer);
  }, [gameHasStarted, obstacleLeft]);

  // to see if bird and any obstacle are collided in vertical and horizontal level
  //bird position horizontally fixed and obstacle moves horizontally towards the bird
  // will collide when bird is within obstacle height ,and obstacle position is 0 which will last for obstacle width while the whole obstacle will pass by that point

  useEffect(() => {
    const hasCollidedWithTopObstacle =
      birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottomObstacle =
      birdPosition <= 500 && birdPosition >= 500 - BOTTOM_OBSTACLE_HEIGHT;

    if (
      obstacleLeft > 0 &&
      obstacleLeft <= OBSTACLE_WIDTH &&
      (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle)
    ) {
      setGameHasStarted(false);
      setScore(0);
      OBSTACLE_GAP = 150;
    }
  }, [birdPosition, obstacleHeight, BOTTOM_OBSTACLE_HEIGHT, obstacleLeft]);

  // onClick handler to start the game and raise the bird position
  const raisingBird = () => {
    if (!gameHasStarted) setGameHasStarted(true);
    else if (birdPosition - JUMB_HEIGHT <= 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition((birdPosition) => birdPosition - JUMB_HEIGHT);
    }
  };
  return (
    <Div>
      <Gamebox width={GAME_WIDTH} height={GAME_HEIGHT} onClick={raisingBird}>
        {!gameHasStarted ? <h1>Start the game</h1> : null}
        <Obstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle
          top={GAME_HEIGHT - (obstacleHeight + BOTTOM_OBSTACLE_HEIGHT)}
          width={OBSTACLE_WIDTH}
          height={BOTTOM_OBSTACLE_HEIGHT}
          left={obstacleLeft}
        />
        <Bird top={birdPosition} size={BIRD_SIZE} />
        <p>{score}</p>
      </Gamebox>
    </Div>
  );
}

export default App;

const Bird = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  width: ${(props) => props.size}px;
`;
const Gamebox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: blue;
  position: relative;
  overflow: hidden;
  h1 {
    color: yellow;
    position: absolute;
    left: 20%;
    top: 25%;
    font-weight: 400;
    font-size: 3rem;
    white-space: nowrap;
  }
  p {
    color: white;
    position: absolute;
    left: 50%;
    top: 0;
  }
`;

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-color: green;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
`;
