import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export class SceneInstance {
  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = this.CreateCanvas();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateCanvas() {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 0.5;
    MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);

    const ball = MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 1,
      },
      this.scene
    );

    ball.position = new Vector3(0, 1, 0);
    return scene;
  }
}
