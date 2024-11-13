import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { markAsVisited } from "../redux/placesSlice";
import "./PlaceDetails.css";

const PlaceDetails = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const place = useSelector((state) =>
    state.places.data.find((place) => place.id === placeId)
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!place) {
      const savedPlaces = JSON.parse(localStorage.getItem("places"));
      if (savedPlaces) {
        dispatch({ type: "places/loadFromLocalStorage", payload: savedPlaces });
      }
    }
  }, [dispatch, place]);
  if (!place) {
    return <p>Place not found</p>;
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleMarkAsVisitedClick = () => {
    setShowModal(true);
  };

  const confirmMarkAsVisited = () => {
    dispatch(markAsVisited(placeId));
    setShowModal(false);
  };

  const currentPlace = place;
  const backgroundStyle = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${currentPlace?.image})`,
  };

  return (
    <div style={backgroundStyle} className="page-background">
      <div className="container my-4">
        <div className="details-header mb-4">
          <button onClick={handleBack} className="btn text-light">
            Back
          </button>
          <h2 className="card-title text-light">{place.name}</h2>
          <button
            onClick={handleMarkAsVisitedClick}
            className="btn btn-success"
            disabled={place.visited}
          >
            {place.visited ? "Visited" : "Mark as Visited"}
          </button>
        </div>
        <div className="card place-item">
          <div className="card-img-container">
            <img src={place.image} alt={place.name} className="card-img-top" />
          </div>
          <div className="card-body">
            <p className="card-text text-light">{place.description}</p>
          </div>
        </div>

        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div
              className="modal fade show"
              tabIndex="-1"
              style={{ display: "block" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Visited</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to mark this place as visited?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={confirmMarkAsVisited}
                    >
                      Yes, Mark as Visited
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceDetails;
