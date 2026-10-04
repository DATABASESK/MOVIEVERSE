"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChair, FaDoorOpen, FaPlay, FaRandom } from "react-icons/fa";

import { useWatchContext } from "@/context/Watch";
import { useWatchSettingContext } from "@/context/WatchSetting";

const TheaterExperience = () => {
  const {
    watchInfo,
    MovieInfo,
  } = useWatchContext();

  const {
    watchSetting,
    setWatchSetting,
  } = useWatchSettingContext();

  const [selectedSeat, setSelectedSeat] = useState(
    watchSetting?.theaterSeat || null
  );

  const [entered, setEntered] = useState(
    watchSetting?.theaterEntered || false
  );

  useEffect(() => {
    setSelectedSeat(watchSetting?.theaterSeat || null);
    setEntered(watchSetting?.theaterEntered || false);
  }, [
    watchSetting?.theaterSeat,
    watchSetting?.theaterEntered,
  ]);

  const title =
    MovieInfo?.title ||
    MovieInfo?.name ||
    MovieInfo?.original_name ||
    MovieInfo?.original_title ||
    "Now Playing";

  const poster =
    MovieInfo?.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${MovieInfo.backdrop_path}`
      : MovieInfo?.poster_path
        ? `https://image.tmdb.org/t/p/w780${MovieInfo.poster_path}`
        : "";

  const iframeUrl = watchInfo?.url;

  const exitTheater = () => {
    setWatchSetting((prev) => ({
      ...prev,
      theaterOpen: false,
      theaterEntered: false,
      theaterSeat: null,
    }));
  };

  const changeSeat = () => {
    setEntered(false);

    setWatchSetting((prev) => ({
      ...prev,
      theaterEntered: false,
      theaterSeat: selectedSeat,
    }));
  };

  const enterTheater = () => {
    if (!selectedSeat) return;

    setWatchSetting((prev) => ({
      ...prev,
      theaterSeat: selectedSeat,
      theaterEntered: true,
    }));

    setEntered(true);
  };

  const randomSeat = () => {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const number = Math.floor(Math.random() * 10) + 1;

    setSelectedSeat(
      `${rows[Math.floor(Math.random() * rows.length)]}${number}`
    );
  };

  const theaterSeats = useMemo(() => {
    const rows = ["A", "B", "C", "D", "E", "F"];

    return rows.flatMap((row) =>
      Array.from({ length: 10 }, (_, index) => ({
        id: `${row}${index + 1}`,
        row,
        number: index + 1,
      }))
    );
  }, []);

  if (!entered) {
    return (
      <div className="theater-root theater-seat-mode">

        <div
          className="theater-backdrop"
          style={
            poster
              ? {
                  backgroundImage: `linear-gradient(rgba(5,4,10,.88), rgba(5,4,10,.97)), url("${poster}")`,
                }
              : undefined
          }
        />

        <div className="theater-seat-container">

          <div className="theater-seat-header">
            <div>
              <p className="theater-eyebrow">
                PREMIUM CINEMA
              </p>

              <h2 className="theater-title">
                Choose Your Seat
              </h2>

              <p className="theater-subtitle">
                Select your seat before entering the theater.
              </p>
            </div>

            <button
              type="button"
              className="theater-exit-button"
              onClick={exitTheater}
            >
              <FaDoorOpen />
              Exit
            </button>
          </div>

          <div className="theater-screen-preview">
            <div className="theater-screen-glow" />

            <div className="theater-screen-small">
              <span>SCREEN</span>
            </div>
          </div>

          <div className="theater-seat-area">

            <div className="theater-seat-legend">
              <div>
                <span className="seat-demo available" />
                Available
              </div>

              <div>
                <span className="seat-demo selected" />
                Selected
              </div>

              <div>
                <span className="seat-demo occupied" />
                Occupied
              </div>
            </div>

            <div className="theater-seat-grid">
              {theaterSeats.map((seat) => {
                /*
                 * Randomly make a small number of seats look occupied.
                 * The user's selected seat is always selectable.
                 */
                const occupied =
                  ["A3", "B7", "C4", "D9", "E2", "F6"].includes(
                    seat.id
                  );

                const selected =
                  selectedSeat === seat.id;

                return (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={occupied}
                    className={[
                      "theater-seat",
                      occupied ? "occupied" : "",
                      selected ? "selected" : "",
                    ].join(" ")}
                    onClick={() => {
                      if (!occupied) {
                        setSelectedSeat(seat.id);
                      }
                    }}
                    title={
                      occupied
                        ? `${seat.id} is occupied`
                        : `Select seat ${seat.id}`
                    }
                  >
                    <FaChair />
                    <span>{seat.id}</span>
                  </button>
                );
              })}
            </div>

            <div className="theater-seat-actions">

              <div className="theater-selected-seat">
                <span>Your Seat</span>

                <strong>
                  {selectedSeat || "Not selected"}
                </strong>
              </div>

              <button
                type="button"
                className="theater-random-button"
                onClick={randomSeat}
              >
                <FaRandom />
                Random Seat
              </button>

              <button
                type="button"
                className="theater-enter-button"
                disabled={!selectedSeat}
                onClick={enterTheater}
              >
                <FaPlay />
                Enter Theater
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theater-root theater-view-mode">

      <div className="theater-room">

        <div className="theater-ceiling">
          <div className="theater-ceiling-light light-one" />
          <div className="theater-ceiling-light light-two" />
          <div className="theater-ceiling-light light-three" />
          <div className="theater-ceiling-light light-four" />
          <div className="theater-ceiling-light light-five" />
        </div>

        <div className="theater-wall-left" />
        <div className="theater-wall-right" />

        <div className="theater-screen-wrapper">

          <div className="theater-screen-frame">

            <div className="theater-screen">

              {watchInfo?.iframe ? (
                <iframe
                  src={iframeUrl}
                  className="theater-video-frame"
                  allowFullScreen
                  loading="eager"
                  frameBorder="0"
                  sandbox="allow-scripts allow-same-origin"
                  allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                  title={title}
                />
              ) : (
                <div className="theater-video-unavailable">
                  <div>
                    <p>
                      Theater Mode
                    </p>

                    <span>
                      Select an iframe video server to play the movie
                      inside the theater screen.
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>

          <div className="theater-screen-light" />
        </div>

        <div className="theater-stage">

          <div className="theater-curtain-left" />
          <div className="theater-curtain-right" />

        </div>

        <div className="theater-floor">

          <div className="theater-floor-light" />

          <div className="theater-seats-perspective">

            {["A", "B", "C"].map((row, rowIndex) => (
              <div
                className={`theater-seat-row row-${rowIndex}`}
                key={row}
              >
                {Array.from({ length: 10 }, (_, index) => {

                  const id = `${row}${index + 1}`;

                  return (
                    <div
                      className={`theater-room-seat ${
                        id === selectedSeat
                          ? "current-seat"
                          : ""
                      }`}
                      key={id}
                    >
                      <div className="seat-back">
                        <div className="seat-headrest" />
                      </div>

                      <div className="seat-bottom" />

                      {id === selectedSeat && (
                        <div className="seat-you">
                          YOU
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

          </div>
        </div>

        <div className="theater-ui">

          <div className="theater-now-playing">

            <span className="theater-live-dot" />

            <div>
              <small>
                NOW PLAYING
              </small>

              <strong>
                {title}
              </strong>
            </div>

          </div>

          <div className="theater-controls">

            <div className="theater-seat-info">
              <FaChair />
              Seat {selectedSeat}
            </div>

            <button
              type="button"
              onClick={changeSeat}
              className="theater-control-button"
            >
              Change Seat
            </button>

            <button
              type="button"
              onClick={exitTheater}
              className="theater-control-button danger"
            >
              <FaDoorOpen />
              Exit Theater
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TheaterExperience;
