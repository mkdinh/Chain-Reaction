//display space for the preview of components
//uses react-tabs to create a small component with clickable tabs
import React, { Component } from 'react';
import "./Displaycode.css";
import {Tabs, Tab} from 'material-ui/Tabs';
import CanvasTab from "./Canvas";
import ReactorTab from "./Reactor";
import LabTab from "./Laboratory";
import quarantine from "./quarantine.png";

const style= {
  card: {position: "relative", backgroundColor: "white", padding: 0},
  wrapper: {padding: "1rem"},
  tabs: {margin: "1rem"},
  preview: {backgroundColor: "white",  textAlign: "center"},
  reactorComp: {width: "100%", borderBottom: "1px solid lightgrey"},
  actionBtn: {margin: "0.5rem"},
  previewDiv: {width: "100%"},
  editorCard: {position: "relative", margin: "1rem 0", height: "", backgroundColor: "white"},
  editorWrapper: {position: "relative", overflow: "scroll", height: "40vh", backgroundColor: "black"}
}

class Previewdisplay extends Component{

  state = {
    html: ""
  }

  objToStr = (obj) => {
    let str;

    if(obj){
        str = Object.keys(obj).reduce((str, attr) => {
        let statement = `${attr}: ${obj[attr]}; `;
        return str += statement;
      },"")
    }
    return str;
  }

  strToDOM = (html, css) => {
    if(html){
      let cssExists = Object.keys(css).length > 0;
      if(cssExists){
        let style = this.objToStr(css);
        html = html.replace(/(<[^\/]\w*)(\s*.*?>)/, `$1 style="${style}" $2`)
      }
      return {__html: html}};
    }
  
  render(){
    return(
      <div style={style.wrapper}>
        <Tabs>
          <Tab label="Generator" onActive={() => this.props.updateTab("canvas")}>
            <CanvasTab
              profile={this.props.profile}
              active={this.props.active}
              updateActiveComponent={this.props.updateActiveComponent}
              editor={this.props.editor}
              sidebar={this.props.sidebar}
              toggleSidebar={this.props.toggleSidebar}
              toggleEditor={this.props.toggleEditor}
              updateTab={this.props.updateTab}
              canvasMode={this.props.canvasMode}
              tab={this.props.tab}
              addSnackbar={this.props.addSnackbar}
              addComponent={this.props.addComponent}
              customs={this.props.customs}
              updateCustoms={this.props.updateCustoms}
              updateDOM={this.state.updateDOM}
              strToDOM={this.strToDOM}/>
          </Tab>

          <Tab label="Reactor" onActive={() => this.props.updateTab("reactor")}>
            <ReactorTab
              active={this.props.active}
              projects={this.props.projects}
              activeProject={this.props.activeProject}
              toggleEditProject={this.props.toggleEditProject}
              editActiveProject={this.props.editActiveProject}
              removeFromProject={this.props.removeFromProject}
              profile={this.props.profile}
              updateDOM={this.state.updateDOM}
              updateProjects={this.props.updateProjects}
              updateActiveProject={this.props.updateActiveProject}
              strToDOM={this.strToDOM}
              objToStr={this.objToStr}
              reactor={this.props.reactor}
              addSnackbar={this.props.addSnackbar}
              addComponent={this.props.addComponent}
              addProject={this.props.addProject}
              preview={this.props.preview}/>
          </Tab>
          
          <Tab label="Laboratory" className="valign-wrapper">
              <LabTab
                customs={this.props.customs}
                addSnackbar={this.props.addSnackbar}
                auth0Id={this.props.profile.auth0Id} 
                strToDOM={this.strToDOM}/>
              {/* <div className="valign-wrapper" style={{height: "50vh"}}>
                <div style={{width: "100%", textAlign: "center"}}>
                  <img src={quarantine} alt={"quarantine"} style={{width: "50%", margin: "2rem auto"}}/>
                </div>
              </div> */}
          </Tab>
        </Tabs>
    </div>
    )
  }
}

export default Previewdisplay;


