"use client";
import Link from "next/link";
import React, { useState } from "react";

import { TypeAnimation } from "react-type-animation";
const Hero = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      {" "}
      <div className="px-4 md:px-6  max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl  lg:text-7xl/none text-dark">
            <TypeAnimation
              sequence={[
                "  Ready to take this week's quiz ?",
                1000,

                () => {
                  console.log("Sequence completed");
                },
              ]}
            />
          </h1>

          <p className="text-gray-600">Get ready to ace it.</p>
        </div>
        <div className="mt-6">
          <Link
            href={"/quiz"}
            onClick={handleClick}
            className={`inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm duration-500 font-medium text-gray-50 shadow transition-colors hover:bg-primary/80 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                {/* Animated rocket emoji */}
                <span
                  role="img"
                  aria-label="Rocket Emoji"
                  style={{ fontSize: "24px" }}
                >
                  🚀
                </span>
                <span>Loading...</span>
              </div>
            ) : (
              "I'm ready"
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
