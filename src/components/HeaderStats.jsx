const HeaderStats = ({ tokens, queueLength, cost }) => (
  <>
    <h4 className="mt-4 py-2 fw-bold">
      Tokens: {tokens} Queue Length: {queueLength}
    </h4>
    <h4 className="fw-bold">Cost to add song: {cost}</h4>
  </>
);
export default HeaderStats;
