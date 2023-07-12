import React from "react";
//You can include ReactDom but since we just use createRoot
//we just have it there.
import { createRoot } from "react-dom";

//Returns an array of
//props will then move to children
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};
//Component must return markup which comes from a React.createElement

const App = () => {
  return React.createElement(
    //What kind of element do you want below for example "something-not-real" where it will look for that element
    //It will also create that type of tag so if its like div-not-real then it will create a new component
    "div",
    //Null object is the attributes your'e handing down into the html element, its the target in the html file
    {},
    //Whatever goes inside that div(the element we targeted) - the children
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        animal: "Dog",
        name: "Luna",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        animal: "Bird",
        name: "Pepper",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        animal: "Cat",
        name: "Doink",
        breed: "Mixed",
      }),
    ]
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
//We are giving it a component
root.render(React.createElement(App));

//React Principle: one way data flow -> you can pass data from app to pet, but not pet to app.
//We are passing info down to pet, app can mess with children, but children cannot mess with parent. Makes data flow explicit, you know it came from app,
//as it shifts down to their parents.
