import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "../../nsw/ui/components/Button";
import { UrlModel } from "../../types";

interface Props extends UrlModel {}

const LinkItem = ({ fullUrl, link }: Props) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  function handleCopyLink() {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 500);
  }

  return (
    <div className="flex items-center hover:bg-blue-100 px-6 py-4 rounded">
      <div className="flex-1 text-gray-600 break-all">{fullUrl}</div>
      <div className="flex items-center">
        <a href={link} className="text-blue-600 break-all">
          {link}
        </a>

        <CopyToClipboard text={link} onCopy={handleCopyLink}>
          <Button className="ml-4 bg-blue-200 text-blue-600 font-normal text-sm focus:ring-blue-700">
            {copied ? "Copied" : "Copy"}
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default LinkItem;
