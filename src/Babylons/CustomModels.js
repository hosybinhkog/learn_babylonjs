import {
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  Vector3,
} from "@babylonjs/core";

export class CustomModelsScene {
  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = this.createScene();
    this.engine.runRenderLoop(() => this.scene.render());
  }

  createScene() {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemisphericLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemisphericLight.intensity = 0.5;

    return scene;
  }
}
