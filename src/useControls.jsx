import { useEffect, useState, useCallback } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({});

  const keyDownPressHandler = useCallback((e) => {
    setControls((prevControls) => ({
      ...prevControls,
      [e.key.toLowerCase()]: true,
    }));
  }, []);

  const keyUpPressHandler = useCallback((e) => {
    setControls((prevControls) => ({
      ...prevControls,
      [e.key.toLowerCase()]: false,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);

    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, [keyDownPressHandler, keyUpPressHandler]);

  useEffect(() => {
    const { w, s, a, d, arrowdown, arrowup, arrowleft, arrowright, r } =
      controls;

    if (w) {
      vehicleApi.applyEngineForce(50, 2);
      vehicleApi.applyEngineForce(50, 3);
    } else if (s) {
      vehicleApi.applyEngineForce(-25, 2);
      vehicleApi.applyEngineForce(-25, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (arrowdown) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, 1]);
    if (arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (arrowleft) chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    if (arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [0.5, 0, 0]);

    if (r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
