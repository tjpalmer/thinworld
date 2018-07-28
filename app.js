webpackJsonp([0],{

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/game.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_matter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_matter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_matter_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__(1);


class Game {
    constructor(canvas) {
        this.keys = new Map();
        this.step = () => {
            window.requestAnimationFrame(this.step);
            __WEBPACK_IMPORTED_MODULE_0_matter_js__["Engine"].update(this.engine);
            this.cube.rotation.z = this.box1.angle;
            this.cube.position.set(this.box1.position.x, this.box1.position.y, 0).multiplyScalar(0.1);
            this.box2Mesh.rotation.z = this.box2.angle;
            this.box2Mesh.position.set(this.box2.position.x, this.box2.position.y, 0).multiplyScalar(0.1);
            velocity.set(0, 0);
            if (this.keys.get('ArrowUp')) {
                velocity.y = 1;
            }
            else if (this.keys.get('ArrowDown')) {
                velocity.y = -1;
            }
            if (this.keys.get('ArrowRight')) {
                velocity.x = 1;
            }
            else if (this.keys.get('ArrowLeft')) {
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
        };
        // World.
        let engine = this.engine = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Engine"].create();
        let box1 = this.box1 = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(20, 20, 10, 10);
        let box2 = this.box2 = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(13, 40, 8, 8);
        let ground = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(0, -5, 1000, 10, { isStatic: true });
        __WEBPACK_IMPORTED_MODULE_0_matter_js__["World"].add(engine.world, [box1, box2, ground]);
        console.log(engine.world.gravity);
        engine.world.gravity.y = -1;
        engine.world.gravity.scale = 1e-4;
        // View.
        this.canvas = canvas;
        let renderer = this.renderer = new __WEBPACK_IMPORTED_MODULE_1_three__["WebGLRenderer"]({ canvas });
        this.camera =
            new __WEBPACK_IMPORTED_MODULE_1_three__["PerspectiveCamera"](75, canvas.width / canvas.height, 0.1, 1000);
        this.camera.rotation.order = 'ZXY';
        this.camera.position.set(10, 8, 0);
        this.camera.up.set(0, 0, -1);
        this.camera.lookAt(new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"]());
        this.camera.updateProjectionMatrix();
        renderer.setSize(canvas.width, canvas.height);
        // Resize handling after renderer and camera.
        window.addEventListener('resize', () => this.resize());
        this.resize();
        // Scene.
        let scene = this.scene = new __WEBPACK_IMPORTED_MODULE_1_three__["Scene"]();
        // Some needful lighting.
        scene.add(new __WEBPACK_IMPORTED_MODULE_1_three__["AmbientLight"](0xFFFFFF));
        let light = new __WEBPACK_IMPORTED_MODULE_1_three__["DirectionalLight"](0xFFFFFF);
        light.position.set(-5, 5, 0);
        scene.add(light);
        scene.add(light.target);
        // Sample scene.
        let geo = new __WEBPACK_IMPORTED_MODULE_1_three__["BoxGeometry"](1, 1, 1);
        let material = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshPhysicalMaterial"]({ color: 0xFFBB33 });
        let cube = this.cube = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](geo, material);
        cube.position.set(box1.position.x, box1.position.y, 0).multiplyScalar(0.1);
        scene.add(cube);
        let box2Mesh = this.box2Mesh = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_1_three__["BoxGeometry"](0.8, 0.8, 1), new __WEBPACK_IMPORTED_MODULE_1_three__["MeshPhysicalMaterial"]({ color: 0xAA55AA }));
        box2Mesh.position.set(box2.position.x, box2.position.y, 0).multiplyScalar(0.1);
        scene.add(box2Mesh);
        let floor = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_1_three__["BoxGeometry"](100, 1, 1), new __WEBPACK_IMPORTED_MODULE_1_three__["MeshPhysicalMaterial"]({ color: 0x00FF88 }));
        floor.position.y = -0.5;
        scene.add(floor);
        // Input.
        window.addEventListener('keydown', event => this.onKey(event, true));
        window.addEventListener('keyup', event => this.onKey(event, false));
    }
    onKey(event, down) {
        this.keys.set(event.key, down);
    }
    resize() {
        this.renderer.setSize(1, 1);
        let canvas = this.renderer.domElement;
        window.setTimeout(() => {
            let canvas = this.renderer.domElement;
            this.renderer.setSize(window.innerWidth, 1);
            canvas.style.height = '100%';
        }, 10);
    }
    start() {
        this.step();
    }
}
let move = new __WEBPACK_IMPORTED_MODULE_1_three__["Vector2"]();
let velocity = new __WEBPACK_IMPORTED_MODULE_1_three__["Vector2"]();

// CONCATENATED MODULE: ./src/jsx.tsx
let React = {
    createElement(type, props, ...kids) {
        console.log('createElement', type, props, kids);
        if (typeof type == 'string') {
            let element = document.createElement(type);
            for (let key in props) {
                element.setAttribute(key, props[key]);
            }
            let strings = [];
            let appendText = () => {
                if (strings.length) {
                    element.appendChild(document.createTextNode(strings.join('')));
                    strings.length = 0;
                }
            };
            for (let kid of kids) {
                if (typeof kid == 'string') {
                    strings.push(kid);
                }
                else {
                    appendText();
                    element.appendChild(kid);
                }
            }
            appendText();
            return element;
        }
        else {
            return [type, props, kids];
        }
    }
};

// CONCATENATED MODULE: ./src/ui.tsx
function render(element, root) {
    if (element instanceof Element) {
        root.appendChild(element);
    }
}

// CONCATENATED MODULE: ./src/index.ts




// CONCATENATED MODULE: ./src/main.tsx

function init() {
    // console.log('Hi!');
    // let name = 'world';
    // let clazz = 'that<>""';
    // console.log(<Hi name={name}><Hello>Inside!</Hello> More</Hi>);
    // console.log();
    // let hi = new Hello();
    // hi.hi();
    render(React.createElement("canvas", { height: "1", id: "canvas", style: "left: 0; position: absolute; top: 0", width: "1" }), window.document.body);
    let game = new Game(window.document.getElementById('canvas'));
    game.start();
}
class Hello {
    constructor() {
        this.hi = () => console.log('Hi from', this);
    }
    render() {
        console.log('render!');
    }
}
class Hi extends Hello {
}
// const styles = {
//   title: {
//     color: '#ff4400',
//     fontSize: 48,
//     fontWeight: 'bold',
//   }
// };
window.addEventListener('load', init);


/***/ })

},[2]);