import React, { useState } from 'react'
import Axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	overrides: {
		MuiTouchRipple: {
			// ripple:{
			// 	color:
			// }
		},
		MuiButton: {
			outlined: {
				marginBottom: 40,
				borderColor: 'white',
				color: 'white',
				height: 200,
				width: 500,
				fontSize: 30
			}
		}
	}
});

export default function UploadFile() {
	const [fileUrl, setFileUrl] = useState('');
	const [uploading, setUploading] = useState(false);
	const [filename, setFilename] = useState('');
	const changeFile = (name) => {
		if(name.target.files===undefined){return}
		console.log(name.target.files[0].name)
		setFilename(name.target.files[0].name);
	}
	const fileInput = React.createRef();
	const handleSubmit = (e) => {
		// e.preventDefault();
		// alert(fileInput.current.files[0].name);
		let formdata = new FormData();
		formdata.append('file', fileInput.current.files[0]);
		setUploading(true);
		Axios.post('http://localhost:5000/file/upload', formdata, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((res) => {
				console.log(res.data)
				setFileUrl(res.data.url);
				setUploading(false);
			})
			.catch(err => {
				console.log(err)
			});
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Container>

					<Grid container>
						<Grid item xs={6}>

							<input
								accept=""
								id="outlined-button-file"
								// multiple
								type="file"
								style={{ display: "none" }}
								ref={fileInput}
								onChange={(e) => {
									changeFile(e);
								}}
							/>
							<label htmlFor="outlined-button-file">
								<Button variant="outlined" component="span" >{filename === "" ? "Click to select a file" : "selected \"" + filename + "\""}</Button>
							</label>
							<Button variant="outlined" disabled={filename === "" ? true : false} onClick={handleSubmit}>Upload file</Button>
						</Grid>
						<Grid item xs={6}>
							{uploading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
							{!uploading && fileUrl !== "" && <div className='linkInfo'>
								<h1>Share <a href={"www.shbt.live/" + fileUrl}>{"shbt.live/" + fileUrl}</a><br /> or scan </h1>
								<img src={"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://www.shbt.live/" + fileUrl} alt="qr"></img>
							</div>}
						</Grid>
					</Grid>
				</Container>
			</ThemeProvider>
		</>
	)
}
