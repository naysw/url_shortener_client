import { useLinkHistory } from "../../hooks/useLinkHistory";
import { UrlModel } from "../../types";
import LinkItem from "../LinkItem";

const LinkHistory = () => {
  const { history } = useLinkHistory();

  function renderableHistories(value: UrlModel[]) {
    return true;
  }

  return (
    <div className="bg-slate-100 rounded-lg py-4 mt-4">
      {history && renderableHistories(history)
        ? history
            .slice(0, 5)
            .map(({ id, fullUrl, shortCode, link }, index) => (
              <LinkItem
                key={index}
                fullUrl={fullUrl}
                link={link}
                id={id}
                shortCode={shortCode}
              />
            ))
        : null}
    </div>
  );
};

export default LinkHistory;
