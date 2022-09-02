import { useUrlHistory } from "../../hooks/useUrlHistory";
import { UrlModel } from "../../types";
import UrlItem from "../UrlItem";

const UrlHistory = () => {
  const { history } = useUrlHistory();

  function renderableHistories(value: UrlModel[]) {
    return true;
  }

  return (
    <div className="bg-slate-100 rounded-lg py-4 mt-4">
      {history && renderableHistories(history)
        ? history
            .slice(0, 5)
            .map(({ id, originalUrl, shortCode, link }, index) => (
              <UrlItem
                key={index}
                originalUrl={originalUrl}
                link={link}
                id={id}
                shortCode={shortCode}
              />
            ))
        : null}
    </div>
  );
};

export default UrlHistory;
