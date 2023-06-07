import {
  Axis,
  Engine,
  Scene,
  SceneLoader,
  Space,
  TransformNode,
  WebXRFeatureName,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class SceneXRDemo {
  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = this.createScene();
  }

  async createScene() {
    const scene = new Scene(this.engine, {});
    scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: false,
    });

    const root = new TransformNode("root", scene);
    root.setEnabled();

    const model = await SceneLoader.ImportMeshAsync(
      "",
      "https://assets.babylonjs.com/meshes/vintageDeskFan/",
      "vintageFan_animated.gltf",
      this.scene
    );

    model.meshes[0].parent = root;
    model.meshes[0].scaling.scaleInPlace(0.05);
    model.meshes[0].rotate(Axis.Y, Math.PI, Space.LOCAL);

    const xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: "immersive-ar",
      },
    });
    const feature = xr.baseExperience.featuresManager;
    const imageTracking = feature.enableFeature(
      WebXRFeatureName.IMAGE_TRACKING,
      "latest",
      {
        images: [
          {
            src: "https://cdn.babylonjs.com/imageTracking.png",
            estimatedReadingWorldWidth: 0.2,
          },
        ],
      }
    );

    imageTracking.onTrackedImageUpdatedObservable.add((image) => {
      root.setPreTransformMatrix(image.transformationMatrix);
      root.setEnabled(true);
    });
    return scene;
  }
}
