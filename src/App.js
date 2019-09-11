import React from 'react';
import Main from "./components/main";
import image from "./2293916.svg";

function App() {

  return (
    <div className="container">
      <header>
         <h1>React Context With Hooks</h1>
      </header>
      <img className="hero" src={image} />
      <main>
        <Main/>
      </main>

    </div>
  );
}

export default App;
