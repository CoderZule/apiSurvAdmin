import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../assets/lottie/loading.json";

export default function Loading() {
    const defaultOptions = {
        loop: true,  
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie options={defaultOptions} height={50} width={50} />
        </div>
    );
}
