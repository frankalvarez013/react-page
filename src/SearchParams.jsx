import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
//If we put an input inside breeds the disabled tag on the breeds label will add the list

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  //Location is a space that youre allowed to keep track of which can change based on user
  //you cant put them inside an if statement
  //All hooks start with use... like useState below;
  //all hooks need to be in body of function
  //useState returns an array, and its first index is location value
  // and second index contains setLocation method.
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //Browser API - feed it a form and it will pull all the data into object
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          {/* OnChange is used so that when the user changes values inside the input, the object changes on both the screen and js */}
          <input name="location" id="location" placeholder="Location" />
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
            name="breed"
            id="breed"
            // Disables the select option if there are no breeds
            disabled={breeds.length === 0}
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
