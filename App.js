import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state={
    persons:[],showPersons : false
  }


    inputHandler = () =>{
    //const doesShow= this.state.showPersons;
    //this.setState({showPersons:!doesShow})
    const addPerson= [...this.state.persons];
    addPerson.push({name:this.refs.p_name.value,age:this.refs.p_age.value});
    this.setState({
      persons:addPerson
    })
    //localStorage.setItem('persons',JSON.stringify(this.state.persons));
  }

  storeHandler = () =>{
     localStorage.setItem('persons',JSON.stringify(this.state.persons));
  }

  retriveHandler = () =>{
    this.setState({
      persons: JSON.parse(localStorage.getItem('persons'))
    })
  }

  updateHandler = (name,age) =>{
    this.setState({
      persons: JSON.parse(localStorage.getItem('persons'))
    })

    const personIndex= this.state.persons.findIndex(p=> {
      return p.age===age;
    });

    const persondummy = {...this.state.persons[personIndex]};

    persondummy.name = name;

    const personUpdate= [...this.state.persons];
    personUpdate[personIndex] = persondummy;

    this.setState({
      persons: personUpdate
    })

    //localStorage.setItem('persons',JSON.stringify(this.state.persons));
  }

  deleteHandler = (age) =>{
        this.setState({
      persons: JSON.parse(localStorage.getItem('persons'))
    })

    const personIndex= this.state.persons.findIndex(p=> {
      return p.age===age;
    });

    const personDelete= [...this.state.persons];

    personDelete.splice(personIndex,1);

    this.setState({persons:personDelete})

   // localStorage.setItem('persons',JSON.stringify(this.state.persons));
  }

  render() {

      let dperson = null;

 // if(this.state.showPersons){
    dperson = (
      <div>
      {this.state.persons.map((per,index) => {
        return <Person 
        name={per.name}
        age={per.age} key={index}/>
      })

      }
      </div>
      );

    return (
      <div className="App">
        <h1>Hi !! There!! </h1>
        <input type="text" placeholder="enter the name" ref="p_name"/>
        <input type="text" placeholder="enter the age" ref="p_age"/>
        <br/>
        <button onClick={this.inputHandler}>Create</button>
        <br/>
        <button onClick={this.retriveHandler}>Retrive</button>
        <br/>
        <button onClick={()=> this.updateHandler(this.refs.p_name.value,this.refs.p_age.value)}>Update</button>
        <br/>
        <button onClick={()=> this.deleteHandler(this.refs.p_age.value)}>Delete</button> 
        <br/>
        <button onClick={this.storeHandler}>Commit</button>
        <br/>
        {dperson}
      </div>
    );
  }
}

export default App;
