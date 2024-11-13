import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlacesStart, markAsVisited } from "../redux/placesSlice";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PlaceSlider.css";

const PlaceSlider = () => {
  const dispatch = useDispatch();
  const { data: places } = useSelector((state) => state.places);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPlacesStart());
  }, [dispatch]);

  const settings = {
    dots: false,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    cssEase: "ease",
    afterChange: (current) => setActiveIndex(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * places.length);
    setActiveIndex(randomIndex);
    sliderRef.current.slickGoTo(randomIndex);
  };

  const handleMarkAsVisitedClick = (placeId) => {
    setSelectedPlaceId(placeId);
    const modalElement = document.getElementById("confirmationModal");
    const modal = new window.bootstrap.Modal(modalElement);
    modal.show();
  };

  const confirmMarkAsVisited = () => {
    dispatch(markAsVisited(selectedPlaceId));
    const modalElement = document.getElementById("confirmationModal");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  const currentPlace = places[activeIndex];
  const backgroundStyle = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${currentPlace?.image})`,
  };

  return (
    <div style={backgroundStyle} className="page-background">
      <div className="container my-4">
        <div className="text-center">
          <h1 className="page-title mb-5 text-light">Historical Places</h1>

          <h6 className="text-light">
            Discover historical places around the world randomly?
          </h6>
          <p className="mb-4 text-light">
            <small>Click button below</small>
          </p>

          <button
            onClick={handleRandomSuggestion}
            className="btn btn-primary text-dark btn-colored mb-3"
          >
            <span>Random Suggestion</span>
          </button>
        </div>

        <Slider {...settings} ref={sliderRef} className="place-slider my-5">
          {places.map((place) => (
            <div key={place.id} className="card text-center mx-2 place-item">
              <div className="card-img-container">
                <img
                  src={place.image}
                  alt={place.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-light">{place.name}</h5>
                <p className="card-text text-light text-truncate my-4">
                  {place.description}
                </p>
                <Link
                  to={`/place/${place.id}`}
                  className="btn btn-info btn-colored"
                >
                  <span>View Details</span>
                </Link>
                <button
                  onClick={() => handleMarkAsVisitedClick(place.id)}
                  className={`btn ms-4 btn-success ${
                    place.visited ? "btn-visited" : ""
                  }`}
                  disabled={place.visited}
                >
                  {place.visited ? "Visited" : "Mark as Visited"}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">
                Confirm Visited
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
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
                data-bs-dismiss="modal"
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
    </div>
  );
};

export default PlaceSlider;
