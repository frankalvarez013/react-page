import { useState, useEffect } from "react";

const localCache = {};
//Takes in an animal and is able to save that breed and gives back same list if its there
export default function useBreedList(animal) {
  //Remember hooks are used to set the first value and change it with the method (2nd index)
  const [breedList, setBreedList] = useState([]);
  //just see status unloading loading...
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      //if empty...
      setBreedList([]);
    } else if (localCache[animal]) {
      //if we already have it...
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    //inside useEffect important...
    async function requestBreedList() {
      //refreshes...
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();
      //Save breed to localCache
      //empty array if animal doesn't exist
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
