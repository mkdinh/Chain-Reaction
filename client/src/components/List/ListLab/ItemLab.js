import React, { Component } from "react"
import { Row, Col } from "../../Grid";
import Fa from "react-fontawesome";
import API from "../../../utils/api";
const style = {
    item: {borderBottom: "1px solid grey", fontSize: "1rem", color: "black", marginBottom: 0},
    font: {fontSize: "1rem", color: "black"}
}

class ItemLab extends Component { 

    state = {
        loading: false
    }

    addComponent = () => {
        let group;
        if(this.props.component.group){
            group = this.props.component.group.charAt(0).toUpperCase() + this.props.component.group.substring(1);
        }else{
            group = "General"
        };
        let exists;

        if(this.props.customs[group]){
            exists =this.props.customs[group].filter( el => el._id = this.props.component._id).length > 0;
        }else{
            exists = false;
        };

        if(exists){
            this.props.addSnackbar("you already have this component", "error")
        }else{
            let newComponent = Object.assign({}, this.props.component);
            delete newComponent._id;
            newComponent.create_by = this.props.auth0Id;  
            console.log(newComponent)
            API.component.create(newComponent)
                .then( comp => {
                    this.props.addSnackbar(`Successfully added ${this.props.component.name}!`, "success")
                })
                .catch(err => console.log(err))
        }
    }

    render(){
        return(
            <Row style={style.item}>
                <Col size={1}>
                    <div className="valign-wrapper" style={{height: "15vh"}}>
                        <div style={{width: "100%", textAlign: "center", fontSize: "2.5rem", paddingTop: "5px"}}>
                            <a href="#" onClick={this.addComponent} className="itemLabIcon" style={{margin: "auto"}}><Fa name="plus"/></a>
                        </div>
                    </div>
                </Col>
                <Col size={7}>
                    <div className="valign-wrapper" style={{height: "15vh", margin: "1rem 0", borderLeft: "1px solid grey", borderRight: "1px solid grey", paddingLeft: "10px"}}>
                       <div>
                        <p style={style.font}>Name: {this.props.component.name}</p>
                        <p style={style.font}>Group: {this.props.component.group}</p>
                        </div>
                    </div>
                </Col>
                <Col size={4}>
                    <div className="valign-wrapper" style={{height: "15vh"}}>
                        <div style={{width: "100%",textAlign: "center"}} 
                            dangerouslySetInnerHTML={this.props.strToDOM(this.props.component.html, this.props.component.css || "")}/>
                    </div>
                </Col>
            </Row>
        )
    }
};

export default ItemLab;