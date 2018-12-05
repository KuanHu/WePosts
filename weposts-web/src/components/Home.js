import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTION, AUTH_REFLIX, API_ROOT, TOKEN_KEY, POS_KEY} from "../constants"
import $ from 'jquery'
import {Gallery} from "./Gallery"
import {CreatePostButton} from "./CreatePostButton"

const TabPane = Tabs.TabPane;

export class Home extends React.Component {

    state = {
        loadingPosts : false,
        loadingGeoLocation: false,
        error: '',
        posts: [],
    }

    getGeoLocation = () => {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                this.onSuccessGetGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTION);
        } else {

        }
    }

    onSuccessGetGeoLocation = (position) => {
        this.setState({loadingGeoLocation : false, error : ''});
        console.log(position)
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        localStorage.setItem(POS_KEY, JSON.stringify({lat, lon}))
        this.loadNearbyPost(lat, lon);
    }

    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation : false, error : 'Failed to load geo location'});
    }

    getGalleryPanelContent = () => {
        if(this.state.error){
            return <div>{this.state.error}</div>;
        } else if(this.state.loadingGeoLocation) {
            return <Spin tip="Loading Geo Loaction..."/>
        } else if(this.state.loadingPosts){
            return <Spin tip="Loading posts..."/>
        } else if(this.state.posts && this.state.posts.length > 0){
            console.log(this.state.posts)
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    caption: post.message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300
                }
            });
            return <Gallery images={images}/>
        } else {
            return <div>content</div>
        }
    }

    loadNearbyPost = (lat, lon) => {
        this.setState({loadingPosts: true});
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_REFLIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((res) => {
            // console.log(res);
            // JSON.parse(res).map((post) => 0);
            this.setState({ posts: res ,loadingPosts: false, error : ''});
        }, (err) => {
            this.setState({loadingPosts: false, error : err.responseText});
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.setState({loadingGeoLocation : true, error: ''});
        this.getGeoLocation();
    }

    render(){

        const operations = <CreatePostButton loadNearbyPost={this.loadNearbyPost}/>;

        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Post" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}