import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import IconButton from "../../nsw/ui/components/IconButton";

interface Props {
  text: string;
  onCopy?(text: string, result: boolean): void;
}

const CopyButton = ({ text, onCopy }: Props) => {
  const [copy, setCopy] = React.useState(false);

  const handleCopy = (text: string, result: boolean) => {
    setCopy(true);
    onCopy && typeof onCopy === "function" && onCopy(text, result);

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <IconButton disabled={!text} type="button">
        {copy ? (
          <CheckIcon className="w-7 h-7 text-green-700" />
        ) : (
          <ClipboardIcon className={`w-7 h-7 text-gray-600`} />
        )}
      </IconButton>
    </CopyToClipboard>
  );
};

export default CopyButton;
