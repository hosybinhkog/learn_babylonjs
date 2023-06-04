import {
  CubeTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
  Texture,
  PBRMaterial,
} from "@babylonjs/core";

export class PBR {
  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = this.CreateCanvas();
    this.engine.runRenderLoop(() => this.scene.render());
  }

  CreateCanvas() {
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

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex, true);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );

    // ground.material = this.createGroundMaterial();
    ground.material = this.createAsphalt();

    const ball = MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 1,
      },
      this.scene
    );

    ball.position = new Vector3(0, 1, 0);
    // ball.material = this.CreateBallMaterials();
    ball.material = this.createMagic();

    return scene;
  }

  createGroundMaterial() {
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

  createAsphalt() {
    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.roughness = 0.1;
    pbr.albedoTexture = new Texture(
      "./textures/asphalt/asphalt_diffuse.jpg",
      this.scene
    );

    pbr.bumpTexture = new Texture(
      "./textures/asphalt/asphalt_normal.jpg",
      this.scene
    );

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;

    pbr.metallicTexture = new Texture(
      "./textures/asphalt/asphalt_ao_rough_metal.jpg",
      this.scene
    );

    return pbr;
  }

  createMagic() {
    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.roughness = 0.2;
    return pbr;
  }
}
