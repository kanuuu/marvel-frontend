import "./ComicsSearch.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicsSearch = ({ addToFav, favorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [limit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(false);
  const [div, setDiv] = useState([]);

  if (typeof favorites === "string") {
    favorites = JSON.parse(favorites);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics?limit=${limit}&skip=${skip}&title=${title}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
    autoComplete();
  }, [limit, skip, title]);

  //testing
  const autoComplete = () => {
    const regex = new RegExp(title, "g");
    if (data?.results.length > 1) {
      const value = data.results.find((elem) =>
        elem.title.toLowerCase().search(regex)
      );
      const newDiv = [value?.title];
      console.log(value);
      console.log(newDiv);
      setDiv(newDiv);
    }
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="comics-page">
      <div className="comics-container">
        <h1>
          <span className="color-red">C</span>omics{" "}
          <span className="color-red">S</span>earcher
        </h1>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setDiv(e.target.value);
            setSkip(0);
          }}
        />
        <div>
          AutoComplete | <span className="color-red">{div} </span>|
        </div>

        <p>
          Results found : <span className="color-red">{data.count}</span>
        </p>
        <div className="covers">
          {data.results.map((elem) => {
            return (
              <div className="covers-div">
                <p
                  className={desc ? "covers-title-2" : "covers-title-1"}
                  onClick={() => {
                    setDesc(!desc);
                  }}
                >
                  {elem.title}
                  {desc && (
                    <div>
                      <div>
                        <p>Description :</p>
                        {elem.description ? (
                          <p>{elem.description.replaceAll(`\r<br>`, " ")}</p>
                        ) : (
                          <p>No description for this article.</p>
                        )}
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
                  onClick={() => {
                    setDesc(!desc);
                  }}
                />
                <div
                  className={
                    favorites.some((e) => e.id === elem._id)
                      ? "favorites"
                      : "not-favorites"
                  }
                  onClick={() => {
                    if (favorites.some((e) => e.id === elem._id)) {
                      console.log("already in fav");
                    } else {
                      addToFav(elem._id);
                    }
                  }}
                >
                  <FontAwesomeIcon icon="fa-star" />
                </div>
              </div>
            );
          })}
        </div>
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
  );
};

export default ComicsSearch;
