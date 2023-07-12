import { useState, useEffect } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
//If we put an input inside breeds the disabled tag on the breeds label will add the list

const SearchParams = () => {
  //Location is a space that youre allowed to keep track of which can change based on user
  //you cant put them inside an if statement
  //All hooks start with use... like useState below;
  //all hooks need to be in body of function
  //useState returns an array, and its first index is location value
  // and second index contains setLocation method.
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  //Line below calls from the API
  const [pets, setPets] = useState([]);
  //useEffect is done at the start, and uses requestPets
  useEffect(() => {
    requestPets();
    //below line removes a need to have any dependencies (when do I run this, never run this line again - run it once for its first render
    //) on the array on array just below this cuz if the form is detected that it changes it rerenders every time it calls for exampe "Pets"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //we dont want to fully form submit above
          requestPets();
          //we use this in order to only change the list when we hit the submit btn
        }}
      >
        <label htmlFor="location">
          Location
          {/* OnChange is used so that when the user changes values inside the input, the object changes on both the screen and js */}
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          {/* Changes animal type depending on the option you put in */}
          <select
            id="animal"
            // Remember Value is the one on the front-end
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {/* Changes the breed based on the animal type */}
            {ANIMALS.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            name=""
            id="breed"
            // Disables the select option if there are no breeds
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />

            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
  //pet.id it can have a handle of switching the order of the array
};

export default SearchParams;
