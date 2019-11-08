import React, { useState } from 'react';
import {
	Text,
	Button,
	BackHandler
} from 'react-native';

import Nearby2 from 'react-native-nearby2';
import MainScreenComponent from './components/MainScreen.component';
import SendFile from './components/SendFile.component';
import RecieveFile from './components/RecieveFile.component';

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
	

	return (
		<>
			{/* <Button title="start advertising" onPress={()=>{startAdvertisingNow()}}></Button>
	<Button title="stop advertising" onPress={()=>{stopAdvertisingNow()}}></Button>
	  <Text>{advertisingMessage}</Text> */}
			{showScreen === 0 && <MainScreenComponent setShowScreen={setShowScreen} />}
			{showScreen === 1 && <SendFile setShowScreen={setShowScreen} />}
			{showScreen === 2 && <RecieveFile />}
		</>
	);
};

export default App;
