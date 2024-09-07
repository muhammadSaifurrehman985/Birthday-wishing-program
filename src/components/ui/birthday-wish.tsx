"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";
import inquirer from "inquirer";
// import { PiConfetti } from 'react-icons/pi';
// import { FaK } from 'react-icons/fa6';
// import { Users } from 'lucide-react';
// import { div } from 'framer-motion/client';

type ConfettiProps = {
  width: number;
  height: number;
};

let DinamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });

let candleColor = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF"];
const balloonColors = ["#FFC0CB", "#FFA500", "#800080", "#87CEEB"];
const confettiColors = [
  "#FF4500",
  "#FFD700",
  "#32CD32",
  "#1E90FF",
  "#EE82E",
  "#FF8C00",
];

  const answer =  inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your name?',
    },
  ]);

export default function BirthdayWish() {
  let [candleLit, setCandleLit] = useState<number>(0);
  let [balloonCount, setBalloonCount] = useState<number>(0);
  let [showConfettiCount, setShowConfettiCount] = useState<boolean>(false);
  let [windowSize, setWindowSize] = useState<ConfettiProps>({
    width: 0,
    height: 0,
  });
  let [celebrating, setCelebrating] = useState<boolean>(false);

  let totalCandles: number = 6;
  let totalBalloons: number = 6;


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (candleLit === totalCandles && balloonCount === totalBalloons) {
      setShowConfettiCount(true);
    }
  }),
    [candleLit, balloonCount];

  const popBalloon = (index: number) => {
    if (index === balloonCount) {
      setBalloonCount((prev) => prev + 1);
    }
  };

  const lightCandle = (index: number) => {
    if (index === candleLit) {
      setCandleLit((prev) => prev + 1);
    }
  };

  let birthdayCelebrating = () => {
    setCelebrating(true);
    setShowConfettiCount(true);
    let interval = setInterval(() => {
      setCandleLit((previour) => {
        if (previour === totalCandles) {
          clearInterval(interval);
          return totalCandles;
        }
        return previour + 1;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 flex items-center justify-center p-4">
      {/* Animated wrapper for the card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-gray-800 bg-gray-800 rounded-lg">
          <CardHeader className="text-center pb-4 border-b border-gray-700">
            <CardTitle className="text-4xl font-bold text-white">
               Happy 19th Birthday, Buddy! 
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-300">
              Muhammad Saif ur Rehman
            </CardDescription>
            <p className="text-lg text-gray-500">on 29 December</p>
          </CardHeader>

          <CardContent className="space-y-6 text-center text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Light the candles:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candleLit) ||
                    (!celebrating && index < candleLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: celebrating ? index * 0.5 : 0,
                        }}
                      >
                        <FaBirthdayCake
                          className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                          style={{
                            color: candleColor[index % candleColor.length],
                          }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-8 h-8 text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Pop the balloons:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className="w-8 h-8 cursor-pointer hover:scale-110"
                      style={{
                        color:
                          index < balloonCount
                            ? "#4B5563"
                            : balloonColors[index % balloonColors.length],
                      }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>

          <div className="text-center text-green-400 font-semibold decoration-fuchsia-700">
            <h1>May you live many joyful years!</h1>
          </div>

          <CardFooter className="flex justify-center">
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 px-4 py-2 rounded-lg flex items-center"
              onClick={birthdayCelebrating}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>


      {showConfettiCount && (
        <DinamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  );
}
