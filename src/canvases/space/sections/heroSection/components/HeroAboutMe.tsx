import { useLingui } from "@lingui/react/macro";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import useAnimateObjectVisibility from "@/canvases/hooks/useAnimateObjectVisibility";
import { heroAboutMeScrollProgress } from "@/canvases/space/components/CameraControls";

function HeroAboutMe() {
  const { t } = useLingui();

  const materialsToHideRefs = useRef<(THREE.Material | HTMLElement)[]>([]);
  useAnimateObjectVisibility(materialsToHideRefs, [
    heroAboutMeScrollProgress,
    heroAboutMeScrollProgress,
  ]);

  const aboutContent = (
    <>
      <span>
        {t`My name’s Saimands Roy, and I’m a 4th-year Computer Science Engineering student at Central University of Chhattisgarh, Bilaspur. I love building technology that actually does something useful — because a project that only works on localhost is basically a movie trailer with no movie.`}
        <span className="font-emoji text-foreground"> 😄</span>
      </span>
      <span>
        {t`My world revolves around software engineering, backend, and full-stack development. I enjoy turning ideas into scalable systems using Java, Spring Boot, REST APIs, and microservices, while using React and modern frontend technologies to give those systems a face. Lately, I’ve also been exploring Generative AI, AI agents, and Prompt Engineering — teaching machines to think a little smarter, behave a little better, and hopefully stop giving confidently wrong answers.`}
        <span className="font-emoji text-foreground"> 🤖</span>
      </span>
      <span>
        {t`I’m currently working as a Full Stack Engineer Intern at AI Sigma Labs, building real-world projects with React and Java/Spring Boot. Along the way, I’ve built products, led projects, and learned an important engineering truth: sometimes the bug isn’t in the code — it’s hiding three commits ago and laughing at you.`}
        <span className="font-emoji text-foreground"> 🐛</span>
      </span>
      <span>
        {t`I’m also sharpening my DSA and problem-solving skills, constantly experimenting with new technologies, and learning the best way I know: build it, break it, fix it, repeat.`}
        <span className="font-emoji text-foreground"> 🚀</span>
      </span>
      <span>
        {t`Outside the code editor, you’ll usually find me playing cricket, chess, or talking about ideas worth building. I’m here to build things that matter, learn relentlessly, and have a little fun while doing it. After all, every great developer needs a good story — and I’m still writing mine.`}
        <span className="font-emoji text-foreground"> 🎬✨</span>
      </span>
    </>
  );

  return (
    <group>
      {/* Title */}
      <Html className="select-none pointer-events-none px-3 sm:px-4" position={[1, 3, -16]}>
        <h1
          ref={(el) => {
            materialsToHideRefs.current.push(el as HTMLHeadingElement);
          }}
          className="opacity-0 text-gold-gradient text-3xl xs:text-4xl sm:text-6xl font-bold pb-3 sm:pb-4 max-w-[min(100vw-1.5rem,24rem)]"
        >
          {t`About me `}
          <span className="font-emoji text-foreground">👋</span>
        </h1>

        {/* Description */}
        <div
          ref={(el) => {
            materialsToHideRefs.current.push(el as HTMLDivElement);
          }}
          className="opacity-0 text-slate-200 text-sm xs:text-base sm:text-xl font-medium w-[min(100vw-1.5rem,18rem)] xs:w-[min(100vw-1.5rem,22rem)] sm:w-sm h-[75vh] overflow-hidden pointer-events-auto"
        >
          <div className="flex flex-col gap-3 sm:gap-4 leading-relaxed animate-auto-scroll-y">
            {aboutContent}
            {aboutContent}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default HeroAboutMe;
