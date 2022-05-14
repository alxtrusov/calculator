import React from 'react';
import Canvas from '../../modules/canvas/Canvas';
import Canvas3D from './Canvas3D';
import Planets from './figures/Planets';
import Light from './entities/Light';
import Point from './entities/Point';

import cone from './figures/cone';
import cube from './figures/cube';
import cylinder from './figures/cylinder';
import ellipsoid from './figures/ellipsoid';
import ellipticalCylinder from './figures/ellipticalCylinder';
import ellipticalParaboloid from './figures/ellipticalParaboloid';
import hyperbolicCylinder from './figures/hyperbolicCylinder';
import hyperbolicParaboloid from './figures/hyperbolicParaboloid';
import oneSheetedHyperboloid from './figures/oneSheetedHyperboloid';
import parabolicCylinder from './figures/parabolicCylinder';
import sphera from './figures/sphera';
import surprise from './figures/surprise';
import tor from './figures/tor';
import twoSheetedHyperboloid from './figures/twoSheetedHyperboloid';

import './graph3D.css';

class Graph3D extends React.Component {
    constructor(props) {
        super(props);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, -50),
            DISPLAY: new Point(0, 0, -30),
            P1: new Point(-10, 10, -30), //левый верхний угол
            P2: new Point(-10, -10, -30), //левый нижний угол
            P3: new Point(10, -10, -30) //правый нижний угол
        };
    }

    componentDidMount() {
        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'canvas3D',
            width: 600,
            height: 600,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseMove: (event) => this.mouseMove(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown()
            }
        });

        this.graph3D = new Canvas3D({
            WIN: this.WIN
        });

        this.planets = new Planets();

        //флажки
        this.canMove = false;
        this.drawPoints = false;
        this.drawEdges = false;
        this.drawPolygons = true;
        this.animation = false;
        this.dark = false;
        this.light = false;

        //источник света
        this.LIGHT = new Light(-30, 30, 0, 25000);

        //переменные для порнографии (вывод нескольких фигур одновременно)
        this.R = 20;
        this.count = 3;
        this.dt = Math.PI * 2 / this.count;
        this.t = 0;
        this.k = 0;

        //массивы фигур и связанных анимаций
        this.figures = [];
        this.animations = [];

        //переменные для FPS
        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now(); 

        const animLoop = () => {
            //calc fps
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            //print scene
            this.graph3D.calcPlaneEquation(this.WIN.CAMERA, this.WIN.DISPLAY); //плоскость экрана
            this.graph3D.calcWinVectors(); //векторы экрана
            this.goAnimation(this.animations); //солнечная система
            this.run();
            window.requestAnimFrame(animLoop);
        }
        animLoop();
    }

    //действия пользователя
    /*_addEventListeners() {
        document.addEventListener('keydown', event => this.keyDownHandler(event));
        document.getElementById('drawPoints').addEventListener(
            'click',
            () => this.drawPoints = !this.drawPoints
        );
        document.getElementById('drawEdges').addEventListener(
            'click',
            () => this.drawEdges = !this.drawEdges
        );
        document.getElementById('drawPolygons').addEventListener(
            'click',
            () => this.drawPolygons = !this.drawPolygons
        );
        document.getElementById('animation').addEventListener(
            'click',
            () => this.animation = !this.animation
        );
        document.getElementById('dark').addEventListener(
            'click',
            () => this.dark = !this.dark
        );
        document.getElementById('light').addEventListener(
            'click',
            () => this.light = !this.light
        );
        document.getElementById('figures').addEventListener(
            'change',
            () => {
                let value = document.getElementById('figures').value;
                this.changeFigures(value);
            }
        );
        const powerLight = document.getElementById('powerlight');
        powerLight.addEventListener(
            'click',
            () => this.LIGHT.lumen = powerLight.value - 0
        );
        document.getElementById('color').addEventListener(
            'change',
            () => {
                const color = document.getElementById('color').value;
                for (let i = 0; i < this.figures.length; i++) {
                    this.figures[i].polygons.forEach(poly => {
                        poly.color = poly.hexToRgb(color);
                    });
                }
            });
        document.getElementById('delate').addEventListener(
            'click',
            () => this.figures.pop()
        );
    }

    //выбор фигуры
    changeFigures(value) {
        let f = 0;
        switch (value) {
            case "nothing":
                f = 1;
                break;
            case "cone":
                this.figures.push(new cone());
                break;
            case "cube":
                this.figures.push(new cube());
                break;
            case "twoSheetedHyperboloid":
                this.figures.push(twoSheetedHyperboloid());
                break;
            case "oneSheetedHyperboloid":
                this.figures.push(oneSheetedHyperboloid());
                break;
            case "ellipsoid":
                this.figures.push(ellipsoid());
                break;
            case "tor":
                this.figures.push(tor());
                break;
            case "sphera":
                this.figures.push(sphera());
                break;
            case "cylinder":
                this.figures.push(cylinder());
                break;
            case "parabolicCylinder":
                this.figures.push(parabolicCylinder());
                break;
            case "hyperbolicCylinder":
                this.figures.push(hyperbolicCylinder());
                break;
            case "hyperbolicParaboloid":
                this.figures.push(hyperbolicParaboloid());
                break;
            case "ellipticalCylinder":
                this.figures.push(ellipticalCylinder());
                break;
            case "ellipticalParaboloid":
                this.figures.push(ellipticalParaboloid());
                break;
            case "surprise":
                this.figures.push(surprise());
                break;
            case "solarSystem":
                this.figures = this.planets.figures;
                this.animations = this.planets.animations;
                break;
        }

        //порнография, но рабочая (вывод нескольких фигур одновременно)
        if (f === 0) {
            const matrix = this.graph3D.move(
                this.R * Math.cos(this.t),
                this.R * Math.sin(this.t),
                this.k
            );
            if (this.t < Math.PI * 2) {
                this.figures[this.figures.length - 1].points.forEach(point => {
                    this.graph3D.transform(matrix, point);
                });
                this.t += this.dt;
            }
            if (this.t >= Math.PI * 2) {
                this.t = 0;
                this.k += 80;
            }
        }
    }

    //перенос фигур и света
    keyDownHandler(event) {
        for (let i = 0; i < this.figures.length; i++) {
            switch (event.keyCode) {
                case 65: //a влево
                    return this.transformScene(this.graph3D.move(1, 0, 0));
                case 68: //d вправо
                    return this.transformScene(this.graph3D.move(-1, 0, 0));
                case 87: //w вверх
                    return this.transformScene(this.graph3D.move(0, -1, 0));
                case 83: //s вниз
                    return this.transformScene(this.graph3D.move(0, 1, 0));
                case 37: //влево
                    return this.moveLight(-1, 0, 0);
                case 39: //вправо
                    return this.moveLight(1, 0, 0);
                case 38: //вверх
                    return this.moveLight(0, 1, 0);
                case 40: //вниз
                    return this.moveLight(0, -1, 0);
            }
        }
    }*/

    //вынос общего из метода переноса света
    moveLight(dx, dy, dz) {
        if (this.light) {
            this.LIGHT = new Light(this.LIGHT.x + dx, this.LIGHT.y + dy, this.LIGHT.z + dz, 25000);
        }
    }

    //зум
    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? -0.3 : 0.3;
        this.transformScene(this.graph3D.move(
            this.WIN.CAMERA.x * delta,
            this.WIN.CAMERA.y * delta,
            this.WIN.CAMERA.z * delta
        ));
    }

    /*************************************вращения*************************************/
    mouseMove(event) {
        const gradus = Math.PI / 180 / 4; {
            const matrix = this.graph3D.rotateOx((this.dy - event.offsetY) * gradus);
            if (this.canMove) {
                if (this.light) {
                    this.LIGHT.x += (event.movementX);
                    this.LIGHT.y -= (event.movementY);
                } else this.transformScene(matrix);
            }
        }
        const matrix = this.graph3D.rotateOy((this.dx - event.offsetX) * gradus);
        if (this.canMove) {
            if (this.light) {
                this.LIGHT.x += (event.movementX);
                this.LIGHT.y -= (event.movementY);
            } else this.transformScene(matrix);
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    mouseUp() {
        this.canMove = false;
    }

    mouseDown() {
        this.canMove = true;
    }

    /**********************************************************************************/

    //изменение сцены
    transformScene(matrix) {
        this.graph3D.transform(matrix, this.WIN.CAMERA);
        this.graph3D.transform(matrix, this.WIN.DISPLAY);
        this.graph3D.transform(matrix, this.WIN.P1);
        this.graph3D.transform(matrix, this.WIN.P2);
        this.graph3D.transform(matrix, this.WIN.P3);
    }

    /**************анимация солнечной системы**************/
    figureAnimate(figure, parentMatrix = this.graph3D.one()) {
        const matrix = figure.animations.reduce(
            (S, animation) => {
                const { method, value } = animation;
                const center = animation.center || figure.center;
                const { x, y, z } = center;
                let resMatrix = this.graph3D.one();
                resMatrix = this.graph3D.animateMatrix(-x, -y, -z, method, value);
                return this.graph3D.multMatrixes(S, resMatrix);
            },
            parentMatrix
        );
        figure.points.forEach(point =>
            this.graph3D.transform(matrix, point)
        );
        this.graph3D.transform(matrix, figure.center);
        return figure.animations.reduce(
            (S, animation) => {
                const { method, value } = animation;
                const center = animation.center || figure.center;
                const { x, y, z } = center;
                let resMatrix = this.graph3D.one();
                if (animation.check) {
                    return S;
                }
                resMatrix = this.graph3D.animateMatrix(-x, -y, -z, method, value);
                return this.graph3D.multMatrixes(S, resMatrix);
            },
            parentMatrix
        );;
    }

    goAnimation(animations, parentMatrix) {
        if (this.animation) {
            animations.forEach(anim => {
                const matrix = this.figureAnimate(anim.root, parentMatrix)
                if (anim.nodes) {
                    this.goAnimation(anim.nodes, matrix);
                }
            });
        }
    }

    /******************************************************/

    run() {
        //очистка экрана
        this.canvas.clear();

        //вывод фона и текста для анимации солнечной системы
        /*if (this.animation) {
            this.canvas.drawImg(this.img, 0, 0, 600, 600);
            this.figures.forEach(figure => {
                figure.animations.forEach(animation => {
                    if (animation.text) {
                        this.canvas.textAnim(
                            figure,
                            `${animation.text}`,
                            this.graph3D.getProection(figure.points[0]),
                            this.graph3D.getProection(figure.points[0]),
                            'white',
                            'black'
                        );
                    }
                });
            });
        }*/

        /*
        //print polygons
        if (this.drawPolygons) {
            const polygons = [];
            this.figures.forEach((figure, index) => {
                this.graph3D.calcCenters(figure);
                this.graph3D.calcRadius(figure);
                this.graph3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
                this.graph3D.calcDistance(figure, this.LIGHT, 'lumen');
                figure.polygons.forEach(polygon => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            this.graph3D.sortByArtistAlgoritm(polygons);
            polygons.forEach(polygon => {
                if (polygon.visibility) {
                    const figure = this.figures[polygon.figureIndex];
                    const points = polygon.points.map(point => {
                        return {
                            x: this.graph3D.getProection(figure.points[point]).x,
                            y: this.graph3D.getProection(figure.points[point]).y
                        }
                    });
                    let { r, g, b } = polygon.color;
                    let lumen = polygon.lumen;
                    if (this.dark) {
                        const { isShadow, dark } = this.graph3D.calcShadow(polygon, this.figures, this.LIGHT);
                        lumen = this.graph3D.calcIllumination(
                            polygon.lumen,
                            this.LIGHT.lumen * (isShadow ? dark : 1)
                        );
                    } else {
                        lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                    }
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    this.canvas.polygon3D(points, polygon.rgbToHex(r, g, b));
                }
            });
        }

        //print edges
        if (this.drawEdges) {
            this.figures.forEach(figure => {
                figure.edges.forEach(edge => {
                    const point1 = this.graph3D.getProection(figure.points[edge.p1]);
                    const point2 = this.graph3D.getProection(figure.points[edge.p2]);
                    this.canvas.line3D(point1.x, point1.y, point2.x, point2.y)
                });
            });
        }

        //print points
        if (this.drawPoints) {
            this.figures.forEach(figure => {
                figure.points.forEach(point => {
                    this.canvas.arc3D(
                        this.graph3D.getProection(point).x,
                        this.graph3D.getProection(point).y,
                    );
                });
            });
        }

        //вывод источника света
        this.canvas.arc3D(
            this.graph3D.getProection(this.LIGHT).x,
            this.graph3D.getProection(this.LIGHT).y,
            10,
            '#ffffff'
        );
        this.canvas.arc3D(
            this.graph3D.getProection(this.LIGHT).x,
            this.graph3D.getProection(this.LIGHT).y,
            8,
            '#ffff63'
        );
        */

        //вывод FPS
        this.canvas.text(`FPS: ${this.FPS}`, -9.6, 9, '#50fc01');
    }

    render() {
        return (
            <div>
                <canvas className="canvas" id="canvas3D"></canvas>
                <div className="checkbox">
                    <input id="drawPoints" type="checkbox"></input><label> точки</label> 
                    <br></br><input id="drawEdges" type="checkbox"></input><label> ребра</label>
                    <br></br><input id="drawPolygons" type="checkbox"/><label> полигоны</label>
                    <br></br><input id="animation" type="checkbox"></input><label> анимация</label>
                    <br></br><input id="dark" type="checkbox"></input><label> тени</label>
                    <br></br><input id="light" type="checkbox"/><label> свет</label>   
                </div> 
                <div>
                    <select className="figures" id="figures">
                        <option value="nothing">фигуры</option>
                        <option value="cube">куб</option>
                        <option value="cone">конус</option>
                        <option value="cylinder">цилиндр</option>
                        <option value="sphera">сфера</option>
                        <option value="tor">тор</option>
                        <option value="ellipsoid">эллипсоид</option>
                        <option value="oneSheetedHyperboloid">однополостный гиперболоид</option>
                        <option value="twoSheetedHyperboloid">двухполостный гиперболоид</option>
                        <option value="hyperbolicParaboloid">гиперболический параболоид</option>
                        <option value="ellipticalParaboloid">эллиптический параболоид</option>
                        <option value="ellipticalCylinder">эллиптический цилиндр</option>
                        <option value="hyperbolicCylinder">гиперболический цилиндр</option>
                        <option value="parabolicCylinder">параболический цилиндр</option>
                        <option value="surprise">сюрприз :)</option>
                        <option value="solarSystem">солнечная система</option>
                    </select>
                </div>
                <div>
                    <button className="delate" id="delate">удалить</button>
                </div>
                <div>
                    <input 
                        className="powerlight" 
                        id="powerlight" 
                        type="range" 
                        min="25000" 
                        max="50000"
                    ></input>
                </div>
                <div>
                    <input className="color" id="color" type="color" placeholder="color"></input>
                </div>
            </div>
        );
    }
}

export default Graph3D;