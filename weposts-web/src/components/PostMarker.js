import React from 'react'
import {InfoWindow, Marker} from "react-google-maps"

export class PostMarker extends React.Component{

    state = {
        isOpen: false,
    }

    onToggleOpen = () => {
        this.setState((preState) => {
            return {isOpen: !preState.isOpen};
        });
    }


    render() {
        const {lat, lon} = this.props.post.location
        const {url, user, message} = this.props.post

        return (
            <Marker
                position={{ lat, lng: lon}}
                onMouseOver={this.onToggleOpen}
                onMouseOut={this.onToggleOpen}
            >
                {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
                    <div>
                        <img className="post-marker-image" src={url} alt={`${user}:${message}`} />
                        <p>{`${user}:${message}`}</p>
                    </div>
                </InfoWindow>}
            </Marker>
        );
    }
}