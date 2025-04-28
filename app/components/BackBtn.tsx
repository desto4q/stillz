import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

export default function BackBtn() {
  let nav = useNavigate();
  return (
    <button
      className="btn btn-ghost btn-soft btn-xs md:btn-md md:text-lg"
      onClick={() => {
        nav(-1);
      }}
    >
      <ArrowLeftIcon /> Go back
    </button>
  );
}
