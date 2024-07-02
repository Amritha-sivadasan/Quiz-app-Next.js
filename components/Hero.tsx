"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { fetchUsers } from "@/app/(auth)/actions/fetchUsers";

const Hero = () => {
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchUsers();
        if (user.data.user) {
          setUserExist(true);
        } else {
          setUserExist(false);
        }
      } catch (error) {}
    };

    getUser()

  },[]);
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-dark">
            <TypeAnimation
              sequence={[
                "Ready to take this week's quiz?",
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
          {userExist &&  <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm duration-500 font-medium text-gray-50 shadow transition-colors hover:bg-primary/80"
          >
            I'm ready
          </Link> 

         }
     
        </div>
      </div>
    </section>
  );
};

export default Hero;
