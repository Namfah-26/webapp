import React, { Component } from 'react';
import Config from "../scripts/config";

class Map extends Component {
  state = {
    ros: null,
  };
  navViewer=0;
  navClient=0;

  constructor() {
    super();
    // this.init_connection();
    this.view_map = this.view_map.bind(this);
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();
    console.log("Map:" + this.state.ros);
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log("cannot connect to the WS robot. Try again after 1 second");
    }
  }

  componentDidMount() {
    this.init_connection();
    console.log("Map: componentDidMount" + this.state.ros);
    this.view_map();
  }

  view_map() {
    this.navViewer = new window.ROS2D.Viewer({
      divID: "nav_div",
      width: 740,
      height: 480,
    });

    this.navClient = new window.NAV2D.OccupancyGridClientNav({
      ros: this.state.ros,
      rootObject: this.navViewer.scene,
      viewer: this.navViewer,
      severName: "/move_base",
      withOrientation: true,
    });
  }

  render() {
    return (
      <div>
        <div id="nav_div"></div>
      </div>
    );
  }
}

export default Map;
