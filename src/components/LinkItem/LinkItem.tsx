import { LinkModel } from "../../types";
import CopyButton from "../CopyButton";

interface Props extends LinkModel {}

const LinkItem = ({ fullUrl, shortUrl }: Props) => {
  return (
    <div className="flex items-center hover:bg-blue-50 px-6 py-4 rounded border hover:border-blue-300">
      <div className="flex-1 text-gray-600 break-all">{fullUrl}</div>
      <div className="flex items-center">
        <a
          href={shortUrl}
          className="text-blue-600 break-all mr-2 hover:underline"
        >
          {shortUrl}
        </a>

        <CopyButton text={shortUrl} />
      </div>
    </div>
  );
};

export default LinkItem;
