import React, { Component } from 'react';
import '/workspace/react-hello/src/styles/index.css';
import { InputTask } from './InputTask.jsx';
import { TaskList } from './TaskList.jsx';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      list: [],
      counter: 0
    };
    this.updateList = this.updateList.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }
  componentDidMount(){
    this.updateList()
  }
  updateList(){
    fetch("https://assets.breatheco.de/apis/fake/todos/user/antonio")
    .then(resp => {return resp.json()})
    .then(respJSON => {
      this.setState({
        list: respJSON, 
        counter: respJSON.length
      })
    })
    .catch(err => console.log(err))
  }

  async deleteAll(){
    await fetch("https://assets.breatheco.de/apis/fake/todos/user/antonio", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(resp => {
      console.log(resp)
    })
    .catch(err => console.log(err))
    this.updateList()
  }

  render(){
  return (
    <div className="app">
      <div className="center">
        <h1 className="display-4">To do List</h1>
      </div>
      <div className="main page">
        <InputTask list={this.state.list} update={this.updateList}/>
          {this.state.counter !== 0 ? (
          <TaskList list={this.state.list} update={this.updateList}/>
          ) : (
          <div> 
            <p className="lead list-group-item">No hay tareas pendientes, agrega alguna tarea</p>  
          </div>
          )}
      {this.state.counter === 1 ?
        <div className="containerCounter"> 
          <span className="counter">{this.state.counter} tarea</span>
        </div>
      :
        <div className="containerCounter">
          <span className="counter">{this.state.counter} tareas</span>
        </div>
      }
      </div>
      <div className="second page"></div>
      <div className="third page"></div>
      <div className="center">
        <button className="btn btn-info mt-3" onClick={this.deleteAll}>Eliminar todas las tareas</button>
      </div>
    </div>
  );}
}

export default Home;
