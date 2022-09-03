import React from "react";
import Row from "./Row";
import "./App.css";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      {/* Nav bar */}
      <Nav />
      {/*Banner  */}
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documantaries" fetchURL={requests.fetchDocumantaries} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
    </div>
  );
}

export default App;
