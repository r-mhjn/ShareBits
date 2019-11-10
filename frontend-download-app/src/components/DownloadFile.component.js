import React from 'react'
import Axios from 'axios'

export default function DownloadFile() {
	let url = new URL(window.location);
	let link = url.pathname;
	console.log(link)
	window.location='http://www.shbt.live/file/download'+link
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
		<div>
			<h1>getting {link}</h1>
		</div>
	)
}
