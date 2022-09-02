import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useUrlHistory } from "../../hooks/useUrlHistory";
import Button from "../../nsw/components/ui/Button";
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
    <div className="bg-slate-100 rounded-lg py-4 mt-4">
      {history && renderableHistories(history)
        ? history
            .slice(0, 5)
            .map(({ id, originalUrl, shortCode, link }, index) => (
              <div
                key={index}
                className="flex items-center hover:bg-blue-100 px-6 py-4 rounded"
              >
                <div className="flex-1 text-gray-600">{originalUrl}</div>
                <div className="flex items-center">
                  <a href={link} className="text-blue-600">
                    {link}
                  </a>

                  <CopyToClipboard text={link} onCopy={handleCopyLink}>
                    <Button className="ml-4 bg-blue-200 text-blue-600 font-normal text-sm">
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </CopyToClipboard>
                </div>
              </div>
            ))
        : null}
    </div>
  );
};

export default UrlHistory;
