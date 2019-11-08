import React from 'react';
import UploadFile from './components/UploadFile.component';
import logoImg from './logo/vector/default-monochrome-white.svg'

const App = () => {
	return <>
		<img src={logoImg} alt="" className='logoImg' style={{ height: 150 }} />
		<UploadFile />
	</>
}
export default App;
