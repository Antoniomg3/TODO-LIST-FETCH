import React, { Component } from 'react';

export class TaskList extends Component{
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this)
    }
    async deleteTask(arr, index){
        let newList = [];
        for(let i=0; i<arr.length; i++){
            if(i !== index){
                newList.push(arr[i]);
            }
        }
        await fetch("https://assets.breatheco.de/apis/fake/todos/user/antonio",{
                method: 'PUT',
                body: JSON.stringify(newList), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => {return resp.json()})
            .then(respJSON => {console.log(respJSON)})
            .catch(err => {console.log(err)});
        this.props.update();
    }
    
    render(){
        return(
            <div>
                <ul className="list-group">
                    {this.props.list.map((task,index) => {
                        return(
                            <li className="list-group-item lead" key={index}>{task.label}
                                <div className="delete" onClick={()=>this.deleteTask(this.props.list, index)}>
                                    <i className="fas fa-times"></i>
                                </div>
                            </li>
                        );
                        })    
                    }
                </ul>
            </div>
            );
    }
        
}