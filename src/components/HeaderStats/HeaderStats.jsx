const HeaderStats = ({ tokens, queueLength, cost }) => (
  <div data-testid="header-stats">
    <h4 className="mt-4 py-2 fw-bold">
      Tokens: {tokens} Queue Length: {queueLength}
    </h4>
    <h4 className="fw-bold">Cost to add song: {cost}</h4>
  </div>
);
export default HeaderStats;
