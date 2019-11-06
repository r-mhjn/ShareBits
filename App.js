import React,{useState} from 'react';
import {
  Text,
	Button,
} from 'react-native';

import Nearby2,{startAdvertising} from 'react-native-nearby2';

const App = () => {
	// let xx=()=>{
	// 	Nearby2.funcWithPromise(true)
	// 	.then(x=>console.log(x))
	// 	.catch(x=>console.log(x));
	// }
	// xx();
	const [advertisingMessage,setAdvertisingMessage]=useState("");
	let startAdvertisingNow=()=>{
		Nearby2.startAdvertising()
		.then(()=>{
			setAdvertisingMessage("advertising!");
		})
		.catch((e)=>{
			setAdvertisingMessage("failed to advertise!"+e);
		})

	}
	let stopAdvertisingNow=()=>{
		Nearby2.stopAdvertising()
		.then(()=>{
			setAdvertisingMessage("stopped advertising!");
		})
		.catch((e)=>{
			setAdvertisingMessage("failed to stop advertise!"+e);
		})

	}

  return (
    <>
	<Button title="start advertising" onPress={()=>{startAdvertisingNow()}}></Button>
	<Button title="stop advertising" onPress={()=>{stopAdvertisingNow()}}></Button>
      <Text>{advertisingMessage}</Text>
    </>
  );
};

export default App;
