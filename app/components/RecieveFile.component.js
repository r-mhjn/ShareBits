import React, { useState } from 'react'
import { View, Text, Button, NativeEventEmitter, NativeModules } from 'react-native'
import Nearby2 from 'react-native-nearby2'

const RecieveFile = () => {
	const eventEmitter = new NativeEventEmitter(NativeModules.Nearby2);
	const [discoveryStatus, setDiscoveryStatus] = useState('');
	eventEmitter.addListener("beacon_found", (event) => {
		setDiscoveryStatus(' found ' + event);
	});
	eventEmitter.addListener('recieved', event => {
		console.log(event)
		setDiscoveryStatus(event);
	});
	const startDiscoveryNow = () => {
		Nearby2.startDiscovery()
			.then(() => {
				setDiscoveryStatus('discovering');
			})
			.catch(e => {
				setDiscoveryStatus('discovery failed ', e);
			})
	}
	// const stopDiscoveryNow=()=>{
	// 	Nearby2.stopDiscovery();
	// }
	return (
		<View>
			<Text>{discoveryStatus}</Text>
			<Button title="start discovery" onPress={startDiscoveryNow} />
			<Button title="start discovery" onPress={startDiscoveryNow} />
		</View>
	)
}

export default RecieveFile
