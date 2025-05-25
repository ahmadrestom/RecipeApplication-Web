import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three',
  imports: [],
  templateUrl: './three.component.html',
  styleUrl: './three.component.scss'
})
export class threeComponent implements OnInit, AfterViewInit {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  //private clock = new THREE.Clock();
  private leftWave!: THREE.Mesh;
  private rightWave!: THREE.Mesh;

  private scrollY = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollFraction = scrollY / (document.body.scrollHeight - window.innerHeight);

  this.distortWave(this.leftWave.geometry as THREE.PlaneGeometry, scrollFraction, -1);
  this.distortWave(this.rightWave.geometry as THREE.PlaneGeometry, scrollFraction, 1);

  this.renderer.render(this.scene, this.camera);
}

distortWave(geometry: THREE.PlaneGeometry, scrollFraction: number, direction: number) {
  const pos = geometry.attributes['position'];
  for (let i = 0; i < pos.count+1000; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const wave = Math.sin(y * 2 + scrollFraction * 10) * 0.3 * direction;
    pos.setZ(i, wave);
  }
  pos.needsUpdate = true;
}

  @ViewChild('threejsContainer', { static: true }) containerRef!: ElementRef;

  private updateObjectPositionByScroll() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = this.scrollY / maxScroll;
    this.cube.position.x = scrollFraction * 10;
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initScene();
    //this.animate()
  }

  createWavyMesh(color: number, flip = 1): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(2, 10, 50, 50); // tall, narrow, many segments
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = flip * (window.innerWidth / window.innerHeight) * 4; 
    mesh.rotation.y = flip * Math.PI / 8; // slight tilt

    return mesh;
  }

  private initScene(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 10);

    this.leftWave = this.createWavyMesh(0xffaaff, -1);
    this.rightWave = this.createWavyMesh(0xaaffff, 1);

    this.scene.add(this.leftWave, this.rightWave);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.containerRef.nativeElement.appendChild(this.renderer.domElement);
  }


  // private initScene(): void {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;

  //   this.scene = new THREE.Scene();
  //   this.scene.background = new THREE.Color(0xffffff);

  //   this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  //   this.camera.position.set(0, 0, 10);

  //   const geometry = new THREE.PlaneGeometry(3, 3);
  //   const texture = new THREE.TextureLoader().load('assets/icons/Pizza.png');
  //   const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  //   this.cube = new THREE.Mesh(geometry, material);
  //   this.scene.add(this.cube);

  //   this.renderer = new THREE.WebGLRenderer();
  //   this.renderer.setSize(width, height);
  //   this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  //   this.containerRef.nativeElement.appendChild(this.renderer.domElement);

  // }

  // private animate = () => {
  //   requestAnimationFrame(this.animate);

  //   const elapsed = this.clock.getElapsedTime();

  //   this.cube.position.x = Math.cos(elapsed);
  //   this.renderer.render(this.scene, this.camera)
  // }
}