import { createCamera } from "./Components/camera.js";
import { createLights } from "./Components/lights.js";
import { createScene } from "./Components/scene.js";
import { createRenderer } from "./Systems/Renderer.js";
import { createTerrain } from "./Components/objects/terrain.js"
import { createControls } from "./Systems/Controls.js";
import { Loop } from "./Systems/Loop.js";
import { Resizer } from "./Systems/Resizer.js";
import { Color, GreaterStencilFunc } from "three";
 
// These variables are module-scoped: we cannot access them
// from outside the module.
let camera;
let renderer;
let scene;
let loop;
 
class World {
   constructor(container) {
     // Instances of camera, scene, and renderer
     camera = createCamera();
     scene = createScene("#FAEDCD");
     renderer = createRenderer();
     const randomVals = [];
 
     for (let i = 0; i < 12675; i++) {
       randomVals.push(Math.random() - 0.5);
     }
   
     // Terrain Instance
     let terrain = createTerrain({
       color: new Color("#FFACAC"),
       randVertexArr: randomVals,
     });

      // Initialize Loop
     loop = new Loop(camera, scene, renderer);
      container.append(renderer.domElement);
      // Light Instance, with optional light helper
     const { light, lightHelper } = createLights("white");
     let control = createControls(camera, container);
      loop.updatables.push(light);
      loop.updatables.push(terrain);
      loop.updatables.push(control);
      scene.add(light, terrain);
 
     const resizer = new Resizer(container, camera, renderer);
      resizer.onResize = () => {
      this.render();
     };
 
    }
    render() {
     // Draw a single frame
     renderer.render(scene, camera);
   }
    // Animation handlers
   start() {
     loop.start();
   }
    stop() {
     loop.stop();
   }
 }
  export { World };