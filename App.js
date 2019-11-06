import React, { useState } from 'react';
import {
	Text,
	Button,
	BackHandler
} from 'react-native';

import Nearby2 from 'react-native-nearby2';
import MainScreenComponent from './components/MainScreen.component';
import SendFile from './components/SendFile.component';

const App = () => {
	const [showScreen, setShowScreen] = useState(0);
	// BackHandler.addEventListener('hardwareBackPress', () => {

	// 	setShowScreen(showScreen-1);
	// })
	// let xx=()=>{
	// 	Nearby2.funcWithPromise(true)
	// 	.then(x=>console.log(x))
	// 	.catch(x=>console.log(x));
	// }
	// xx();
	const [advertisingMessage, setAdvertisingMessage] = useState("");
	let startAdvertisingNow = () => {
		Nearby2.startAdvertising("nick")
			.then(() => {
				setAdvertisingMessage("advertising!");
			})
			.catch((e) => {
				setAdvertisingMessage("failed to advertise!" + e);
			})

	}
	let stopAdvertisingNow = () => {
		Nearby2.stopAdvertising()
			.then(() => {
				setAdvertisingMessage("stopped advertising!");
			})
			.catch((e) => {
				setAdvertisingMessage("failed to stop advertise!" + e);
			})

	}

	return (
		<>
			{/* <Button title="start advertising" onPress={()=>{startAdvertisingNow()}}></Button>
	<Button title="stop advertising" onPress={()=>{stopAdvertisingNow()}}></Button>
	  <Text>{advertisingMessage}</Text> */}
			{showScreen === 0 && <MainScreenComponent setShowScreen={setShowScreen} />}
			{showScreen === 1 && <SendFile setShowScreen={setShowScreen} />}
		</>
	);
};

export default App;
