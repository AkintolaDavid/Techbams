import React from "react";
import image from "./assets/image.jpg";
import BrowseCourse from "./BrowseCourse";
export default function AboutTechbams() {
  return (
    <>
      <div className="flex items-center justify-center bg-[#f8f8f8] px-4 sm:px-10">
        <div className="h-auto lg:h-[700px] w-[1000px] gap-5 md:gap-0 flex lg:flex-row flex-col justify-center items-center mx-2 sm:mx-10 md:mx-0">
          <div className="flex flex-col text-center lg:text-left w-[100%] md:w-[500px]  gap-6 pr-0 md:pr-10 lg:pr-20">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
              About Techbams
            </span>
            <span className="text-sm sm:text-base">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium.{" "}
            </span>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-400">
                  50<span className="text-3xl font-medium">M+</span>
                </span>
                <span className="text-[13px] sm:text-base font-normal">
                  STUDENTS LEARNING
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-400">
                  50<span className="text-3xl font-medium">M+</span>
                </span>
                <span className="text-[13px] sm:text-base font-normal">
                  STUDENTS LEARNING
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-400">
                  50<span className="text-3xl font-medium">M+</span>
                </span>
                <span className="text-[13px] sm:text-base font-normal">
                  STUDENTS LEARNING
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-blue-400">
                  50<span className="text-3xl font-medium">M+</span>
                </span>
                <span className="text-[13px] sm:text-base font-normal">
                  STUDENTS LEARNING
                </span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={image}
              at="img "
              className="h-[220px] md:h-[380px] w-[500px]"
            />
          </div>
        </div>
      </div>
      <BrowseCourse></BrowseCourse>
    </>
  );
}
