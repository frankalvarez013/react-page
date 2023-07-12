import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
//Browser Router gives "context" to all components underneath it which allow us to use useParams in Details.jsx to pass it to side store of data
// Information then gets sent to id
const Details = () => {
  const [showModal, setShowModal] = useState(false);
  //the useParams hook is how we get params from React Router. It used to be through the props but now React prefers API
  // id also comes from the App.jsx which we can see in one of the Route Tags where it carries the id and name of the Details.jsx
  const { id } = useParams();
  //Query key that is going to be provided below will be the queryKey array in fetchPet.js which will be the id
  //Also if you don't have id, use fetchPet - line below
  //useQuery will actually use the queryClient that we instantiated above via context (we have a whole section later on context.)
  //The first thing you give to useQuery is the query key. It could be a string e.g. we could have done details:1 as the key for details 1
  //(similar to a Redis strategy for key naming.) However I like the array methodology. You can give it an array of keys. So the first key is
  //details and then a subkey of that is 1 and it has to match both. You can also do it with objects and we will momentarily.
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>
                  Would you like to Adopt {pet.name}?
                  <div className="buttons">
                    <button>Yes</button>
                    <button onClick={() => setShowModal(false)}>No</button>
                  </div>
                </h1>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
