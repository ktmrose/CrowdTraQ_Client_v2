import { Row, Col } from "react-bootstrap";
import PartyGirlAwkward from "../assets/PartyGirlAwkward.png";

const SongDetails = ({
  currentSongData,
  songDuration,
  safeSliderProgress,
  formatTime,
}) => (
  <Row>
    {currentSongData ? (
      <>
        <Col xs={12}>
          <h1 className="mb-3 my-sm-4 fw-bold">
            "{currentSongData?.track_name}" by{" "}
            {currentSongData?.artists?.map((artist, index) => (
              <span key={index}>
                {artist}
                {index < currentSongData?.artists?.length - 1 ? ", " : ""}
              </span>
            ))}
          </h1>
        </Col>
        <Col
          xs={12}
          sm={{ span: 8, offset: 2 }}
          md={{ span: 6, offset: 3 }}
          className="text-center"
        >
          <img
            src={currentSongData?.album_art}
            alt={`${currentSongData?.album} album cover`}
            className="w-100 album-cover"
          />
          {currentSongData && songDuration && (
            <div className="song-progress-wrapper mt-4 p-3">
              <label htmlFor="song-progress">Song Progress</label>
              <input
                type="range"
                id="song-progress"
                min={0}
                max={songDuration}
                value={safeSliderProgress}
                readOnly
                className="w-100 mt-3"
              />
              <div className="d-flex justify-content-between">
                <span>{formatTime(safeSliderProgress)}</span>
                <span>{formatTime(songDuration - safeSliderProgress)}</span>
              </div>
            </div>
          )}
        </Col>
      </>
    ) : (
      <Col>
        <h2 className="mt-5 px-sm-5">
          Oh, well, this is awkward. There's no music
        </h2>
        <img
          src={PartyGirlAwkward}
          alt="Party girl is embarassed for you"
          className="w-50 mt-4 border-0"
        />
      </Col>
    )}
  </Row>
);
export default SongDetails;
