import { Float, Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

import useAnimateObjectVisibility from "@/canvases/hooks/useAnimateObjectVisibility";
import AsteroidsModel from "@/canvases/space/asteroids/components/AsteroidsModel";
import {
  jobExperienceDownloadResumeScrollProgress,
  jobExperienceListScrollProgress,
  jobExperienceTitleScrollProgress,
} from "@/canvases/space/components/CameraControls";
import JobExperienceItemDialog from "@/canvases/space/sections/jobExperienceSection/components/JobExperienceItemDialog";
import useJobExperienceListAsteroidsEntryAnimations from "@/canvases/space/sections/jobExperienceSection/hooks/useJobExperienceListAsteroidsEntryAnimations";
import useLoadJobExperienceListAsteroidsTextures from "@/canvases/space/sections/jobExperienceSection/hooks/useLoadJobExperienceListAsteroidsTextures";
import {
  JOB_EXPERIENCE_LIST,
  type JobExperienceItemDialogData,
} from "@/lib/constants";

function getContainedPlaneSize(
  texture: THREE.Texture,
  maxWidth: number,
  maxHeight: number
) {
  const image = texture.image as { width?: number; height?: number } | undefined;
  const imageWidth = image?.width ?? maxWidth;
  const imageHeight = image?.height ?? maxHeight;
  const aspectRatio = imageWidth / imageHeight;

  if (aspectRatio >= 1) {
    return [maxWidth, maxWidth / aspectRatio] as const;
  }

  return [maxHeight * aspectRatio, maxHeight] as const;
}

function JobExperienceListAsteroids() {
  const [beniaminekTexture, escTexture, ruigrokTexture, aisigmaTexture, openmrsTexture] =
    useLoadJobExperienceListAsteroidsTextures();
  const orbitGroupRef = useRef<THREE.Group>(null);
  const beniaminekAsteroidRef = useRef<THREE.Group>(null);
  const escAsteroidRef = useRef<THREE.Group>(null);
  const ruigrokAsteroidRef = useRef<THREE.Group>(null);
  const aisigmaAsteroidRef = useRef<THREE.Group>(null);
  const openmrsAsteroidRef = useRef<THREE.Group>(null);

  const [isOpenJobExperienceItemDialog, setIsOpenJobExperienceItemDialog] =
    useState(false);
  const [jobExperienceItemDialogData, setJobExperienceItemDialogData] =
    useState<JobExperienceItemDialogData>();

  function handlePointerEnterAsteroid() {
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeaveAsteroid() {
    document.body.style.cursor = "default";
  }

  function handleClickAsteroid(jobExperienceData: JobExperienceItemDialogData) {
    document.body.style.cursor = "default";

    setIsOpenJobExperienceItemDialog(true);
    setJobExperienceItemDialogData({ ...jobExperienceData });
  }

  useFrame((_, delta) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Animate position in and out of the asteroids
  useJobExperienceListAsteroidsEntryAnimations({
    beniaminekAsteroidRef,
    escAsteroidRef,
    ruigrokAsteroidRef,
    aisigmaAsteroidRef,
    openmrsAsteroidRef,
  });

  // Hide text when the current section viewed is not appriopriate for it to appear
  const materialsToHideRefs = useRef<(THREE.Material | HTMLElement)[]>([]);
  materialsToHideRefs.current.length = 0;
  
  const isRendered = useAnimateObjectVisibility(
    materialsToHideRefs,
    [jobExperienceListScrollProgress, jobExperienceListScrollProgress],
    [
      jobExperienceTitleScrollProgress,
      jobExperienceDownloadResumeScrollProgress,
    ],
  );
  if (!isRendered) return null;

  const [beniaminekPlaneWidth, beniaminekPlaneHeight] = getContainedPlaneSize(beniaminekTexture, 10, 10);
  const [escPlaneWidth, escPlaneHeight] = getContainedPlaneSize(escTexture, 10, 10);
  const [ruigrokPlaneWidth, ruigrokPlaneHeight] = getContainedPlaneSize(ruigrokTexture, 10, 10);
  const [aisigmaPlaneWidth, aisigmaPlaneHeight] = getContainedPlaneSize(aisigmaTexture, 10, 10);
  const [openmrsPlaneWidth, openmrsPlaneHeight] = getContainedPlaneSize(openmrsTexture, 10, 10);

  return (
    <>
      <JobExperienceItemDialog
        isOpen={isOpenJobExperienceItemDialog}
        setIsOpen={setIsOpenJobExperienceItemDialog}
        jobExperienceData={jobExperienceItemDialogData}
      />

      <group ref={orbitGroupRef} position={[10, 0, -90]}>
        {/* KS Beniaminek 03 */}
        <group
          ref={beniaminekAsteroidRef}
          onPointerEnter={handlePointerEnterAsteroid}
          onPointerLeave={handlePointerLeaveAsteroid}
          onClick={() => handleClickAsteroid(JOB_EXPERIENCE_LIST.beniaminek)}
          scale={0.14}
          position={[15, 0, 10]}
          rotation={[0.1, 2.1, 0]}
        >
          <AsteroidsModel animationSpeed={0.04} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[0.1, 0.5]}>
            <Billboard position={[0, 15, 0]}>
              <mesh>
                <meshBasicMaterial ref={(el) => materialsToHideRefs.current.push(el as THREE.Material)} map={beniaminekTexture} transparent toneMapped={false} />
                <planeGeometry args={[beniaminekPlaneWidth, beniaminekPlaneHeight]} />
              </mesh>
            </Billboard>
          </Float>
        </group>

        {/* ESC */}
        <group
          ref={escAsteroidRef}
          onPointerEnter={handlePointerEnterAsteroid}
          onPointerLeave={handlePointerLeaveAsteroid}
          onClick={() => handleClickAsteroid(JOB_EXPERIENCE_LIST.esc)}
          scale={0.12}
          position={[0, 10, 10]}
          rotation={[1, 3.5, -0.3]}
        >
          <AsteroidsModel animationSpeed={0.06} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[0.1, 0.5]}>
            <Billboard position={[0, 15, 0]}>
              <mesh>
                <meshBasicMaterial ref={(el) => materialsToHideRefs.current.push(el as THREE.Material)} map={escTexture} transparent toneMapped={false} />
                <planeGeometry args={[escPlaneWidth, escPlaneHeight]} />
              </mesh>
            </Billboard>
          </Float>
        </group>

        {/* ruigrok */}
        <group
          ref={ruigrokAsteroidRef}
          onPointerEnter={handlePointerEnterAsteroid}
          onPointerLeave={handlePointerLeaveAsteroid}
          onClick={() => handleClickAsteroid(JOB_EXPERIENCE_LIST.ruigrok)}
          scale={0.13}
          position={[-25, 0, 10]}
          rotation={[0.3, 3, 0.1]}
        >
          <AsteroidsModel animationSpeed={0.05} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[0.1, 0.5]}>
            <Billboard position={[0, 15, 0]}>
              <mesh>
                <meshBasicMaterial ref={(el) => materialsToHideRefs.current.push(el as THREE.Material)} map={ruigrokTexture} transparent toneMapped={false} />
                <planeGeometry args={[ruigrokPlaneWidth, ruigrokPlaneHeight]} />
              </mesh>
            </Billboard>
          </Float>
        </group>

        {/* AI Sigma */}
        <group
          ref={aisigmaAsteroidRef}
          onPointerEnter={handlePointerEnterAsteroid}
          onPointerLeave={handlePointerLeaveAsteroid}
          onClick={() => handleClickAsteroid(JOB_EXPERIENCE_LIST.aisigma)}
          scale={0.15}
          position={[-15, 10, 10]}
          rotation={[0.5, 1.5, -0.2]}
        >
          <AsteroidsModel animationSpeed={0.07} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[0.1, 0.5]}>
            <Billboard position={[0, 15, 0]}>
              <mesh>
                <meshBasicMaterial ref={(el) => materialsToHideRefs.current.push(el as THREE.Material)} map={aisigmaTexture} transparent toneMapped={false} />
                <planeGeometry args={[aisigmaPlaneWidth, aisigmaPlaneHeight]} />
              </mesh>
            </Billboard>
          </Float>
        </group>

        {/* OpenMRS */}
        <group
          ref={openmrsAsteroidRef}
          onPointerEnter={handlePointerEnterAsteroid}
          onPointerLeave={handlePointerLeaveAsteroid}
          onClick={() => handleClickAsteroid(JOB_EXPERIENCE_LIST.openmrs)}
          scale={0.11}
          position={[5, -10, 10]}
          rotation={[1.2, 2.5, 0.4]}
        >
          <AsteroidsModel animationSpeed={0.03} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[0.1, 0.5]}>
            <Billboard position={[0, 15, 0]}>
              <mesh>
                <meshBasicMaterial ref={(el) => materialsToHideRefs.current.push(el as THREE.Material)} map={openmrsTexture} transparent toneMapped={false} />
                <planeGeometry args={[openmrsPlaneWidth, openmrsPlaneHeight]} />
              </mesh>
            </Billboard>
          </Float>
        </group>
      </group>
    </>
  );
}

export default JobExperienceListAsteroids;
