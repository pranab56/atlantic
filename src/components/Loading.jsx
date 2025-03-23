import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    </div>
  );
};

export default Loading;
