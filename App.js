import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Modal, TouchableOpacity, View } from "react-native";
import { useEffect, useMemo, useState } from "react";

var mainGameArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
var currentPlayer = "X";
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
    currentPlayer = "X";
    isOver = false;
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
    return false;
  };

  //Game logic on selecting a column
  const gameLogic = (cell) => {
    if (!cell.isSelected && !isOver) {
      const newGameArray = gameArray.map((gameCell) => {
        if (gameCell.pos === cell.pos && !gameCell.isSelected) {
          gameCell.player = currentPlayer;
          gameCell.isSelected = true;
        }
        return gameCell;
      });
      setGameArray(newGameArray);
      isOver = checkWin();
      if (!isOver) {
        if (currentPlayer === "X") {
          currentPlayer = "O";
        } else {
          currentPlayer = "X";
        }
      }
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
              style={
                !cell.isSelected
                  ? styles.notSelected
                  : cell.player === "X"
                  ? styles.xSelected
                  : styles.oSelected
              }
              key={i}
              onPress={() => gameLogic(cell)}
            >
              <Text style={cell.player === "X" ? styles.xText : styles.oText}>
                {cell.player}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {isOver ? (
        <Text
          style={
            currentPlayer === "X" ? styles.xPlayerText : styles.oPlayerText
          }
        >
          {currentPlayer} won
        </Text>
      ) : (
        <Text
          style={
            currentPlayer === "X" ? styles.xPlayerText : styles.oPlayerText
          }
        >
          {currentPlayer}'s turn
        </Text>
      )}
      <TouchableOpacity
        style={{
          width: 300,
          height: 30,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
        }}
        onPress={() => start()}
      >
        <Text style={{ fontSize: 15, fontWeight: "600", fontFamily: "Roboto" }}>
          Play Again
        </Text>
      </TouchableOpacity>
      <Modal visible={isOver}>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          {isOver ? (
            <Text
              style={
                currentPlayer === "X" ? styles.xPlayerText : styles.oPlayerText
              }
            >
              {currentPlayer} won
            </Text>
          ) : (
            <Text
              style={
                currentPlayer === "X" ? styles.xPlayerText : styles.oPlayerText
              }
            >
              {currentPlayer}'s turn
            </Text>
          )}
          <TouchableOpacity
            style={{
              width: 300,
              height: 30,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
            onPress={() => start()}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "600", fontFamily: "Roboto" }}
            >
              Play Again
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#0000",
  },
  texctHeading: { fontSize: 40, fontWeight: "500", color: "black" },
  container: {
    width: 350,
    height: 350,
    backgroundColor: "#0000",
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
    rain: "#60C4FF",
    gameRed: "#D8A99E",
    gameGreen: "#5D9C59",
  },
  xSelected: {
    width: 100,
    height: 100,
    backgroundColor: "#60C4FF",
    margin: 8,
    opacity: 0.4,
    justifyContent: "center",
  },
  notSelected: {
    width: 100,
    height: 100,
    backgroundColor: "#00003F",
    margin: 8,
    opacity: 0.2,
  },
  oSelected: {
    width: 100,
    height: 100,
    backgroundColor: "#D8A99E",
    margin: 8,
    opacity: 0.4,
    justifyContent: "center",
  },
  oText: { color: "red", fontSize: 40, textAlign: "center" },
  xText: { color: "blue", fontSize: 40, textAlign: "center" },
  oPlayerText: {
    color: "#D8A99E",
    fontSize: 40,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  xPlayerText: {
    color: "#60C4FF",
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});
