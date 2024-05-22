import { FishOff } from "lucide-react";
import { TailSpin } from "react-loading-icons";

type DataFetchStatusTypes = {
  type?: "loading" | "no_result" | "error" | "no_length";
  query?: string;
};

const DataFetchStatus = ({ type = "loading", query }: DataFetchStatusTypes) => {
  // Catch Error
  if (type !== "no_length" && query)
    throw new Error("The type should be no_length if there is a query value.");
  //////////////////////////////////////////////////////////////////////////////////////

  if (type === "no_result")
    return (
      <div className="text-muted-foreground text-center pt-4 pb-6">
        <span>No recent searches</span>
      </div>
    );

  if (type === "error")
    return (
      <div className="text-muted-foreground text-center pt-4 pb-6">
        <span>There is some error</span>
      </div>
    );

  if (type === "no_length")
    return (
      <div className="py-6 text-center text-muted-foreground">
        <div className="flex justify-center">
          <FishOff size={120} />
        </div>
        <span>No result found for '{query}'</span>
      </div>
    );

  return (
    <div className="flex justify-center py-4">
      <TailSpin speed={1} />
    </div>
  );
};

export default DataFetchStatus;
