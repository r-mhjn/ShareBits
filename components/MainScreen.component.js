import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialButtonPrimary from "./MaterialButtonPrimary";
export default MainScreen = () => {

	return (
		<View style={styles.container}>
			<MaterialButtonPrimary style={styles.materialButtonPrimary} text="Send File" />
			<MaterialButtonPrimary style={styles.materialButtonPrimary2} text="Recieve file" />
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	materialButtonPrimary: {
		width: 218,
		height: 82,
		marginTop: 161,
		alignSelf: "center"
	},
	materialButtonPrimary2: {
		width: 218,
		height: 82,
		marginTop: 122,
		alignSelf: "center"
	}
});