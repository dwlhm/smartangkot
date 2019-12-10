import React, { Component } from 'react';
import Turf, { distance, circle, point } from '@turf/turf';
import { Link } from 'react-router-dom';
import randToken from 'rand-token';
import './Nav.css';

export default class Nav extends Component {

	constructor(props) {
		super(props);
		this.state = {
			latitude: null,
			longitude: null
		}
	}

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
               	    latitude: position.coords.latitude,
              	    longitude: position.coords.longitude
                });
			});
		}
	}

	render() {
		return (
				<div className="card mb-3" id="cardNav">
					<div className="card-body">
						<nav className="nav flex-column nav-pills nav-fill">
							<Link className="nav-link" to="/"><h1 className="card-title" id="titleWeb">Smart Angkot</h1></Link>
							<Link className={`nav-link active ${this.props.dataJemput}`} to={`/jemput/lsg/${this.state.latitude}/${this.state.longitude}}/null/Dwi%20Ilham/${String(randToken.generate(16))}}`}>Jemput Saya</Link>
							<Link className={`nav-link active ${this.props.dataKembali}`} to="/">Kembali</Link>
							<Link className="nav-link" to="/profil">
								<div className="profilNav">
									<div className="img rounded">
										<img src="https://avatars3.githubusercontent.com/u/22696534?s=460&v=4" />
									</div>
									<h5>Dwi Ilham</h5>
								</div>
							</Link>
							<Link className="nav-link Infromasi" to="/informasi">Infromasi Angkot</Link>
						</nav>
						<div className="spce">
							<ul className="list-group">

								{this.props.angkotData !== null && this.state.latitude !== null ?  this.props.angkotData !== undefined ? this.props.angkotData.map(this._renderList) : "" : "Loading..."}

							</ul>
						</div>
					</div>
				</div>

			)
	}
	_renderList = (data, index) => {
		console.log(data);
		var latitude = Number(data.latitude);
		var longitude = Number(data.longitude);
		var from = point([latitude, longitude]);
		var to = point([Number(this.state.latitude), Number(this.state.longitude)]); 
		var options = {units: 'meters'};
		var distances = Math.round(distance(from, to, options));
		return(
				<li className="list-group-item d-flex justify-content-between align-items-center listAngkot">
					<div className="boxAngkot">
						<h4 className="title namaNav">{data.pengemudi}</h4>
						<h5 className="description jalanNav">{distances} m</h5>
					</div>
					<span className="badge badge-primary badge-pill">Pilih</span>
				</li>
			)
	}
}