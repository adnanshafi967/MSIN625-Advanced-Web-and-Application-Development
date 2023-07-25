import './App.css';
import React, {Component} from "react";
import {TodoRow} from "./TodoRow";
import {TodoBanner} from "./TodoBanner";
import {TodoCreater} from "./TodoCreater";
import {VisibilityControl} from "./visibilityControl";


export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "Burger Corner",
            menuItems: [
                {action: "Beef Burger", category: "burger", done: false},
                {action: "Chicken Burger", category: "burger", done: false},
                {action: "Coke", category: "beverage", done: false},
                {action: "Water", category: "beverage", done: false},
            ],
            menuCategory: [
                {value: 'burger', label: 'Burger', show: false},
                {value: 'pizza', label: 'Pizza', show: false},
                {value: 'fried', label: 'Fried', show: false},
                {value: 'beverage', label: 'Beverage', show: false},
            ],
            // newItemText:""
            showCompleted: false,
        }
    }


    createNewTodo = (task,category) =>{
        if(!this.state.menuItems.find
            (item => item.action ===task))
        {
          this.setState({
                  menuItems: [...this.state.menuItems,
            {action: task,category:category, done: false}]},
              () => localStorage.setItem("todos", JSON.stringify(this.state)));
              // newItemText:""
        }
    }

    componentDidMount() {
        let data = localStorage.getItem("todos");
        this.setState(data !==null ? JSON.parse(data) :
            {
                username:"Burger Corner",
                menuItems: [
                    {action:"Beef Burger", category: "burger", done: false},
                    {action:"Chicken Burger", category: "burger", done: false},
                    {action:"Coke", category:"beverage", done: false},
                    {action:"Water", category:"beverage", done: false},
                ],
                menuCategory:[
                    { value: 'burger', label: 'Burger', show:false},
                    { value: 'pizza', label: 'Pizza', show:false},
                    { value: 'fried', label: 'Fried', show:false},
                    { value: 'beverage', label: 'Beverage', show:false},
                ],
                // newItemText:""
                showCompleted:false,
            }
        )
    }

    changeStateData = () => {
        this.setState({
            username: this.state.username === "Burger Corner" ? "Shafi" : "Adnan"
        })
    }

    toggleTodo = (todo) => this.setState(
        {
            menuItems: this.state.menuItems.map(item => item.action === todo.action
            ? {...item, done: !item.done} : item)

        },() => localStorage.setItem("todos", JSON.stringify(this.state))
    );

    cons
    menuCategoryShow= (todo) =>
    {
        this.setState(
        {
            menuCategory: this.state.menuCategory.map(item => item.value === todo
                ? {...item, show: !item.show} : item)
        },() => localStorage.setItem("todos", JSON.stringify(this.state))
        );
    }



    todoTableRows = (doneValue) => this.state.menuItems
        .filter(item => item.done===doneValue)
        .map(
        item => <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>
    )
    menuTableCategoryWiseRows = (category) => this.state.menuItems
        .filter(item => item.category===category)
        .map(
        item => <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>
    )

  render(){
      return(
          <div>
                <TodoBanner username={this.state.username} tasks={this.state.menuItems}/>

              {/*<button className={"btn btn-primary m-2"} onClick={this.changeStateData}>*/}
              {/*    Change*/}
              {/*</button>*/}

              <div className={"container-fluid"}>
                 <TodoCreater callback={this.createNewTodo}/>
                    <div className={"w-25 float-right p-2"}>
                        <div className={"bg-secondary text-white text-center p-2"}>
                            <VisibilityControl
                                description={"Order Items"}
                                isChecked={this.state.showCompleted}
                                callback={(checked) => this.setState({showCompleted: checked})}
                            />
                        </div>
                        {
                            this.state.showCompleted &&
                            <table className={"table table-striped table-bordered"}>
                                <thead>
                                <tr><th>Items</th>
                                    <th>Category</th>
                                    <th>Uncheck to Remove</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.todoTableRows(true)}
                                </tbody>
                            </table>
                        }
                    </div>

                  <div className={"w-75 float-right p-2"}>
                      {
                          this.state.menuCategory.map(
                              item =>
                                  <div>
                                      <div className={"bg-secondary text-white text-center p-2"}>
                                          <VisibilityControl
                                              description={item.label}
                                              isChecked={item.showCompleted}
                                              callback={(checked) => this.menuCategoryShow(item.value, checked)}
                                          />
                                      </div>
                                      {
                                          item.show &&
                                          <table className={"table table-striped table-bordered"}>
                                              <thead>
                                              <tr><th>Items</th>
                                                  <th>Category</th>
                                                  <th>Check to add order</th>
                                              </tr>
                                              </thead>
                                              <tbody>
                                              {this.menuTableCategoryWiseRows(item.value)}
                                              </tbody>
                                          </table>
                                      }
                                  </div>
                          )
                      }
                  </div>
              </div>
          </div>
      )
  }
};
