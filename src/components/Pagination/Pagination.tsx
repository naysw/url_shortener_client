import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import IconButton from "../../nsw/ui/components/IconButton";

interface Props {
  onNext: () => void;
  onPre: () => void;
  count: number;
  hasPrePage?: boolean;
  hasNextPage?: boolean;
}

const Pagination = ({ onNext, onPre, hasNextPage, hasPrePage }: Props) => {
  return (
    <div className="flex space-x-4">
      <IconButton onClick={onPre} disabled={hasPrePage}>
        <ChevronLeftIcon className="w-6 h-6" />
      </IconButton>

      <IconButton onClick={onNext} disabled={!hasNextPage}>
        <ChevronRightIcon className="w-6 h-6" />
      </IconButton>
    </div>
  );
};

export default Pagination;
