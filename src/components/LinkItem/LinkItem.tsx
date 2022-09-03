import { UrlModel } from "../../types";
import CopyButton from "../CopyButton";

interface Props extends UrlModel {}

const LinkItem = ({ fullUrl, shortUrl }: Props) => {
  return (
    <div className="flex items-center hover:bg-blue-100 px-6 py-4 rounded">
      <div className="flex-1 text-gray-600 break-all">{fullUrl}</div>
      <div className="flex items-center">
        <a href={shortUrl} className="text-blue-600 break-all mr-2">
          {shortUrl}
        </a>

        <CopyButton text={shortUrl} />
      </div>
    </div>
  );
};

export default LinkItem;
