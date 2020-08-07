import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(){
    super();
    this.state ={
      formValue: "",
      plants: []
    }
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  componentDidMount(){
    axios
      .get("http://localhost:3333/plants")
      .then(res => {
        this.setState({plants: res.data.plantsData })
      })
      .catch(err => {console.log(err);})
  }
  componentDidUpdate(prevProp, prevState){
    if (prevState.formValue !== this.state.formValue) {
      this.state.formValue.toUpperCase()
      let regS = new RegExp(this.state.formValue, 'i')
      console.log(regS);
  
      axios
      .get("http://localhost:3333/plants")
      .then(res => {
        if(regS !== "") {
          let searhcResults = res.data.plantsData.filter(currentPlant => {
            console.log(regS.test(currentPlant.name));
            return (regS.test(currentPlant.name)) 
          })
          this.setState({plants: searhcResults })
        } else {
          this.setState({plants: res.data.plantsData })
        }
      })
      .catch(err => {console.log(err);})
    }
  }
  handleChanges = (eve) => {
    let search = eve.target.value
    this.setState({ ...this.state.formValue, formValue: search });
  };


  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <input 
          type="text" 
          placeholder="Search" 
          value={this.state.formValue}
          onChange={this.handleChanges} 
        />
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
