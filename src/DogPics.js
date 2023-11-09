import React from "react";
import axios from "axios";

export default class DogPics extends React.Component {
  constructor(props) {
    console.log("Constructor was called");
    super(props);
    this.state = {
      selectedBreed: "Random",
      randomDogLink: "",
      randomDogFetched: false,
      huskyFetched: false,
      boxerFetched: false,
      beagleFetched: false,
      dalmatianFetched: false
    };
  }

  async getRandomDogFromApi() {
    const API = "https://dog.ceo/api/breeds/image/random";
    const response = await axios.get(API);
    const randomDogLink = response.data.message;
    this.setState({
      randomDogLink: randomDogLink,
      randomDogFetched: true
    });
  }

  async getOtherDogFromApi() {
    const API = `https://dog.ceo/api/breed/${this.state.selectedBreed}/images/random`;
    const response = await axios.get(API);
    const randomDogLink = response.data.message;
    this.setState({
      randomDogLink: randomDogLink
    });
  }

  componentDidMount() {
    console.log("Component Mounted");
    console.log(this.state.selectedBreed);
    this.getRandomDogFromApi();
  }

  getBreedFromUi = (e) => {
    this.setState({
      selectedBreed: e.target.value
    });
  };

  componentDidUpdate() {
    console.log("Component Updated");

    if (this.state.selectedBreed === "Random" && !this.state.randomDogFetched) {
      console.log("Random was selected");
      this.getRandomDogFromApi();
    } else if (
      this.state.selectedBreed === "husky" &&
      !this.state.huskyFetched
    ) {
      console.log("Husky was selected");
      this.getOtherDogFromApi();
      this.setState({
        huskyFetched: true,
        boxerFetched: false,
        randomDogFetched: false,
        beagleFetched: false,
        dalmatianFetched: false
      });
    } else if (
      this.state.selectedBreed === "boxer" &&
      !this.state.boxerFetched
    ) {
      console.log("Boxer was selected");
      this.getOtherDogFromApi();
      this.setState({
        boxerFetched: true,
        huskyFetched: false,
        randomDogFetched: false,
        beagleFetched: false,
        dalmatianFetched: false
      });
    } else if (
      this.state.selectedBreed === "beagle" &&
      !this.state.beagleFetched
    ) {
      console.log("Beagle was selected");
      this.getOtherDogFromApi();
      this.setState({
        beagleFetched: true,
        boxerFetched: false,
        huskyFetched: false,
        randomDogFetched: false,
        dalmatianFetched: false
      });
    } else if (
      this.state.selectedBreed === "dalmatian" &&
      !this.state.dalmatianFetched
    ) {
      console.log("Dalmatian was selected");
      this.getOtherDogFromApi();
      this.setState({
        dalmatianFetched: true,
        beagleFetched: false,
        boxerFetched: false,
        huskyFetched: false,
        randomDogFetched: false
      });
    }
  }

  changeImage = () => {
    console.log("Next button clicked");
    if (this.state.selectedBreed === "Random") {
      this.getRandomDogFromApi();
    } else if (this.state.selectedBreed === "husky") {
      this.getOtherDogFromApi();
    } else if (this.state.selectedBreed === "boxer") {
      this.getOtherDogFromApi();
    } else if (this.state.selectedBreed === "beagle") {
      this.getOtherDogFromApi();
    } else if (this.state.selectedBreed === "dalmatian") {
      this.getOtherDogFromApi();
    }
  };

  render() {
    console.log("render was called");
    return (
      <div>
        <label htmlFor="dogs">Select a breed:</label>

        <select name="dogs" id="dogs" onChange={this.getBreedFromUi}>
          <option value="Random" defaultValue>
            Random
          </option>
          <option value="beagle">Beagle</option>
          <option value="boxer">Boxer</option>
          <option value="dalmatian">Dalmatian</option>
          <option value="husky">Husky</option>
        </select>

        <div>
          <img src={this.state.randomDogLink} alt="Dog Not Available" />
        </div>

        <button onClick={this.changeImage}> Next </button>
      </div>
    );
  }
}
