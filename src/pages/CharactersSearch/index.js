import "./CharactersSearch.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CharactersSearch = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [limit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [moreInfos, setMoreInfos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?limit=${limit}&skip=${skip}&name=${name}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [limit, skip, name]);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="characters-page">
      <div className="characters-container">
        <h1>
          <span className="color-red">C</span>haracters{" "}
          <span className="color-red">S</span>earch
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSkip(0);
          }}
        />
        <p>
          Results found : <span className="color-red">{data.count}</span>
        </p>
        <div className="characters">
          {data.results.map((elem) => {
            return (
              <div
                className="characters-div"
                onClick={() => {
                  setMoreInfos(!moreInfos);
                }}
              >
                <p className={moreInfos ? "covers-title-2" : "covers-title-1"}>
                  <p>{elem.name}</p>
                  {moreInfos && (
                    <div>
                      <div>
                        <Link to={`/character/${elem._id}`}>
                          <button className="btn-more">
                            Learn more about {elem.name}
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </p>
                <img
                  src={`${
                    elem.thumbnail.path.includes("image_not_available")
                      ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                      : elem.thumbnail.path
                  }.${elem.thumbnail.extension}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          className="button-container"
        >
          <button
            onClick={() => {
              setSkip(skip - 4);
            }}
            style={{ visibility: skip < 1 && "hidden" }}
          >
            &lt; Previous
          </button>
          <p>Page {skip / 4 + 1}</p>
          <button
            onClick={() => {
              setSkip(skip + 4);
            }}
            style={{ visibility: skip > data.count - 1 && "hidden" }}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharactersSearch;
