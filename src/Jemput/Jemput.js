import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Jemput.css';

export default class Jemput extends Component {
	constructor (props) {
		super(props);
		const { match: { params } } = this.props;
		let metode = String(params.metode);
		let latitude = String(params.latitude);
		let longitude = String(params.longitude);
		let token = String(params.token);
		let angkotId = String(params.angkotId);
		this.state = {
			angkot: null,
			latitude: latitude,
			longitude: longitude,
			token: token,
			metode: metode,
			angkotId: angkotId
		}
	}

	componentDidMount() {
		if (this.state.metode == "btn") {
			axios.get("http://localhost:3001/penumpang/" + this.state.latitude + "/" + this.state.longitude + "/" + this.state.profil + "/" + this.state.token)	
				.then((response) => {
					console.log("sukses1");
				})
				.catch((error) => {
					console.log("error1");
				})
		} else if (this.state.metode == "lsg") {
			axios.get("http://localhost:3001/penumpang/" + this.state.angkotId + "/" + this.state.latitude + "/" + this.state.longitude + "/" + this.state.profil + "/" + this.state.token)	
				.then((response) => {
					console.log("sukses1");
				})
				.catch((error) => {
					console.log("error1");
				})	
		}
		
	}

	render () {
		return(
				<div>
					<Nav dataJemput="hideData" />
				{this.state.token}</div>
			)
	}
}