import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plane1 from "../assets/plane1.png";

gsap.registerPlugin(ScrollTrigger);

export default function FlyingPlane() {
    const planeRef = useRef();
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        tl.to(planeRef.current, {
            x: -100,
            y: 80,
            rotate: 5,
            duration: 1,
        })
            .to(planeRef.current, {
                x: -180,
                y: 160,
                rotate: 10,
                duration: 1,
            })
            .to(planeRef.current, {
                x: -260,
                y: 250,
                rotate: 15,
                duration: 1,
            })
            .to(planeRef.current, {
                x: -340,
                y: 340,
                rotate: 8,
                duration: 1,
            })
            .to(planeRef.current, {
                x: -420,
                y: 430,
                rotate: 0,
                duration: 1,
            })
            .to(planeRef.current, {
                x: -500,
                y: 520,
                rotate: -8,
                duration: 1,
            })
            .to(planeRef.current, {
                x: -580,
                y: 610,
                rotate: -15,
                duration: 1,
            });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    return (
        <img
            ref={planeRef}
            src={plane1}
            className="plane1"
            alt="plane"
        />
    );
}