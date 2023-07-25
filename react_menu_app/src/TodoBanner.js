import React, {Component} from "react";

export class TodoBanner extends Component{
    render = () =>
        <h4 className={"bg-primary text-white text-center p-2"}>
            {this.props.username}'s Menu
            {/*({this.props.tasks.filter(t=>!t.done).length} items)*/}
        </h4>


}