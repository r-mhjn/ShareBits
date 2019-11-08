import React, { useState } from 'react'
import Axios from 'axios'

export default function UploadFile() {
	const [fileUrl, setFileUrl] = useState('');
	const fileInput = React.createRef();
	const handleSubmit = (e) => {
		e.preventDefault();
		//alert(fileInput.current.files[0].name);
		let formdata = new FormData();
		formdata.append('file', fileInput.current.files[0]);
		Axios.post('http://localhost:5000/file/upload', formdata, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((res) => {
				console.log(res.data)
				setFileUrl(res.data.url);
			})
			.catch(err => {
				console.log(err)
			});
	}

	return (
		<div>
			<h1>{fileUrl}</h1>
			<form onSubmit={handleSubmit}>
				<input type="file" ref={fileInput} />
				<input type="submit" value="submit" />
			</form>
		</div>
	)
}
