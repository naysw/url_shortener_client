import { useUrlHistory } from "../../hooks/useUrlHistory";
import { UrlModel } from "../../types";

const UrlHistory = () => {
  const { history } = useUrlHistory();

  function renderableHistories(value: UrlModel[]) {
    return true;
  }

  return (
    <div className="bg-white p-4">
      {history && renderableHistories(history)
        ? history.map(({ id, originalUrl }, index) => (
            <div key={index}>{originalUrl}</div>
          ))
        : null}
    </div>
  );
};

export default UrlHistory;
