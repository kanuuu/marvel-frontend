import { useState } from "react";
import { Link } from "react-router-dom";
const CharactersDisplayer = ({ charData, random }) => {
  const [infos, setInfos] = useState(false);
  return charData.results.map((elem, index) => (
    <div key={index} className="home-container">
      {random[0] === index && (
        <>
          <div
            className="discover"
            onClick={() => {
              setInfos(!infos);
            }}
          >
            <img
              src={`${
                elem.thumbnail.path.includes("image_not_available")
                  ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                  : elem.thumbnail.path
              }.${elem.thumbnail.extension}`}
              alt=""
              className={infos ? "discover-information" : "discover-images"}
            />
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
            <p>{elem.name}</p>
          </div>
          <Link to={`/character/${elem._id}`} className="learn-more">
            <button>Learn more about {elem.name}</button>
          </Link>
        </>
      )}
      {random[1] === index && (
        <>
          <div
            className="discover"
            onClick={() => {
              setInfos(!infos);
            }}
          >
            <img
              src={`${
                elem.thumbnail.path.includes("image_not_available")
                  ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                  : elem.thumbnail.path
              }.${elem.thumbnail.extension}`}
              alt=""
              className={infos ? "discover-information" : "discover-images"}
            />
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
            <p>{elem.name}</p>
          </div>
          <Link to={`/character/${elem._id}`} className="learn-more">
            <button>Learn more about {elem.name}</button>
          </Link>
        </>
      )}
      {random[2] === index && (
        <>
          <div
            className="discover"
            onClick={() => {
              setInfos(!infos);
            }}
          >
            <img
              src={`${
                elem.thumbnail.path.includes("image_not_available")
                  ? "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/frFR/Images/disney-FW20-general-plp-iw-tiles-Desktop-400x248px_marvel_tcm196-512217"
                  : elem.thumbnail.path
              }.${elem.thumbnail.extension}`}
              alt=""
              className={infos ? "discover-information" : "discover-images"}
            />
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
            <p>{elem.name}</p>
          </div>
          <Link to={`/character/${elem._id}`} className="learn-more">
            <button>Learn more about {elem.name}</button>
          </Link>
        </>
      )}
    </div>
  ));
};

export default CharactersDisplayer;
