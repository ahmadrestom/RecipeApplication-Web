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
  private clock = new THREE.Clock();

  private scrollY = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY = window.scrollY || window.pageYOffset;
    this.updateObjectPositionByScroll();
    this.renderer.render(this.scene, this.camera);
  }

  @ViewChild('threejsContainer', { static: true }) containerRef!: ElementRef;

  private updateObjectPositionByScroll() {
    // Use this.scrollY to update your 3D object's position
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Normalize scroll from 0 to 1
    const scrollFraction = this.scrollY / maxScroll;

    // Example: move cube along x axis proportional to scroll fraction
    this.cube.position.x = scrollFraction * 10; // moves from 0 to 5 as you scroll
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initScene();
    //this.animate()
  }

  private initScene(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 10);

    const geometry = new THREE.PlaneGeometry(3, 3);
    const texture = new THREE.TextureLoader().load('assets/icons/Pizza.png');
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.containerRef.nativeElement.appendChild(this.renderer.domElement);

  }

  // private animate = () => {
  //   requestAnimationFrame(this.animate);

  //   const elapsed = this.clock.getElapsedTime();

  //   this.cube.position.x = Math.cos(elapsed);
  //   this.renderer.render(this.scene, this.camera)
  // }
}