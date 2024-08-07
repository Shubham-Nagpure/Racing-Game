import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { NewTrack } from "./NewTrack";

export function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keyDownPressHandler(e) {
      if (e.key === "k") {
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() + 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }
    window.addEventListener("keydown", keyDownPressHandler);
    return () => window.removeEventListener("keydown", keyDownPressHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/texture/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Track />
      <Ground />
      <Car thirdPerson={thirdPerson} />
    </Suspense>
  );
}
