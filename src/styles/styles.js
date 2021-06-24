import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
  },
  centerText: {
    textAlign: "center",
  },
  headerText: {
    fontSize: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#191930",
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    marginVertical: 10,
    width: 300,
    height: 250,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  restoredCard: {
    position: "absolute",
    backgroundColor: "#32d15d",
    justifyContent: "center",
  },
  deletedCard: {
    position: "absolute",
    backgroundColor: "#d13232",
    justifyContent: "center",
  },
  aboutItems: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "75%",
    flex: 1,
  },
  filterHeader: {
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    height: "10%",
    borderRadius: 10,
    marginTop: 20,
  },
  filterWrapper: {
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    height: "60%",
    borderRadius: 10,
    marginTop: 20,
  },
  inputWrapper: {
    width: "75%",
  },
  inputField: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  forceTop: {
    position: "absolute",
    top: 2,
  },
  cardButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  modal: {
    width: 270,
    backgroundColor: "white",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewMoreModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  viewMoreModal: {
    width: "100%",
    height: "55%",
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

const buttons = StyleSheet.create({
  deleteButton: {
    backgroundColor: "red",
    width: 30,
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 2,
    paddingVertical: 5,
    marginBottom: 5,
  },
  restoreButton: {
    backgroundColor: "green",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  filterButton: {
    width: "75%",
    backgroundColor: "#2196F3",
    borderRadius: 2,
    alignItems: "center",
    paddingVertical: 5,
    marginVertical: 5,
  },
  cardButton: {
    width: "40%",
    backgroundColor: "#2196F3",
    borderRadius: 2,
    alignItems: "center",
    paddingVertical: 5,
    marginVertical: 5,
  },
  redCardButton: {
    width: "75%",
    backgroundColor: "red",
    borderRadius: 2,
    alignItems: "center",
    paddingVertical: 5,
    marginVertical: 5,
  },
  modalButton: {
    width: "75%",
    backgroundColor: "#2196F3",
    borderRadius: 2,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
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
  menuButtonInactive: {
    height: 100,
    width: "40%",
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "25%",
    width: "100%",
  },
});

export { styles, buttons, menuStyles };
