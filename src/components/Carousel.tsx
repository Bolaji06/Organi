"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import hero from "./banner.webp";
import style from "./styles.module.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

import clsx from "clsx";

import { carouselHero } from "@/lib/carousel-data";
import { Button } from "./ui/button";
import Link from "next/link";

export type Image = {
  src: string;
};

type Carousel = {
  autoScroll: boolean;
  slides: Image[];
};

export function HeroCarousel({ autoScroll = false }) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  function next() {
    setCurrentSlide((curSlide) =>
      curSlide === carouselHero.length - 1 ? 0 : curSlide + 1
    );
  }
  function prev() {
    setCurrentSlide((curSlide) =>
      curSlide === 0 ? carouselHero.length - 1 : curSlide - 1
    );
  }

  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        <section
          className="w-full
                     relative"
        >
          <Image
            src={carouselHero[currentSlide].url}
            alt="Hero Ads"
            fill={true}
            className="object-cover transition-all ease-in-out duration-75"
          />

          <div
            className="flex items-center justify-between absolute w-full left-1/2 top-1/2
                         -translate-x-1/2"
          >
            <Button
              className="bg-[#7fad39]/30 w-10 p-0 h-10 bg-opacity-20 rounded-full ml-4 hover:bg-[#7fad39]
                            transition-all"
              onClick={prev}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              className="bg-[#7fad39]/30 w-10 p-0 h-10 bg-opacity-20 rounded-full mr-4 hover:bg-[#7fad39]
                            transition-all"
            >
              <ChevronRight onClick={next} />
            </Button>
          </div>

          <div
            className="flex gap-2 justify-center items-center absolute left-1/2
                         -translate-x-1/2 bottom-10"
          >
            {carouselHero.map((dot, index) => {
              return (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all bg-slate-600
                                    ${clsx({
                                      "bg-green-600 px-2":
                                        currentSlide === index,
                                    })}`}
                ></div>
              );
            })}
          </div>
        </section>
      }
    </>
  );
}

export function AdsCarousel({ autoScroll = false, slides }: Carousel) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function autoScrollSlide() {
    setCurrentSlide((curSlide) =>
      curSlide === slides.length - 1 ? 0 : curSlide + 1
    );
  }

  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(autoScrollSlide, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="w-full h-[200px] overflow-hidden
             transition-transform ease-out duration-500
             relative bg-cover bg-center"
      >
        {slides.map((slide, index) => {
          return (
            <Image
              key={index}
              className="object-cover"
              src={slides[currentSlide].src}
              fill={true}
              alt="Jelwery Ads Banner"
              
            />
          );
        })}
      </div>
    </>
  );
}
