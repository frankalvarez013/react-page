//Made jsx for php

import { createRoot } from "react-dom/client";
//Used to create a live server/ Also make sure that we can reuse a template
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//Used to cache useEffects/ revisiting of a page
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";
import SearchParams from "./SearchParams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

//Pet capital is a component is created thats why its Capitalized below
//jsx needs self closing tag even if its a whatever tag like input
const App = () => {
  return (
    <BrowserRouter>
      {/* QueryClientProvider is just providing context to components */}
      {/* Will wrap our app with the provider necessary to power react-query */}
      <QueryClientProvider client={queryClient}>
        {/* Browser Router gives "context" to all components underneath it which allow us to use useParams in Details.jsx to pass it to side store of data */}
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          {/* /:id means its a variable, the id is the variable that your coming out of the path */}
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
//We are giving it a component
root.render(<App />);
