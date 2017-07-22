import {
  // TODO Clean out unused.
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, DirectionalLight,
  Geometry, Line, LineBasicMaterial, Mesh, MeshBasicMaterial,
  MeshPhysicalMaterial, PerspectiveCamera, PlaneBufferGeometry, Scene,
  ShaderMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';

export class Game {

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    let renderer = this.renderer = new WebGLRenderer({canvas});
    this.camera =
      new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.camera.position.z = 5;
    renderer.setSize(canvas.width, canvas.height);
    let scene = this.scene = new Scene();
    let geo = new BoxGeometry(1, 1, 1);
    let material = new MeshBasicMaterial({color: 0x00ff00});
    let cube = this.cube = new Mesh(geo, material);
    scene.add(cube);
  }

  camera: PerspectiveCamera;

  canvas: HTMLCanvasElement;

  cube: Mesh;

  renderer: WebGLRenderer;

  scene: Scene;

  start() {
    this.step();
  }

  step = () => {
    window.requestAnimationFrame(this.step);
    this.cube.rotation.x += 0.05;
    this.renderer.render(this.scene, this.camera);
  }

}
