import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Nav from '../Nav/Nav';
import './Jemput.css';

export default class Jemput extends Component {
	constructor (props) {
		super(props);
		const { match: { params } } = this.props;
		let latitude = String(params.latitude);
		let longitude = String(params.longitude);
		let token = String(params.token);
		this.state = {
			viewport: {
				width:window.innerWidth*78/100,
				height:"250px",
				latitude: 5,
				longitude: 35,
				zoom: 15
			},
			angkot: null,
			latitude: latitude,
			longitude: longitude,
			token: token,
			profilHide: "",
			profilHide1: "hidden",
			profilHide2: "hidden"
		}
	}

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState(({viewport}) => ({viewport: {
                        ...viewport,
                	    latitude: position.coords.latitude,
                	    longitude: position.coords.longitude
                    }})
                );
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);			
			})
		}
		axios.get("http://localhost:3001/penumpang/" + String(this.state.latitude) + "/" + String(this.state.longitude) + "/" + String(this.state.profil) + "/" + String(this.state.token))	
			.then((response) => {
				console.log("sukses1");
			})
			.catch((error) => {
				console.log("error1");
			})
		
	}

	clickNaik = () => {
        axios.get("http://localhost:3001/update/penumpang/naik/" + String(this.state.token))
        .then( (response) => {
            console.log(response);
            this.setState({
               	angkot: response.data,
               	profilHide: "hidden", 
               	profilHide1: "", 
               	profilHide2: "hidden"
            })
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    clickTurun = () => {
        axios.get("http://localhost:3001/update/penumpang/turun/" + String(this.state.token))
        .then( (response) => {
            console.log(response);
            this.setState({
               	angkot: response.data,
               	profilHide: "hidden", 
               	profilHide1: "hidden", 
               	profilHide2: ""
            })
        })
        .catch( (error) => {
            console.log(error);
        })
    }

	render () {
		return(
				<div>
					<Nav dataJemput="hideData" />
					<div className="card cardJemput">
						<ReactMapGL 
						className="card-img-top"
		                {...this.state.viewport}
		                onViewportChange={(viewport) => this.setState({viewport})}
		                mapStyle="mapbox://styles/mapbox/streets-v10"
		                mapboxApiAccessToken={"pk.eyJ1IjoibWF1bGFuYTAyNiIsImEiOiJjazFvODM2cXowZHNhM2hvaWttNnlkczFxIn0.GytjwhxtQ1VS1wysWsp89A"}
			            >

			
			                
			            </ ReactMapGL>
						<div className="card-body">
						  	<h5 className="card-title">Informasi</h5>
						   		<div>
						  		{ this.state.angkot !== null ? this.state.angkot.map(this._renderProfilAngkot) : "loading..." }
						  		</div>
						  		<br/>
						   	<a href="#" className={`btn btn-primary ${this.state.profilHide}`} onClick={this.clickNaik}>Didalam Angkot</a>
						   	<a href="#" className={`btn btn-primary ${this.state.profilHide1}`} onClick={this.clickNaik}>Turun Disini</a>
						   	<Link to="/" className={`btn btn-primary ${this.state.profilHide2}`} onClick={this.clickTurun}>Beranda</Link>
						</div>
						{this.state.token}		
					</div>
				</div>
			)
	}

	_renderProfilAngkot = (data, index) => {
		return(
				<div className="card mb-3">
					<div className="row no-gutters">
					   	<div className="col-md-4">
					   		<img src={data.img} className="card-img" alt={data.img} />
					   	</div>
					    <div className="col-md-8">
					      	<div className="card-body">
					        	<h5 className="card-title">{data.nama}</h5>
						        <p className="card-text">
						        	<table class="table table-borderless table-dark tabelProfil rounded">
										<tbody>
										<tr>
										  <th scope="row">Pengemudi</th>
										  <td>{data.pengemudi}</td>
										</tr>
										<tr>
										  <th scope="row">Pemilik</th>
										  <td>{data.pemilik}</td>
										</tr>
										<tr>
										  <th scope="row">Penumpang</th>
										  <td>{data.penumpang}</td>
										</tr>
										<tr>
										  <th scope="row">Tarif</th>
										  <td>{data.tarif}</td>
										</tr>
										</tbody>
									</table>
						        </p>
						        <p className="card-text"><small class="text-muted">{data.latitude}, {data.longitude}</small></p>
					     	</div>
					    </div>
					</div>
				</div>
			)
	}
}