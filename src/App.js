import React from "react";
import PostService from "./Api/PostService";

function App() {
  const request = ()=>{
    PostService.getListTasks('01/01/2023','01/02/2023', null, 111111);
  }
  const request2 = ()=>{
    PostService.getTask(1);
  }
  return (
    <div className="App">
      <button onClick={request}>Кнопа</button>
      <button onClick={request2}>Кнопа2</button>
    </div>
  );
}

export default App;
