import React from 'react'
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

export default function DownloadFile() {
	let url = new URL(window.location);
	let link = url.pathname;
	console.log(link)
	window.location = 'http://www.shbt.live/file/download' + link
	// Axios.post('http://localhost:5000/file/download' + link, {
	// 	responseType: 'arraybuffer',
	// 	headers: {'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
	// })
	// 	.then(res => {
	// 		// console.log(res.data)
	// 		console.log(res.headers)
	// 		const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
	// 		const url = window.URL.createObjectURL(blob);
	// 		const link = document.createElement('a');
	// 		link.href = url;
	// 		link.download = 'file.docx';
	// 		document.body.appendChild(link);
	// 		link.click();
	// 	})
	// 	.catch(err => {
	// 		console.log(err)
	// 	});
	return (
		<>
			<ThemeProvider theme={theme}>
				<Container>

					<Grid container>
						<Grid item xs={6}>
						</Grid>
						<Grid item xs={6}>
							{/* {uploading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
							{!uploading && fileUrl !== "" && <div className='linkInfo'>
								<h1>Share <a href={"www.shbt.live/" + fileUrl}>{"shbt.live/" + fileUrl}</a><br /> or scan </h1>
								<img src={"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://www.shbt.live/" + fileUrl} alt="qr"></img>
							</div>} */}
						</Grid>
					</Grid>
				</Container>
			</ThemeProvider>
		</>
	)
}
