import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class Quiz {
  result: string = '';

  // definicija odgovora
  answers: Record<string, string[]> = {
    q1: ['a'],
    q2: ['a', 'b', 'c'],
    q3: ['b'],
    q4: ['a', 'b', 'd'],
    q5: ['b']
  };

  // metoda koja prima NgForm
  checkAnswers(form: NgForm) {
    let score = 0;
    const total = 5;

    for (let i = 1; i <= total; i++) {
      const key = `q${i}`;
      const selected = form.value[key] || []; // ovo dobije checked vrijednosti

      // provjera niza odgovora
      const correct = this.answers[key] || [];
      if (
        Array.isArray(selected)
          ? selected.length === correct.length &&
            selected.every(val => correct.includes(val))
          : selected === correct[0] // za radio button
      ) {
        score++;
      }
    }

    this.result = `Osvojili ste ${score} od ${total} poena!`;
  }
}
