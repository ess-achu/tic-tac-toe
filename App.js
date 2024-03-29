import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

var mainGameArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
var currentPlayer = "O";
var isOver = false;

export default function App() {
  var [gameArray, setGameArray] = useState([]);
  const start = () => {
    var newBlocks = [];
    while (newBlocks.length < mainGameArray.length) {
      newBlocks.push({
        player: "",
        isSelected: false,
        pos: newBlocks.length,
      });
    }
    setGameArray(newBlocks);
  };

  //Winner check logic
  const checkWinDiagonal = () => {
    if (
      gameArray[0]?.player === gameArray[4]?.player &&
      gameArray[0]?.player === gameArray[8]?.player &&
      gameArray[0]?.player !== ""
    ) {
      return true;
    } else if (
      gameArray[2]?.player === gameArray[4]?.player &&
      gameArray[2]?.player === gameArray[6]?.player &&
      gameArray[2]?.player !== ""
    ) {
      return true;
    }
    return false;
  };
  const checkWinRow = () => {
    if (
      gameArray[0]?.player === gameArray[1]?.player &&
      gameArray[0]?.player === gameArray[2]?.player &&
      gameArray[0]?.player !== ""
    ) {
      return true;
    } else if (
      gameArray[3]?.player === gameArray[4]?.player &&
      gameArray[3]?.player === gameArray[5]?.player &&
      gameArray[3]?.player !== ""
    ) {
      return true;
    } else if (
      gameArray[6]?.player === gameArray[7]?.player &&
      gameArray[6]?.player === gameArray[8]?.player &&
      gameArray[6]?.player !== ""
    ) {
      return true;
    }
    return false;
  };
  const checkWinColumn = () => {
    if (
      gameArray[0]?.player === gameArray[3]?.player &&
      gameArray[0]?.player === gameArray[6]?.player &&
      gameArray[0]?.player !== ""
    ) {
      return true;
    } else if (
      gameArray[1]?.player === gameArray[4]?.player &&
      gameArray[1]?.player === gameArray[7]?.player &&
      gameArray[1]?.player !== ""
    ) {
      return true;
    } else if (
      gameArray[2]?.player === gameArray[5]?.player &&
      gameArray[2]?.player === gameArray[8]?.player &&
      gameArray[2]?.player !== ""
    ) {
      return true;
    }
    return false;
  };
  const checkWin = () => {
    if (checkWinColumn() || checkWinDiagonal() || checkWinRow()) {
      return true;
    }
  };

  //Game logic on selecting a column
  const gameLogic = (cell) => {
    if (!cell.isSelected) {
      const newGameArray = gameArray.map((gameCell) => {
        if (gameCell.pos === cell.pos && !gameCell.isSelected) {
          gameCell.player = currentPlayer;
          gameCell.isSelected = true;
        }
        return gameCell;
      });
      setGameArray(newGameArray);
    }
  };

  //Game start
  useEffect(() => {
    start();
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.texctHeading}>Tic-Tac-Toe</Text>
      <View style={styles.container}>
        {gameArray.map((cell, i) => {
          return (
            <TouchableOpacity
              style={!cell.isSelected ? styles.notSelected : cell.player === "X" ? styles.xSelected : styles.oSelected }
              key={i}
              onPress={() => gameLogic(cell)}
            >
              <Text>{cell.player}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.playerText}>{currentPlayer}'s turn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#153E7E",
  },
  texctHeading: { fontSize: 40, fontWeight: "500", color: "#E2F4C5" },
  container: {
    width: 350,
    height: 350,
    backgroundColor: "#00003F",
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  playerText: {
    fontSize: 40,
    fontWeight: "500",
    color: "#E2F4C5",
    marginTop: 10,
  },
  colors: {
    rain: "#F3F3F3",
    gameRed: "#DF2E38",
    gameGreen: "#5D9C59",
  },
  xSelected: {
    width: 100,
    height: 100,
    backgroundColor: "#DF2E38",
    margin: 8,
  },
  notSelected: {
    width: 100,
    height: 100,
    backgroundColor: "#00003F",
    margin: 8,
  },
  oSelected: {
    width: 100,
    height: 100,
    backgroundColor: "#5D9C59",
    margin: 8,
  },
});
