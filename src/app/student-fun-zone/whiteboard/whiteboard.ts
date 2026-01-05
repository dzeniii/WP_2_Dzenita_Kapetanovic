import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whiteboard.html',
  styleUrls: ['./whiteboard.css']
})
export class Whiteboard implements AfterViewInit {
  @ViewChild('board', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  color: string = '#000000';
  brushSize: number = 3;
  isErasing: boolean = false;

  private ctx!: CanvasRenderingContext2D;
  private drawing: boolean = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    canvas.addEventListener('mousedown', this.startDraw.bind(this));
    canvas.addEventListener('mouseup', this.endDraw.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));

    canvas.addEventListener('touchstart', this.startDraw.bind(this));
    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      this.draw(e);
      e.preventDefault();
    });
    canvas.addEventListener('touchend', this.endDraw.bind(this));
  }

  private getEventCoords(event: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent) {
      clientX = event.touches[0]?.clientX ?? 0;
      clientY = event.touches[0]?.clientY ?? 0;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  startDraw(event: MouseEvent | TouchEvent) {
    this.drawing = true;
    this.draw(event);
  }

  endDraw() {
    this.drawing = false;
    this.ctx.beginPath();
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.drawing) return;

    const { x, y } = this.getEventCoords(event);

    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.isErasing ? '#FFFFFF' : this.color;

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  toggleEraser() {
    this.isErasing = !this.isErasing;
  }

  clearBoard() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  saveBoard() {
    const canvas = this.canvasRef.nativeElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'moj_crtez.png';
    link.click();
  }
}
