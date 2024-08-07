import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function NewTrack() {
  let mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/track22.glb"
  ).scene;

  return (
    <primitive object={mesh} rotation-y={Math.PI} position={[0, -0.09, 0]} />
  );
}
