import { Row, Col } from "react-bootstrap";

const UserActions = ({
  solicitFeedback,
  sendReaction,
  addSong,
  providedReaction,
}) => (
  <Col
    xs={12}
    sm={{ span: 8, offset: 2 }}
    md={{ span: 6, offset: 3 }}
    className="text-center"
  >
    {solicitFeedback ? (
      <Row className="m-3 my-5">
        <Col xs={6} className="text-center">
          <i
            className="fas fa-fire reaction-icon mx-auto"
            role="button"
            aria-label="Like"
            onClick={() => sendReaction(true)}
          />
        </Col>
        <Col xs={6} className="text-center">
          <i
            className="fas fa-ban reaction-icon"
            role="button"
            aria-label="Dislike"
            onClick={() => sendReaction(false)}
          />
        </Col>
      </Row>
    ) : (
      <h5 className="m-3 mt-4">
        {providedReaction
          ? "Thanks for your feedback!"
          : "Psst - maybe you can add a song to get the party going?"}
      </h5>
    )}
    <Row>
      <Col xs={12} className="text-center mt-3">
        <button
          onClick={addSong}
          aria-label="Add Song"
          className="btn-cta p-3 w-100 fw-bold"
        >
          <i className="fas fa-plus" /> Add Song
        </button>
      </Col>
    </Row>
  </Col>
);
export default UserActions;
