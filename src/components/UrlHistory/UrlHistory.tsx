import clsx from "clsx";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useUrlHistory } from "../../hooks/useUrlHistory";
import { UrlModel } from "../../types";

const UrlHistory = () => {
  const { history } = useUrlHistory();
  const [copied, setCopied] = React.useState<boolean>(false);

  function renderableHistories(value: UrlModel[]) {
    return true;
  }

  function handleCopyLink() {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 500);
  }

  return (
    <div className="bg-slate-200 rounded p-4 mt-4 shadow space-y-4">
      {history && renderableHistories(history)
        ? history.map(({ id, originalUrl, shortCode, link }, index) => (
            <div key={index} className={clsx("flex items-center")}>
              <div className="flex-1">{originalUrl}</div>
              <div className="flex items-center">
                <a href={link} className="text-blue-600 font-bold">
                  {link}
                </a>

                <CopyToClipboard text={link} onCopy={handleCopyLink}>
                  <button className="ml-4">{copied ? "Copied" : "Copy"}</button>
                </CopyToClipboard>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default UrlHistory;
