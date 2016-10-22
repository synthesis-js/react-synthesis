// Dashboard.js
import React from 'react';
// import ALL components from plugin/index.js
import * as Components from "../../plugins";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.addComponent = this.addComponent.bind(this);
    this.saveComponentsToDB = this.saveComponentsToDB.bind(this);
  }

  componentDidMount() {}

  addComponent(e) {
    let pluginName = e.target.previousSibling.value;
    this.saveComponentsToDB(pluginName);
  }

  saveComponentsToDB(pluginName) {
    let that = this;
    let mount_point = Components[pluginName + 'Data'].mount_point;

    let componentObj = {
      name: pluginName,
      mount_point: mount_point
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.status === 200 && xhr.readyState === 4) {
        that.props.addComponent(componentObj);
      }     
    }
    xhr.open('POST', '/api/plugin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(componentObj));
  }

  render() {
    // map through component array from the redux store
    let injectedComponents = this.props.components.map((component, i) => {
      // lookup the component from plugin/index.js by referencing with 
      // the component title, that is stored in the component array
      let ComponentElem = Components[component.name];
      // create the element
      if (component.mount_point === 'dashboard') {
        return <ComponentElem key={i} />
      }
    })

    // render all of our injected components onto the dashboard
    return (
    	<div>
	    	<h1>synthesis dashboard</h1>
        <select>
          <option value="PostFeed">Post Feed</option>
          <option value="PostManager">Post Manager</option>
          <option value="Collection">Data Manager</option> 
          <option value="Comments">Comments</option> 
        </select>
        <button className="btn btn-default" onClick={(e) => {this.addComponent(e)}}>Add Plugin</button>
        {injectedComponents}
    	</div>
    )
  }
}