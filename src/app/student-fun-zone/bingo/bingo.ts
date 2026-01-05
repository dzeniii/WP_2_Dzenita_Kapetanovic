import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var html2pdf: any;

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.html',
  styleUrl: './bingo.css'
})
export class Bingo {
  generatePDF() {
    const element = document.getElementById('contentToConvert');
    const options = {
      margin: 1,
      filename: 'Bingo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  }
}
