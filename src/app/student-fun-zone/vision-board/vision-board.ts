import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vision-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vision-board.html',
  styleUrls: ['./vision-board.css']
})
export class VisionBoard implements AfterViewInit {
  @ViewChild('board', { static: false }) board!: ElementRef<HTMLDivElement>;

  colors = ["color1", "color2", "color3", "color4", "color5", "color6"];
  sampleImages = [
    '/assets/slike/slika1.png',
    '/assets/slike/slika2.png',
    '/assets/slike/slika3.png',
    '/assets/slike/slika4.png'
  ];
  sampleQuotes = [
    '“Svaka dovoljno napredna tehnologija jednaka je magiji.” – Arthur C. Clarke',
    '“Tehnologija je riječ koja opisuje nešto što još ne funkcionira.” - Douglas Adams',
    '“Ne osnivate zajednice. Zajednice već postoje. Pitanje je kako im možete pomoći da budu bolje.” – Mark Zuckerberg'
  ];

  private draggedElement: HTMLElement | null = null;
  private offset = { x: 0, y: 0 };

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.loadBoard();
  }

  addNote() {
    const note = this.renderer.createElement('div');
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    
    this.renderer.addClass(note, 'note');
    this.renderer.addClass(note, randomColor);
    this.renderer.setProperty(note, 'contentEditable', 'true');
    this.renderer.setProperty(note, 'textContent', 'Napomena...');
    this.renderer.setStyle(note, 'left', Math.random() * 300 + 'px');
    this.renderer.setStyle(note, 'top', Math.random() * 300 + 'px');

    const deleteBtn = this.renderer.createElement('button');
    this.renderer.addClass(deleteBtn, 'delete-btn');
    this.renderer.setProperty(deleteBtn, 'textContent', '✕');
    this.renderer.listen(deleteBtn, 'click', () => {
      this.renderer.removeChild(this.board.nativeElement, note);
      this.saveBoard();
    });

    this.renderer.appendChild(note, deleteBtn);
    this.renderer.appendChild(this.board.nativeElement, note);
    this.makeDraggable(note);
  }

  addImage() {
    const randomImage = this.sampleImages[Math.floor(Math.random() * this.sampleImages.length)];
    
    const imgContainer = this.renderer.createElement('div');
    this.renderer.addClass(imgContainer, 'pinned-img');
    this.renderer.setStyle(imgContainer, 'left', Math.random() * 300 + 'px');
    this.renderer.setStyle(imgContainer, 'top', Math.random() * 300 + 'px');

    const img = this.renderer.createElement('img');
    this.renderer.setProperty(img, 'src', randomImage);
    this.renderer.setProperty(img, 'alt', 'Slika na ploči');

    const deleteBtn = this.renderer.createElement('button');
    this.renderer.addClass(deleteBtn, 'delete-btn');
    this.renderer.setProperty(deleteBtn, 'textContent', '✕');
    this.renderer.listen(deleteBtn, 'click', () => {
      this.renderer.removeChild(this.board.nativeElement, imgContainer);
      this.saveBoard();
    });

    this.renderer.appendChild(imgContainer, img);
    this.renderer.appendChild(imgContainer, deleteBtn);
    this.renderer.appendChild(this.board.nativeElement, imgContainer);
    this.makeDraggable(imgContainer);
  }

  addQuote() {
    const randomQuote = this.sampleQuotes[Math.floor(Math.random() * this.sampleQuotes.length)];
    
    const quote = this.renderer.createElement('div');
    this.renderer.addClass(quote, 'quote');
    this.renderer.setProperty(quote, 'contentEditable', 'true');
    this.renderer.setProperty(quote, 'textContent', randomQuote);
    this.renderer.setStyle(quote, 'left', Math.random() * 300 + 'px');
    this.renderer.setStyle(quote, 'top', Math.random() * 300 + 'px');

    const deleteBtn = this.renderer.createElement('button');
    this.renderer.addClass(deleteBtn, 'delete-btn');
    this.renderer.setProperty(deleteBtn, 'textContent', '✕');
    this.renderer.listen(deleteBtn, 'click', () => {
      this.renderer.removeChild(this.board.nativeElement, quote);
      this.saveBoard();
    });

    this.renderer.appendChild(quote, deleteBtn);
    this.renderer.appendChild(this.board.nativeElement, quote);
    this.makeDraggable(quote);
  }

  makeDraggable(el: HTMLElement) {
    let isEditing = false;

    this.renderer.listen(el, 'mousedown', (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('delete-btn')) {
        return;
      }

      if (el.getAttribute('contenteditable') === 'true') {
        isEditing = true;
        return;
      }

      isEditing = false;
      this.draggedElement = el;
      const rect = el.getBoundingClientRect();
      const boardRect = this.board.nativeElement.getBoundingClientRect();
      
      this.offset.x = e.clientX - rect.left;
      this.offset.y = e.clientY - rect.top;

      e.preventDefault();
    });

    this.renderer.listen(document, 'mousemove', (e: MouseEvent) => {
      if (this.draggedElement === el && !isEditing) {
        const boardRect = this.board.nativeElement.getBoundingClientRect();
        let newX = e.clientX - boardRect.left - this.offset.x;
        let newY = e.clientY - boardRect.top - this.offset.y;

        newX = Math.max(0, Math.min(newX, boardRect.width - el.offsetWidth));
        newY = Math.max(0, Math.min(newY, boardRect.height - el.offsetHeight));

        this.renderer.setStyle(el, 'left', newX + 'px');
        this.renderer.setStyle(el, 'top', newY + 'px');
      }
    });

    this.renderer.listen(document, 'mouseup', () => {
      if (this.draggedElement === el) {
        this.draggedElement = null;
        this.saveBoard();
      }
    });

    this.renderer.listen(el, 'blur', () => {
      this.saveBoard();
    });
  }

  saveBoard() {
    const boardContent: any[] = [];
    const items = this.board.nativeElement.querySelectorAll('.note, .quote, .pinned-img');

    items.forEach((item: Element) => {
      const htmlItem = item as HTMLElement;
      const left = htmlItem.style.left;
      const top = htmlItem.style.top;
      
      if (htmlItem.classList.contains('note')) {
        const color = Array.from(htmlItem.classList).find(c => c.startsWith('color')) || 'color1';
        boardContent.push({
          type: 'note',
          text: htmlItem.textContent?.replace('✕', '').trim() || '',
          left,
          top,
          color
        });
      } else if (htmlItem.classList.contains('quote')) {
        boardContent.push({
          type: 'quote',
          text: htmlItem.textContent?.replace('✕', '').trim() || '',
          left,
          top
        });
      } else if (htmlItem.classList.contains('pinned-img')) {
        const img = htmlItem.querySelector('img') as HTMLImageElement;
        boardContent.push({
          type: 'image',
          src: img.src,
          left,
          top
        });
      }
    });

    localStorage.setItem('visionBoard', JSON.stringify(boardContent));
    alert('Ploča je sačuvana!');
  }

  loadBoard() {
    const saved = localStorage.getItem('visionBoard');
    if (saved) {
      const boardContent = JSON.parse(saved);
      
      boardContent.forEach((item: any) => {
        if (item.type === 'note') {
          const note = this.renderer.createElement('div');
          this.renderer.addClass(note, 'note');
          this.renderer.addClass(note, item.color);
          this.renderer.setProperty(note, 'contentEditable', 'true');
          this.renderer.setProperty(note, 'textContent', item.text);
          this.renderer.setStyle(note, 'left', item.left);
          this.renderer.setStyle(note, 'top', item.top);

          const deleteBtn = this.renderer.createElement('button');
          this.renderer.addClass(deleteBtn, 'delete-btn');
          this.renderer.setProperty(deleteBtn, 'textContent', '✕');
          this.renderer.listen(deleteBtn, 'click', () => {
            this.renderer.removeChild(this.board.nativeElement, note);
            this.saveBoard();
          });

          this.renderer.appendChild(note, deleteBtn);
          this.renderer.appendChild(this.board.nativeElement, note);
          this.makeDraggable(note);
        } else if (item.type === 'quote') {
          const quote = this.renderer.createElement('div');
          this.renderer.addClass(quote, 'quote');
          this.renderer.setProperty(quote, 'contentEditable', 'true');
          this.renderer.setProperty(quote, 'textContent', item.text);
          this.renderer.setStyle(quote, 'left', item.left);
          this.renderer.setStyle(quote, 'top', item.top);

          const deleteBtn = this.renderer.createElement('button');
          this.renderer.addClass(deleteBtn, 'delete-btn');
          this.renderer.setProperty(deleteBtn, 'textContent', '✕');
          this.renderer.listen(deleteBtn, 'click', () => {
            this.renderer.removeChild(this.board.nativeElement, quote);
            this.saveBoard();
          });

          this.renderer.appendChild(quote, deleteBtn);
          this.renderer.appendChild(this.board.nativeElement, quote);
          this.makeDraggable(quote);
        } else if (item.type === 'image') {
          const imgContainer = this.renderer.createElement('div');
          this.renderer.addClass(imgContainer, 'pinned-img');
          this.renderer.setStyle(imgContainer, 'left', item.left);
          this.renderer.setStyle(imgContainer, 'top', item.top);

          const img = this.renderer.createElement('img');
          this.renderer.setProperty(img, 'src', item.src);
          this.renderer.setProperty(img, 'alt', 'Slika na ploči');

          const deleteBtn = this.renderer.createElement('button');
          this.renderer.addClass(deleteBtn, 'delete-btn');
          this.renderer.setProperty(deleteBtn, 'textContent', '✕');
          this.renderer.listen(deleteBtn, 'click', () => {
            this.renderer.removeChild(this.board.nativeElement, imgContainer);
            this.saveBoard();
          });

          this.renderer.appendChild(imgContainer, img);
          this.renderer.appendChild(imgContainer, deleteBtn);
          this.renderer.appendChild(this.board.nativeElement, imgContainer);
          this.makeDraggable(imgContainer);
        }
      });
    }
  }

  clearBoard() {
    if (confirm('Ako očistiš ploču, svi elementi će biti izbrisani. Nastavi?')) {
      this.board.nativeElement.innerHTML = '';
      localStorage.removeItem('visionBoard');
      alert('Ploča je očišćena!');
    }
  }
}
