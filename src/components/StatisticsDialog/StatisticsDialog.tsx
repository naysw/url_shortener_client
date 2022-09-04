import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLinkDetailsQuery } from "../../hooks/useLinkDetailsQuery";
import Dialog from "../../nsw/ui/components/Dialog";
import QueryStateHandler from "../QueryStateHandler";

interface Props {
  open: boolean;
  linkId: string;
  onClose: () => void;
}

const StatisticsDialog = ({ open, linkId, onClose }: Props) => {
  const { status, error, data } = useLinkDetailsQuery(linkId);

  console.log("StatisticsDialog Render");

  return (
    <Dialog
      open={open}
      fullWidth
      className="bg-primary-background"
      onClose={onClose}
      maxWidth="xl"
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute left-auto right-2 top-2 bg-black bg-opacity-20 transition-opacity duration-300 hover:bg-opacity-80 rounded-full z-30  p-2 text-center"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        <QueryStateHandler
          status={status}
          error={error}
          data={data}
          renderError={() => (
            <div className="p-6">Error Occured, Please try again</div>
          )}
          renderLoading={
            <div className="p-6">
              <p className="mb-2  w-1/2 text-transparent animate-pulse bg-gray-200 rounded-md">
                Skeleton: Title
              </p>

              <p className=" w-full h-3 text-transparent animate-pulse bg-gray-200 rounded-md mb-2">
                Skeleton: Description
              </p>
              <p className=" w-full h-3 text-transparent animate-pulse bg-gray-200 rounded-md">
                Skeleton: Description
              </p>
            </div>
          }
        >
          {() => <div>Hello</div>}
        </QueryStateHandler>
      </div>
    </Dialog>
  );
};

export default StatisticsDialog;
