const HeaderStats = ({ tokens, queueLength }) => (
  <>
    <h4 className="mt-4 py-2 fw-bold">Tokens: {tokens}</h4>
    <h4 className="fw-bold">Queue Length: {queueLength}</h4>
  </>
);
export default HeaderStats;
