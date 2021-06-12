import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#191930",
  },
  cardContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    marginVertical: 10,
    width: 300,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  aboutItems: {
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});

const buttons = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#276fdb",
    width: 20,
    color: "white",
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 2
  },
});

const menuStyles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-around",
  },
  menuButton: {
    height: 100,
    width: "40%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "25%",
    width: "100%",
  },
});

export { styles, buttons, menuStyles };
