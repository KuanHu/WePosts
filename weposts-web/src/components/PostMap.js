import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import {PostMarker} from "./PostMarker"
import {POS_KEY} from "../constants"

class RegularMap extends React.Component {

    reloadMarkers = () => {
        const center = this.map.getCenter();
        const position = {lat: center.lat(), lon: center.lng()}
        const range = this.getRange();
        this.props.loadNearbyPost(position.lat, position.lon, range);
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter()
        const bounds = this.map.getBounds()
        if(center && bounds){
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng())
            return 0.01 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    getMapRef = (map) => {
        this.map = map
    }

    render() {
        const pos = JSON.parse(localStorage.getItem(POS_KEY));

        return (
            <GoogleMap
                ref={this.getMapRef}
                onZoomChanged={this.reloadMarkers}
                onDragEnd={this.reloadMarkers}
                defaultZoom={11}
                defaultCenter={{ lat: pos.lat, lng: pos.lon }}
            >
                {this.props.posts && this.props.posts.map((post) => <PostMarker key={`${post.url}`} post={post}/>)}
            </GoogleMap>
        );
    }
}

export const PostMap = withScriptjs(withGoogleMap(RegularMap));