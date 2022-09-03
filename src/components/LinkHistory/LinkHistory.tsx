import { useLinkHistory } from "../../hooks/useLinkHistory";
import { useMyLinksQuery } from "../../hooks/useMyLinksQuery";
import { UrlModel } from "../../types";
import LinkItem from "../LinkItem";
import LinkItemSkeleton from "../LinkItemSkeleton";
import QueryStateHandler from "../QueryStateHandler";

const LinkHistory = () => {
  const { history } = useLinkHistory();
  const { data, status, error } = useMyLinksQuery();

  function renderableHistories(value: UrlModel[]) {
    return true;
  }

  return (
    <div className=" mt-4">
      <QueryStateHandler
        status={status}
        error={error}
        data={data}
        renderLoading={new Array(3).fill(0).map((_, index) => (
          <LinkItemSkeleton key={index} />
        ))}
      >
        {({ data: links }: any) =>
          links.length ? (
            <div className="space-y-2">
              {links.map(
                (
                  { id, fullUrl, shortCode, shortUrl: link }: any,
                  index: number,
                ) => (
                  <LinkItem
                    key={index}
                    fullUrl={fullUrl}
                    shortUrl={link}
                    id={id}
                    shortCode={shortCode}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="px-6 bg-gray-200 py-4 rounded">
              No History! why not create new one ?
            </div>
          )
        }
      </QueryStateHandler>
      {/* {history && renderableHistories(history)
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
        : null} */}
    </div>
  );
};

export default LinkHistory;
