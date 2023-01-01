import "./App.css";
import Home from "./components/home/Home";
import List from "./components/Users/Users";
import Movies from "./components/movies/Movies";
import NewMovies from "./components/movies/NewMovies/NewMovies";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Movies />} />
            <Route path="movies" element={<Movies />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":idUser" element={<NewMovies />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
