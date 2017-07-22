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
    canvas.style.width = '100%';
    // Resize handling after renderer and camera.
    window.addEventListener('resize', () => this.resize());
    this.resize();
    // Scene.
    let scene = this.scene = new Scene();
    // Some needful lighting.
    scene.add(new AmbientLight(0xFFFFFF));
    let light = new DirectionalLight(0xFFFFFF);
    light.position.set(0, 5, 5);
    scene.add(light);
    scene.add(light.target);
    // Sample scene.
    let geo = new BoxGeometry(1, 1, 1);
    let material = new MeshPhysicalMaterial({color: 0xFFBB33});
    let cube = this.cube = new Mesh(geo, material);
    scene.add(cube);
    let floor = new Mesh(
      new BoxGeometry(1, 1, 10), new MeshPhysicalMaterial({color: 0x00FF88}),
    );
    floor.position.y = -5;
    scene.add(floor);
    let ceiling = floor.clone();
    ceiling.position.y = 5;
    scene.add(ceiling);
  }

  camera: PerspectiveCamera;

  canvas: HTMLCanvasElement;

  cube: Mesh;

  renderer: WebGLRenderer;

  resize() {
    this.renderer.setSize(1, 1);
    let canvas = this.renderer.domElement;
    window.setTimeout(() => {
      let canvas = this.renderer.domElement;
      this.renderer.setSize(1, window.innerHeight);
      canvas.style.width = '100%';
    }, 10);
  }

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
