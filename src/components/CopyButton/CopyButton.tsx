import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import IconButton from "../../nsw/ui/components/IconButton";

interface Props {
  text: string;
  onCopy?(text: string, result: boolean): void;
}

const CopyButton = ({ text, onCopy }: Props) => {
  const [copy, setCopy] = React.useState(false);

  /**
   * handle copy given text
   *
   * @param text string
   * @param result boolean
   * @retun void
   */
  const handleCopy = (text: string, result: boolean): void => {
    setCopy(true);
    onCopy && typeof onCopy === "function" && onCopy(text, result);

    toast.success("URL has been copied");

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
