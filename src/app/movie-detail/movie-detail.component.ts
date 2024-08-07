import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  genre: string;
  year: string;
  status: string;
}

interface Comment {
  author: string;
  text: string;
  date: Date;
}

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movieId: string | null = null;
  movie: Movie | null = null;
  connectionStatus: string = 'Connected';
  isDarkMode: boolean = false;
  randomMovies: Movie[] = [];

  newComment: string = '';
  comments: Comment[] = [];

  movies: Movie[] = [
    { id: '1', title: 'Boku no Hero', posterUrl: '../../assets/anime/boku nohero.jpg', description: 'Un joven nacido sin poderes en un mundo donde los poderes son la norma, sueña con convertirse en el héroe más grande del mundo.', genre: 'Acción, Aventura', year: '2016', status: 'En emisión' },
    { id: '2', title: 'Una Voz Silenciosa', posterUrl: '../../assets/anime/unavozsilenciosa.jpg', description: 'Un chico problemático busca redención después de haber intimidado a una niña sorda en la escuela primaria.', genre: 'Drama, Romance', year: '2016', status: 'Finalizado' },
    { id: '3', title: 'Fullmetal Alchemist', posterUrl: '../../assets/anime/fullmetal.jpg', description: 'Dos hermanos alquimistas buscan la piedra filosofal para restaurar sus cuerpos después de un desastroso intento de resucitar a su madre.', genre: 'Acción, Aventura', year: '2003', status: 'Finalizado' },
    { id: '4', title: 'Hellsing', posterUrl: '../../assets/anime/hellsing.jpg', description: 'Una organización secreta lucha contra vampiros y otras criaturas sobrenaturales en la Inglaterra moderna.', genre: 'Acción, Horror', year: '2001', status: 'Finalizado' },
    { id: '5', title: 'Your Name', posterUrl: '../../assets/anime/yourname.jpg', description:'Dos adolescentes, un chico y una chica, descubren que pueden intercambiar cuerpos y trabajan juntos para evitar un desastre.', genre: 'Drama, Romance, Fantasía', year: '2016', status: 'Finalizado' },
    { id: '6', title: 'El Viaje de Chihiro', posterUrl:'../../assets/anime/elviajedechihiro.jpg', description:'Una niña pequeña se adentra en un mundo espiritual mientras busca la manera de salvar a sus padres transformados en cerdos.', genre: 'Aventura, Fantasía', year: '2001', status: 'Finalizado' },
    { id: '7', title: 'Akira', posterUrl: '../../assets/anime/akira.jpg', description: 'En un futuro post-apocalíptico, un joven motociclista desarrolla habilidades psíquicas y debe ser detenido antes de que destruya la ciudad.', genre: 'Acción, Ciencia Ficción', year: '1988', status: 'Finalizado' },
    { id: '8', title: 'La Princesa Mononoke', posterUrl: '../../assets/anime/laprincesamononoke.jpg', description: 'Un joven guerrero se ve atrapado en un conflicto entre los dioses del bosque y una colonia minera humana.', genre: 'Aventura, Fantasía', year: '1997', status: 'Finalizado' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.movie = this.movies.find(m => m.id === this.movieId) || null;
    }
    this.getRandomMovies();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('dark-mode');
  }

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
  }

  getRandomMovies(): void {
    const shuffled = this.movies.sort(() => 0.5 - Math.random());
    this.randomMovies = shuffled.slice(0, 4);
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push({
        author: 'Usuario', // Aquí podrías usar el nombre del usuario autenticado
        text: this.newComment,
        date: new Date()
      });
      this.newComment = ''; // Limpiar el campo de comentario
    }
  }

  cancelComment(): void {
    this.newComment = '';
  }
}