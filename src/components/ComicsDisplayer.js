import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicsDisplayer = ({ data, random, addToFav, favorites }) => {
  const [infos, setInfos] = useState(false);
  if (typeof favorites === "string") {
    favorites = JSON.parse(favorites);
  }
  return data.results.map((elem, index) => (
    <div key={index} className="home-container">
      {random[0] === index && (
        <div className="discover">
          <img
            src={`${
              elem.thumbnail.path.includes("image_not_available")
                ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                : elem.thumbnail.path
            }.${elem.thumbnail.extension}`}
            alt=""
            className={infos ? "discover-information" : "discover-images"}
            onClick={() => {
              setInfos(!infos);
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
          {infos && (
            <p className="discover-desc">
              <span>Description :</span>
              {elem.description ? (
                <p>{elem.description.replaceAll(`\r<br>`, " ")}</p>
              ) : (
                <p>No description for this article.</p>
              )}
            </p>
          )}
          <p>{elem.title}</p>
        </div>
      )}
      {random[1] === index && (
        <div className="discover">
          <img
            src={`${
              elem.thumbnail.path.includes("image_not_available")
                ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                : elem.thumbnail.path
            }.${elem.thumbnail.extension}`}
            alt=""
            className={infos ? "discover-information" : "discover-images"}
            onClick={() => {
              setInfos(!infos);
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
          {infos && (
            <p className="discover-desc">
              <span>Description :</span>
              {elem.description ? (
                <p>{elem.description.replaceAll(`\r<br>`, " ")}</p>
              ) : (
                <p>No description for this article.</p>
              )}
            </p>
          )}
          <p>{elem.title}</p>
        </div>
      )}
      {random[2] === index && (
        <div className="discover">
          <img
            src={`${
              elem.thumbnail.path.includes("image_not_available")
                ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                : elem.thumbnail.path
            }.${elem.thumbnail.extension}`}
            alt=""
            className={infos ? "discover-information" : "discover-images"}
            onClick={() => {
              setInfos(!infos);
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
          {infos && (
            <p className="discover-desc">
              <span>Description :</span>
              {elem.description ? (
                <p>{elem.description.replaceAll(`\r<br>`, " ")}</p>
              ) : (
                <p>No description for this article.</p>
              )}
            </p>
          )}
          <p>{elem.title}</p>
        </div>
      )}
    </div>
  ));
};

export default ComicsDisplayer;
