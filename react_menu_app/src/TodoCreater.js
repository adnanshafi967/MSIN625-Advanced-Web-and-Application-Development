import React, {Component} from "react";
import Select from 'react-select'

export class TodoCreater extends Component{
    constructor(props) {
        super(props);
        this.state = {newItemText: "", newCategory:""}
    }
    updateNewTextValue = (event) =>{
        this.setState({
            newItemText: event.target.value
        })
    }
    updateNewCategoryValue = (event) =>{
        this.setState({
            newCategory: event.value
        })
    }

    createNewTodo = () =>{
        this.props.callback(this.state.newItemText,this.state.newCategory)
        this.state.newItemText=""
        this.state.newCategory=""
    }


    render = () =>
        <div className={"my-1"}>
            <label htmlFor="item_name">Item Name</label>
            <input className={"form-control my-1"}
                   name={"item_name"}
                   type="text"
                   value={this.state.newItemText}
                   onChange={this.updateNewTextValue}
                   required={true}
            />
            <label htmlFor="item_category">Item Category</label>
            <Select
                options={[
                    { value: 'burger', label: 'Burger' },
                    { value: 'pizza', label: 'Pizza' },
                    { value: 'fried', label: 'Fried' },
                    { value: 'beverage', label: 'Beverage' },
            ]}
                className={"my-1"}
                placeholder={"Select an item category"}
                name={"item_category"}
                onChange={this.updateNewCategoryValue}
                required={true}
            />

            <button className={'btn btn-primary m-2'}
                    onClick={this.createNewTodo}>
                Add
            </button>
        </div>


}
