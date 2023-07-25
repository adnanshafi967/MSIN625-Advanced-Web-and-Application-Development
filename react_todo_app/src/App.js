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
            username:"Adnan",
            todoItems: [
                {action:"Get Flowers", done: false},
                {action:"Get Shoes", done: false},
                {action:"Get Tickets", done: false},
                {action:"Get Food", done: false},
            ],
            // newItemText:""
            showCompleted:true
         }
    }


    createNewTodo = (task) =>{
        if(!this.state.todoItems.find
            (item => item.action ===task))
        {
          this.setState({
              todoItems: [...this.state.todoItems,
            {action: task, done: false}]},
              () => localStorage.setItem("todos", JSON.stringify(this.state)));
              // newItemText:""
        }
    }

    componentDidMount() {
        let data = localStorage.getItem("todos");
        this.setState(data !==null ? JSON.parse(data) :
            {
                username:"Adnan",
                todoItems: [
                    {action:"Get Flowers", done: false},
                    {action:"Get Shoes", done: false},
                    {action:"Get Tickets", done: false},
                    {action:"Get Food", done: false},
                ],
                // newItemText:""
                showCompleted:true
            }
        )
    }

    changeStateData = () => {
        this.setState({
            username: this.state.username === "Adnan" ? "Shafi" : "Adnan"
        })
    }

    toggleTodo = (todo) => this.setState(
        {
            todoItems: this.state.todoItems.map(item => item.action === todo.action
            ? {...item, done: !item.done} : item)

        },() => localStorage.setItem("todos", JSON.stringify(this.state))
    );



    todoTableRows = (doneValue) => this.state.todoItems
        .filter(item => item.done===doneValue)
        .map(
        item => <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>
    )

  render(){
      return(
          <div>
                <TodoBanner username={this.state.username} tasks={this.state.todoItems}/>

              <button className={"btn btn-primary m-2"} onClick={this.changeStateData}>
                  Change
              </button>

              <div className={"container-fluid"}>
                 <TodoCreater callback={this.createNewTodo}/>

                  <table className={"table table-striped table-bordered"}>
                      <thead>
                      <tr><th>Description</th>
                          <th>done</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.todoTableRows(false)}
                      </tbody>
                  </table>
                  <div className={"bg-secondary text-white text-center p-2"}>
                      <VisibilityControl
                          description={"Completed Tasks"}
                          isChecked={this.state.showCompleted}
                          callback={(checked) => this.setState({showCompleted: checked})}
                      />
                  </div>
                  {
                      this.state.showCompleted &&
                      <table className={"table table-striped table-bordered"}>
                          <thead>
                          <tr><th>Description</th>
                              <th>done</th>
                          </tr>
                          </thead>
                          <tbody>
                          {this.todoTableRows(true)}
                          </tbody>
                      </table>
                  }
              </div>
          </div>
      )
  }
};
