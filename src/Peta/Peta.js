import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Peta.css';

export default class Peta extends Component {
	constructor (props) {
		super(props);
		this.state = {
					viewport: {
						width:window.innerWidth,
						height:window.innerHeight,
						latitude: 5,
						longitude: 35,
						zoom: 15
					},
					popupInfo: null,
					angkot: null,
					error: 'null'
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
                axios.get("https://saverel.herokuapp.com/angkot/all")
			        .then( (response) => {
			          	console.log("4");
			            this.setState({ angkot: response.data });
			        })
			        .catch( (error) => {
			            console.log(error);
			        })				
			})
		}

		
	}

	render() {
		return (
				<div>
					<div className="sidebarStyle">
						<div>
							Longitude: {this.state.viewport.longitude} |
							Latitude: {this.state.viewport.latitude} |
							Zoom: {this.state.viewport.zoom} |
							windowSize: {this.state.viewport.width} - {this.state.viewport.height}
						</div>
					</div>
					<Nav dataKembali="hideData" angkotData={this.state.angkot} />
					<ReactMapGL 
		                {...this.state.viewport}
		                onViewportChange={(viewport) => this.setState({viewport})}
		                mapStyle="mapbox://styles/mapbox/streets-v10"
		                mapboxApiAccessToken={"pk.eyJ1IjoibWF1bGFuYTAyNiIsImEiOiJjazFvODM2cXowZHNhM2hvaWttNnlkczFxIn0.GytjwhxtQ1VS1wysWsp89A"}
		            >

		            	{this.state.angkot !== null ?  this.state.angkot !== "no data" ? this.state.angkot.map(this._renderAngkotMarker) : "loading..." : "Loading..."}
		                
		            </ ReactMapGL>
				</div>
			)
	}

	_renderAngkotMarker = (angkot, index) => {
		return(
				<Marker key={`marker-${index}`} longitude={angkot.longitude} latitude={angkot.latitude}>
					<i class="fas fa-shuttle-van markerAngkots"></i>
				</Marker>
			);
	}
}