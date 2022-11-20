import "./Characters.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ favorites, addToFav }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [comicsData, setComicsData] = useState();

  if (typeof favorites === "string") {
    favorites = JSON.parse(favorites);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/character/${id}`
        );
        const responseComics = await axios.get(
          `http://localhost:4000/comics/${id}`
        );
        setComicsData(responseComics.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    fetchData();
  }, [id]);

  const autoScroll = keyframes`
  0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(calc(-85% * ${comicsData?.comics.length}));
    }
    100% {
      transform: translateX(0); 
    }
  `;
  const SlidingDiv = styled.div`
    animation: ${autoScroll} calc(5 * ${comicsData?.comics.length}s) linear
      infinite;
  `;

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="char-page">
      <div className="char-card char-container">
        <p className="name">{data.name}</p>
        <img
          src={`${
            data.thumbnail.path.includes("image_not_available")
              ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
              : data.thumbnail.path
          }.${data.thumbnail.extension}`}
          alt=""
          className="char-image"
        />

        <p className="desc-char">Description :</p>
        {data.description ? (
          <p className="desc-char-text">
            {data.description.replaceAll(`\r<br>`, " ")}
          </p>
        ) : (
          <p className="desc-char-text">No description for this article.</p>
        )}
        <p className="found-in">
          <h2>Can be found in :</h2>
        </p>
        {data.comics.length > 0 ? (
          <p>
            <span className="color-red">{data.comics.length}</span> comics
          </p>
        ) : (
          <p>No comics related to {data.name}.</p>
        )}
        {comicsData.comics.length > 0 && (
          <div className="char-comics-img">
            {comicsData.comics.map((elem) => (
              <SlidingDiv className="comics-appear">
                <p className="comics-img-title">{elem.title}</p>
                <img
                  src={`${
                    elem.thumbnail.path.includes("image_not_available")
                      ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                      : elem.thumbnail.path
                  }.${elem.thumbnail.extension}`}
                  alt=""
                  className="comics-img"
                />
                <div
                  className={
                    favorites && favorites.some((e) => e.id === elem._id)
                      ? "favorites"
                      : "not-favorites"
                  }
                >
                  <FontAwesomeIcon icon="fa-star" />
                </div>
              </SlidingDiv>
            ))}
          </div>
        )}

        <Link to="/">
          <button>Get back to home</button>
        </Link>
      </div>
    </div>
  );
};

export default Characters;
