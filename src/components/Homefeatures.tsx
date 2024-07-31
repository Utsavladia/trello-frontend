import React from "react";
import Image from "next/image";

const Homefeatures = () => {
  return (
    <div className="grid grid-cols-3 mt-4 gap-2">
      <div className="bg-white items-center rounded-lg border p-4 flex gap-4">
        <div className="flex-shrink-0">
          <Image src={"/images/img1.png"} width={60} height={60} alt="image" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Introducing tags</h1>
          <p className="text-xs">
            Easily categorize and find your notes by adding tags. Keep your
            workspace clutter-free and efficient.
          </p>
        </div>
      </div>
      <div className="bg-white items-center rounded-lg border p-4 flex gap-4">
        <div className="flex-shrink-0">
          <Image src={"/images/img2.png"} width={60} height={60} alt="image" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Share Notes Instantly</h1>
          <p className="text-xs">
            Effortlessly share your notes with others via email or link. Enhance
            collaboration with quick sharing options.
          </p>
        </div>
      </div>
      <div className="bg-white items-center rounded-lg border p-4 flex gap-4">
        <div className="flex-shrink-0">
          <Image src={"/images/img3.png"} width={60} height={60} alt="image" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Access Anywhere</h1>
          <p className="text-xs">
            Sync your notes across all devices. Stay productive whether you're
            on your phone, tablet, or computer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homefeatures;
