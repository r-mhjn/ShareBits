import React, { useState } from 'react'
import { StyleSheet, View } from "react-native";
import MaterialButtonPink1 from "./MaterialButtonPink1";
import prompt from 'react-native-prompt-android';

export default function SendFile() {
	const [buttonText, setButtonText] = useState('Start Beacon')
	let promptOnPress = () => {
		prompt(
			'Beacon Name',
			'Enter beacon name',
			[
				{ text: 'Cancel', onPress: () => { }, style: 'cancel' },
				{
					text: 'OK', onPress: beaconName => {
						setButtonText("beacon active for " + beaconName);
						// startAdvertising(beaconName);
					}
				},
			],
			{
				type: 'text',
				cancelable: true,
				defaultValue: '',
				placeholder: ''
			}
		)
	}
	return (
		<View style={styles.container}>
			<MaterialButtonPink1 style={styles.materialButtonPink1} text={buttonText} onPress={promptOnPress} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		opacity: 1,
		alignItems: "center"
	},
	materialButtonPink1: {
		width: 239,
		height: 151,
		borderRadius: 100,
		borderColor: "#000000",
		top: "95%",
	}
});
