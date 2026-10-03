import gsap from "gsap";
import { useEffect } from "react";
import * as THREE from "three";

import { useScrollContext } from "@/contexts/ScrollContext";

function useJobExperienceListAsteroidsEntryAnimations({
  beniaminekAsteroidRef,
  escAsteroidRef,
  ruigrokAsteroidRef,
  aisigmaAsteroidRef,
  openmrsAsteroidRef,
}: {
  beniaminekAsteroidRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  escAsteroidRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  ruigrokAsteroidRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  aisigmaAsteroidRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  openmrsAsteroidRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
}) {
  const { scrollProgress } = useScrollContext();

  useEffect(() => {
    if (
      !beniaminekAsteroidRef.current ||
      !escAsteroidRef.current ||
      !ruigrokAsteroidRef.current ||
      !aisigmaAsteroidRef.current ||
      !openmrsAsteroidRef.current
    )
      return;

    // scrollProgress of 5 === Mars work experience list (scene #6)
    // Coords are now relative to the orbitGroup at [10, 0, -90]
    if (scrollProgress === 5) {
      gsap.to(beniaminekAsteroidRef.current.position, { ease: "sine.out", x: 6.5, y: 0, z: 0, duration: 3 });
      gsap.to(escAsteroidRef.current.position, { ease: "sine.out", x: 2.0, y: 2, z: 6.18, duration: 3 });
      gsap.to(ruigrokAsteroidRef.current.position, { ease: "sine.out", x: -5.26, y: -1, z: 3.82, duration: 3 });
      gsap.to(aisigmaAsteroidRef.current.position, { ease: "sine.out", x: -5.26, y: 2, z: -3.82, duration: 3 });
      gsap.to(openmrsAsteroidRef.current.position, { ease: "sine.out", x: 2.0, y: -1, z: -6.18, duration: 3 });
    } else {
      gsap.to(beniaminekAsteroidRef.current.position, { ease: "sine.in", x: 15, y: 0, z: 10, duration: 3 });
      gsap.to(escAsteroidRef.current.position, { ease: "sine.out", x: 0, y: 10, z: 10, duration: 3 });
      gsap.to(ruigrokAsteroidRef.current.position, { ease: "sine.out", x: -25, y: 0, z: 10, duration: 3 });
      gsap.to(aisigmaAsteroidRef.current.position, { ease: "sine.out", x: -15, y: 10, z: 10, duration: 3 });
      gsap.to(openmrsAsteroidRef.current.position, { ease: "sine.out", x: 5, y: -10, z: 10, duration: 3 });
    }
  }, [
    scrollProgress,
    beniaminekAsteroidRef,
    escAsteroidRef,
    ruigrokAsteroidRef,
    aisigmaAsteroidRef,
    openmrsAsteroidRef,
  ]);
}

export default useJobExperienceListAsteroidsEntryAnimations;
