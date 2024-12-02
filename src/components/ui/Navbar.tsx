"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Icon } from "@radix-ui/react-select";

import Text from "./Text";
import { NavbarData } from "../../db/index";
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {

  const showToast = () => {
    toast.info('Feature comming Soon.');
  };

  return (
    <div className="bg-dark lg:bg-light px-4 lg:px-16 py-4 flex items-center w-full md:space-x-3 lg:space-x-5 justify-between lg:justify-center transition-all duration-300 ease-in-out border-b-2 h-[10vh] border-semiLightGray">
      <a href={"/"} onClick={() => {}}>
        <Text
          fontSize="text-xl"
          fontWeight="font-normal"
          className={`text-light lg:text-dark py-[6px] pr-3 lg:pr-5 text-nowrap`}
        >
          Driving School
        </Text>
      </a>

      <div className="flex justify-between items-center w-fit md:w-full">
        <div className="md:flex items-center space-x-4 hidden w-full transition-all duration-300 ease-in-out py-2">
          {NavbarData.slice(0, -2).map((nav, index) => (
            <a
              href={nav.path}
              onClick={(e) => {
                e.preventDefault();
                showToast();
              }}
              key={index}
            >
              <Text
                fontSize="text-base"
                fontWeight="font-medium"
                className="text-light lg:text-dark"
              >
                {nav.name}
              </Text>
            </a>
          ))}

          <a
            href={"/"}
            onClick={(e) => {
              e.preventDefault();
              showToast();
            }}
            className="flex items-center space-x-2 group/about"
          >
            <Text
              fontSize="text-base"
              fontWeight="font-medium"
              className="text-light lg:text-dark"
            >
              About
            </Text>

            <Icon aria-hidden={false} className="">
              <ChevronDown className="h-4 w-4 opacity-50 text-light lg:text-dark transition-all duration-300 ease-in-out group-hover/about:rotate-180" />
            </Icon>
          </a>
        </div>

        <div className="flex items-center space-x-4 w-fit">
          <div className="md:flex items-center space-x-4 hidden transition-all duration-300 ease-in-out group/lang">
            {NavbarData.slice(-2).map((nav, index) => (
              <a
                href={nav.path}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  showToast();
                }}
                className="flex space-x-2 items-center"
              >
                {nav.image ? nav.image : <div />}

                <Text
                  fontSize="text-base"
                  fontWeight="font-medium"
                  className="text-light lg:text-dark"
                >
                  {nav.name}
                </Text>
              </a>
            ))}
          </div>

          <a
            href={"/"}
            onClick={(e) => e.preventDefault()}
            className="flex items-center space-x-2 group/user bg-lime-50 lg:bg-dark rounded-full px-3 py-2"
          >
            <Text
              fontSize="text-base"
              fontWeight="font-semibold"
              className="text-dark lg:text-light"
            >
              Vishal
            </Text>

            <Icon aria-hidden={false} className="">
              <ChevronDown className="h-4 w-4 opacity-50 text-dark lg:text-light transition-all duration-300 ease-in-out group-hover/user:rotate-180" />
            </Icon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
