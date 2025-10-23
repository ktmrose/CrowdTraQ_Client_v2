import PartyGirlAwkward from "../../assets/PartyGirlAwkward.png";

const ClosedConnection = () => {
  return (
    <div className="my-4" data-testid="closed-connection">
      <h2>No connection</h2>
      <img
        src={PartyGirlAwkward}
        alt="Party girl is embarassed for you"
        className="w-50 mt-4 border-0"
      />
    </div>
  );
};
export default ClosedConnection;
