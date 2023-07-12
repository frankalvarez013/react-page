//Since jsx is used it knows that React is being used.

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };
//------------------
//These lines above and below are the exact same.
//------------------

import { Link } from "react-router-dom";
//We use the link so that it doesn't refresh the page and allows us to go fasster than just using an "a tag"
const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    //We changed it from <a> to <Link> because it allows us to not have to reload the entire app all over again.
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};
//default is how modules "work"
export default Pet;
