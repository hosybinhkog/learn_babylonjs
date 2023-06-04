import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";

export class StadardMaterials {
  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene() {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      "hemisphericLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 10,
        height: 10,
      },
      this.scene
    );
    ground.material = this.CreateGroundMaterials();

    const ball = MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 1,
      },
      this.scene
    );

    ball.position = new Vector3(0, 1, 0);
    ball.material = this.CreateBallMaterials();

    return scene;
  }

  CreateGroundMaterials() {
    const groundMat = new StandardMaterial("groundMat", this.scene);
    const uvScale = 4;
    const textArray = [];

    const diffuseTex = new Texture(
      "./textures/stone/stone_diffuse.jpg",
      this.scene
    );
    groundMat.diffuseTexture = diffuseTex;
    textArray.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/stone/stone_normal.jpg",
      this.scene
    );

    groundMat.bumpTexture = normalTex;
    textArray.push(normalTex);

    const aoText = new Texture("./textures/stone/stone_ao.jpg", this.scene);
    groundMat.ambientTexture = aoText;
    textArray.push(aoText);

    const specTex = new Texture("./textures/stone/stone_spec.jpg", this.scene);
    groundMat.specularTexture = specTex;

    textArray.push(specTex);

    textArray.forEach((text) => {
      text.uScale = uvScale;
      text.vScale = uvScale;
    });

    return groundMat;
  }
  CreateBallMaterials() {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    const uvScale = 1;
    const textArray = [];

    const diffuseTex = new Texture(
      "./textures/materials/metal_diffuse.jpg",
      this.scene
    );

    ballMat.diffuseColor = diffuseTex;
    textArray.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/materials/metal_normal.jpg",
      this.scene
    );

    ballMat.bumpTexture = normalTex;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    textArray.push(normalTex);

    const aoText = new Texture("./textures/materials/metal_ao.jpg", this.scene);
    ballMat.ambientTexture = aoText;
    textArray.push(aoText);

    const specTex = new Texture(
      "./textures/materials/metal_spec.jpg",
      this.scene
    );

    ballMat.specularTexture = specTex;
    ballMat.specularPower = 1;

    textArray.push(specTex);

    textArray.forEach((text) => {
      text.uScale = uvScale;
      text.vScale = uvScale;
    });

    return ballMat;
  }
}
