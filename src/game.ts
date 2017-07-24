import {Body, Bodies, Engine, World} from 'matter-js';

import {
  // TODO Clean out unused.
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, DirectionalLight,
  Geometry, Line, LineBasicMaterial, Mesh, MeshBasicMaterial,
  MeshPhysicalMaterial, PerspectiveCamera, PlaneBufferGeometry, Scene,
  ShaderMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';

export class Game {

  constructor(canvas: HTMLCanvasElement) {
    // World.
    let engine = this.engine = Engine.create();
    let box1 = this.box1 = Bodies.rectangle(20, 20, 10, 10);
    let box2 = this.box2 = Bodies.rectangle(13, 40, 8, 8);
    let ground = Bodies.rectangle(0, -5, 1000, 10, {isStatic: true});
    World.add(engine.world, [box1, box2, ground]);
    console.log(engine.world.gravity);
    engine.world.gravity.y = -1;
    engine.world.gravity.scale = 1e-4;
    // View.
    this.canvas = canvas;
    let renderer = this.renderer = new WebGLRenderer({canvas});
    this.camera =
      new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.camera.rotation.order = 'ZXY';
    this.camera.position.set(10, 8, 0);
    this.camera.up.set(0, 0, -1);
    this.camera.lookAt(new Vector3());
    this.camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
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
    cube.position.set(box1.position.x, box1.position.y, 0).multiplyScalar(0.1);
    scene.add(cube);
    let box2Mesh = this.box2Mesh = new Mesh(
      new BoxGeometry(0.8, 0.8, 1), new MeshPhysicalMaterial({color:0xAA55AA}),
    );
    box2Mesh.position.set(
      box2.position.x, box2.position.y, 0,
    ).multiplyScalar(0.1);
    scene.add(box2Mesh);
    let floor = new Mesh(
      new BoxGeometry(100, 1, 1), new MeshPhysicalMaterial({color: 0x00FF88}),
    );
    floor.position.y = -0.5;
    scene.add(floor);
    // Input.
    window.addEventListener('keydown', event => this.onKey(event, true));
    window.addEventListener('keyup', event => this.onKey(event, false));
  }

  box1: Body;

  box2: Body;

  box2Mesh: Mesh;

  camera: PerspectiveCamera;

  canvas: HTMLCanvasElement;

  cube: Mesh;

  engine: Engine;

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
      this.renderer.setSize(window.innerWidth, 1);
      canvas.style.height = '100%';
    }, 10);
  }

  scene: Scene;

  start() {
    this.step();
  }

  step = () => {
    window.requestAnimationFrame(this.step);
    Engine.update(this.engine);
    this.cube.rotation.z = this.box1.angle;
    this.cube.position.set(
      this.box1.position.x, this.box1.position.y, 0,
    ).multiplyScalar(0.1);
    this.box2Mesh.rotation.z = this.box2.angle;
    this.box2Mesh.position.set(
      this.box2.position.x, this.box2.position.y, 0,
    ).multiplyScalar(0.1);
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
    // this.camera.position.x += speed * velocity.x;
    // this.camera.position.y += speed * velocity.y;
    this.camera.rotation.z += 0.02 * velocity.x;
    // this.camera.rotation.x = 0;
    // this.camera.rotation.y = 0;
    let direction = this.camera.getWorldDirection();
    move.set(direction.x, direction.y).multiplyScalar(speed * velocity.y);
    this.camera.position.x += move.x;
    this.camera.position.y += move.y;
    // if (velocity.x) {
    //   console.log(this.camera.getWorldDirection());
    // }
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

}

let move = new Vector2();
let velocity = new Vector2();
