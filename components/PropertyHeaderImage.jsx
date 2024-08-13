import React from "react";
import Image from "next/image";

const PropertyHeaderImage = (image) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            src={image.image}
            className="object-cover h-[400px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
