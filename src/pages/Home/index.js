import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";

//components
import ComicsDisplayer from "../../components/ComicsDisplayer";
import CharactersDisplayer from "../../components/CharactersDisplayer";

const Home = ({ addToFav, favorites }) => {
  const [data, setData] = useState();
  const [charData, setCharData] = useState();
  const [random] = useState([0, 1, 2]);
  const [isLoading, setIsLoading] = useState(true);

  if (typeof favorites === "string") {
    favorites = JSON.parse(favorites);
  }

  const getRandomThumbnail = () => {
    return Math.floor(Math.random() * (100 - 0 + 1) + 0);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const responseComics = await axios.get(
          `http://localhost:4000/comics?limit=${getRandomThumbnail()}&skip=${getRandomThumbnail()}`
        );
        const responseCharacters = await axios.get(
          `http://localhost:4000/characters?limit=${getRandomThumbnail()}&skip=${getRandomThumbnail()}`
        );

        setData(responseComics.data);
        console.log(responseCharacters.data);
        setCharData(responseCharacters.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.data.response);
      }
    };
    fetchData();
  }, []);

  // console.log(getRandomThumbnail());

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="home-page container">
      {data.results.map((elem, index) => (
        <div key={index} className="thumbnail">
          {index === data.results.length - 1 && (
            <div className="landing-image">
              <img
                src={`${
                  elem.thumbnail.path.includes("image_not_available")
                    ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                    : elem.thumbnail.path
                }.${elem.thumbnail.extension}`}
                alt=""
                className="home-images"
              />
              <p className="landing-text">
                <span style={{ color: "red" }}>M</span>arvel
                <span className="landing-text-2">
                  <span style={{ color: "red" }}>W</span>orld
                </span>
              </p>
              <p className="landing-indicator">V</p>
            </div>
          )}
        </div>
      ))}
      <div className="text home-container">
        <h2>What is Marvel World ?</h2>
        <p>
          Marvel World is a browser for all the fans of Marvel comics, search,
          favorites your comics, and discover them
        </p>
      </div>
      <div className="text home-container">
        <h2>What can you find here ?</h2>
        <p>There is a total of {data.count} comics with their informations !</p>
      </div>
      <div className="text home-container">
        <h2>Don't know where to start ?</h2>
        <p>Try these one by clicking on it !</p>
      </div>
      <ComicsDisplayer
        addToFav={addToFav}
        favorites={favorites}
        data={data}
        random={random}
      />
      <div className="text home-container">
        <h2>Want more content ?</h2>
        <p>
          No problem ! There is also a total of {charData.count} characters !
        </p>
      </div>
      <CharactersDisplayer charData={charData} random={random} />
    </div>
  );
};

export default Home;
