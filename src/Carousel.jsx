import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };
  //if you don't pass anything into carousel object which comes from Search Params then it will use the defaultProps method
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };
  //Arrow carries over context compared to one that doesn't have arrow
  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  //Class object needs a render
  render() {
    const { active } = this.state;
    //props is how we get the image
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            //eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
