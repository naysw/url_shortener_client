import Card from "../../nsw/ui/components/Card";
import CardContent from "../../nsw/ui/components/CardContent";
import CardHeader from "../../nsw/ui/components/CardHeader";

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <div className="w-10 h-10 animate-pulse ml-2 bg-gray-400 rounded-full"></div>
        }
        title={
          <div className="bg-gray-200 select-none text-transparent w-1/2 h-4 rounded animate-pulse">
            Title
          </div>
        }
        subheader={
          <div className="bg-gray-200 select-none text-transparent w-2/3 h-4 rounded animate-pulse">
            Title
          </div>
        }
      />

      <CardContent>
        <div className="bg-gray-200 select-none text-transparent w-1/4 h-3 mb-2 rounded animate-pulse">
          Title
        </div>
        <div className="bg-gray-200 select-none text-transparent w-full h-8 rounded animate-pulse">
          Title
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
