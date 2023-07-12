//Made jsx for php

import { createRoot } from "react-dom";
import Pet from "./Pet";

//Pet capital is a component is created thats why its Capitalized below
//jsx needs self closing tag even if its a whatever tag like input
const App = () => {
  <div>
    <h1>Adopt me!</h1>
    <Pet name="Luna" animal="dog" breed="Havanese" />
    <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
    <Pet name="Doink" animal="cat" breed="Mixed" />
  </div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
//We are giving it a component
root.render(<App />);
