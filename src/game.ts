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
    this.camera.position.x = -5;
    this.camera.lookAt(new Vector3());
    this.camera.updateProjectionMatrix();
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
    light.position.set(-5, 5, 0);
    scene.add(light);
    scene.add(light.target);
    // Sample scene.
    let geo = new BoxGeometry(1, 1, 1);
    let material = new MeshPhysicalMaterial({color: 0xFFBB33});
    let cube = this.cube = new Mesh(geo, material);
    scene.add(cube);
    let floor = new Mesh(
      new BoxGeometry(10, 1, 1), new MeshPhysicalMaterial({color: 0x00FF88}),
    );
    floor.position.y = -5;
    scene.add(floor);
    let ceiling = floor.clone();
    ceiling.position.y = 5;
    scene.add(ceiling);
    // Input.
    window.addEventListener('keydown', event => this.onKey(event, true));
    window.addEventListener('keyup', event => this.onKey(event, false));
  }

  camera: PerspectiveCamera;

  canvas: HTMLCanvasElement;

  cube: Mesh;

  onKey(event: KeyboardEvent, down: boolean) {
    this.keys.set(event.key, down);
  }

  keys = new Map<string, boolean>();

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
    this.cube.rotation.z += 0.05;
    velocity.set(0, 0);
    if (this.keys.get('ArrowUp')) {
      velocity.y = 1;
    } else if (this.keys.get('ArrowDown')) {
      velocity.y = -1;
    }
    if (this.keys.get('ArrowRight')) {
      velocity.x = 1;
    } else if (this.keys.get('ArrowLeft')) {
      velocity.x = -1;
    }
    let speed = 0.2;
    this.camera.position.x += speed * velocity.x;
    this.camera.position.y += speed * velocity.y;
    this.renderer.render(this.scene, this.camera);
  }

}

let velocity = new Vector2();
