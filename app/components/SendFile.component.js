import React, { useState } from 'react'
import { Button, StyleSheet, View, Text, NativeEventEmitter, NativeModules } from "react-native";
import MaterialButtonPink1 from "./MaterialButtonPink1";
import prompt from 'react-native-prompt-android';
import Nearby2 from 'react-native-nearby2'

import DocumentPicker from 'react-native-document-picker'

export default function SendFile() {
	const selectFile = async () => {
		try {
			const res = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles],
			});
			// setFileUri(res.uri);
			// console.log(res.uri)
			// getFilePath(res.uri);
			console.log(
				res.uri,
				res.type, // mime type
				res.name,
				res.size
			);
			console.log("uri: ", res.uri)
			Nearby2.sendFile(res.name, connections)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				// User cancelled the picker, exit any dialogs or menus and move on
			} else {
				throw err;
			}
		}
	}

	const selectFileAndSend = () => {
		// let file=selectFile();
		// console.log(file.uri,connections)
		// selectFile();
		Nearby2.showImageChooser(connections);
	}

	const getFilePath = (uri) => {
		Nearby2.getPath(uri)
			.then(res => console.log('full path', res))
	}

	const [fileUri, setFileUri] = useState('')
	const [buttonText, setButtonText] = useState('Start Beacon')
	const [advertisingMessage, setAdvertisingMessage] = useState('');
	const eventEmitter = new NativeEventEmitter(NativeModules.Nearby2);
	const [connections, setConnections] = useState('none');
	eventEmitter.addListener('connection', (event) => {
		console.log(event)
		setConnections(event);
	})
	eventEmitter.addListener('recieved', (event) => {
		console.log(event)
		setConnections(event);
	})
	const startAdvertisingNow = (nickname) => {
		Nearby2.startAdvertising(nickname)
			.then(() => {
				setButtonText("beacon active for " + nickname);
				setAdvertisingMessage("advertising!");
			})
			.catch((e) => {
				setButtonText("Start Beacon");
				setAdvertisingMessage("failed to advertise!" + e);
			})

	}
	// const stopAdvertisingNow = () => {
	// 	Nearby2.stopAdvertising()
	// 		.then(() => {
	// 			setAdvertisingMessage("stopped advertising!");
	// 		})
	// 		.catch((e) => {
	// 			setAdvertisingMessage("failed to stop advertise!" + e);
	// 		})

	// }
	const promptOnPress = () => {
		prompt(
			'Beacon Name',
			'Enter beacon name',
			[
				{ text: 'Cancel', onPress: () => { }, style: 'cancel' },
				{
					text: 'OK', onPress: beaconName => {
						// startAdvertising(beaconName);
						startAdvertisingNow(beaconName);
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
			<Text>{advertisingMessage}</Text>
			<Text>{connections} connected</Text>
			<MaterialButtonPink1 style={styles.materialButtonPink1} text={buttonText} onPress={promptOnPress} />
			<Button title="select file" onPress={selectFileAndSend} />
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
