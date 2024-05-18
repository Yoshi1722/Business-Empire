import React, {useState, useEffect} from "react";
import { GameSquare } from "./GameSquare";
import {Player} from "../Player";
import { BoardSection } from "./BoardSection";
import { SquareConfigData } from "./SquareData";
import SquareType from "./SquareType";
import { BusinessEmpireData } from "./Theme";
import { logger } from './logger';
export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  const totalSquares = 40;
  const [diceResults, setDiceResults] = useState([1, 1]);
  const [canRollAgain, setCanRollAgain] = useState(false);
  const [infoBox, setInfoBox] = useState({ visible: false, info: '', position: { x: 0, y: 0 } });

  let turn = 1;
  const playerImages = [
    'src/assets/images/player1.png',
    'src/assets/images/player2.png',
    'src/assets/images/player3.png',
    'src/assets/images/player4.png',
  ];
  const [players, setPlayers] = useState<Player[]>([
    new Player('Yoshi', 1500, [], playerImages[0], "#5167F5"),
    new Player('Piotrek', 1500, [],playerImages[1],"#F0B435"),
    new Player('Piotrek vol. 2', 1500, [],playerImages[2],"#F45444"),
    new Player('Arturro', 1500, [],playerImages[3],"#8FF026"),
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [turnEnded, setTurnEnded] = useState(true);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    logger.setCallback(setLogs);

    
    setPlayers(...[players]);
  }, []);

  const rollDice = () => {
    
     const updatedPlayers = [...players];
     const currentPlayer = updatedPlayers[currentPlayerIndex];
    if (!turnEnded) {
      alert("Musisz zakończyć turę, zanim rzucisz kostką!");
      return;
    }
    const diceOne = Math.floor(Math.random() * 6 + 1);
    const diceTwo = Math.floor(Math.random() * 6 + 1);
    const totalRoll = diceOne + diceTwo;
    logger.log(players[currentPlayerIndex].name + " wyrzucił " + totalRoll);
    

    setDiceResults([diceOne, diceTwo]);
    
    players[currentPlayerIndex].move(totalRoll, totalSquares, BusinessEmpireData);
    if (currentPlayer.hasLost) {
      updatedPlayers.splice(currentPlayerIndex, 1);
      if (updatedPlayers.length === 0) {
        alert("All players have lost the game.");
        return;
      }
    }
    setPlayers([...players]);
    setTurnEnded(false);

  };

    const endTurn = () => {
      setTurnEnded(true);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    };


  
  
  function calculateGridPosition(position) {
    const perSide = 10;
    const gridFraction = 100 / (perSide +2);

    let percentTop = 0, percentLeft = 0;

    if(position===1){
      percentLeft = 95;
      percentTop = 95;
    }else if (position >= 2 && position <= 11) {
      percentLeft = (12 - position) * gridFraction;
      percentTop = 100 - gridFraction/2;
    } else if (position >= 12 && position <= 19) {
      percentLeft = 5;
      percentTop = 100 - ((position%perSide) * gridFraction);
    }else if(position === 20){
      percentLeft = 5;
      percentTop = 15;
    }else if(position === 21){
      percentLeft = 5;
      percentTop = 6;
    }else if (position >=22 && position <= 29) {
      percentLeft = Math.round((position%perSide)  * gridFraction);
      percentTop = 5;
    }else if(position === 30){
      percentLeft = 85;
      percentTop = 5;
    }else if(position === 31){
      percentLeft = 95;
      percentTop = 5;
    }else if (position >=32 && position <= 39) {
      percentLeft = 95;
      percentTop = 9 * (position%10-0.5);
    }else if(position === 40){
      percentLeft = 95;
      percentTop = 84;
    }

    return { top: percentTop + '%', left: percentLeft + '%' };
  }

  const renderPawns = () => {
    return players.map((player, index) => {
      const pos = calculateGridPosition(player.position);
      return (
        <div
          key={index}
          className="pawn"
          style={{
            top: pos.top,
            left: pos.left,
            backgroundImage: `url(${player.image})`,
          }}
        />
      );
    });
  };





  const renderPlayerCards = () => {
    return players.map((player, index) => (
      <div key={index} >
        <h3>{player.name}</h3>
        <p>Money: ${player.money}</p>
        <div className="propies">
           <p>Properties: {player.properties.join(', ') || 'None'}</p>
        </div>
       
      </div>
    ));
  };


  return (
    <React.Fragment>
      <div className="board">
      {num_squares.map((n, index) => {
        const id: number = index + 1;

        return (<GameSquare
          id={id}
          key={id}
        />)
      })}
      
      {renderPawns()}
      <div className="center-square square">
        
        <div className="playerCards">{renderPlayerCards()}</div>
        
        <div className="buttons">
          <button className="roll-dice-btn btn-eff" onClick={rollDice}>
          {players[currentPlayerIndex].name}, Rzuć kostkami
        </button>
        <button className="buy-prop-btn btn-eff" onClick={() => players[currentPlayerIndex].buyProperty(players[currentPlayerIndex].position, BusinessEmpireData)}>Kup posiadłość</button>
        <button className="end-turn-btn btn-eff" onClick={endTurn} >Zakończ turę</button>

        <div className="dice-container">
            <img className="dice-image" src={`src/assets/images/${diceResults[0]}.png`} alt={`Dice ${diceResults[0]}`} />
            <img className="dice-image" src={`src/assets/images/${diceResults[1]}.png`} alt={`Dice ${diceResults[1]}`} />
        </div>
        <div className="text-container">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
      </div></div>
        
      
    </div>
    
    </React.Fragment>
  );
}
