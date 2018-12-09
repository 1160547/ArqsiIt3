import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Acabamento } from './model/acabamento';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AcabamentoService {

  private acabamentosUrl = 'https://arqsiprojetogoncalopaco.azurewebsites.net/api/acabamento';  // URL to web api

  constructor(private http: HttpClient,
    private messageService: MessageService) { }


  /** GET heroes from the server */
  getAcabamentos(): Observable<Acabamento[]> {
    return this.http.get<Acabamento[]>(this.acabamentosUrl)
      .pipe(
        tap(_ => this.log('fetched Acabamentos')),
        catchError(this.handleError('getAcabamentos', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getAcabamentoPorId(id: number): Observable<Acabamento> {
    const url = `${this.acabamentosUrl}/${id}`;
    return this.http.get<Acabamento>(url).pipe(
      tap(_ => this.log(`fetched acabamento `)),
      catchError(this.handleError<Acabamento>(`getAcabamento `))
    );
  }




  adicionarAcabamento(acabamento: Acabamento): Observable<Acabamento> {
    return this.http.post<Acabamento>(this.acabamentosUrl, acabamento, httpOptions).pipe(
      tap((acabamento: Acabamento) => alert(`Adicionado acabamento!`)),
      catchError(this.handleError<Acabamento>('adicionar acabamento'))
    );
  }



  atualizarAcabamento(acabamento: Acabamento): Observable<any> {
    let url = this.acabamentosUrl + '/' + acabamento.id;
    return this.http.put(url, acabamento, httpOptions).pipe(
      tap(_ => alert(`Atualizado acabamento `)),
      catchError(this.handleError<any>('atualizar acabamento'))
    );
  }

 
   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`acabamentoService: ${message}`);
  }
}
