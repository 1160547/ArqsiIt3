import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Material } from './model/material';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private materialURL = 'https://arqsiprojetogoncalopaco.azurewebsites.net/api/material';
  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialURL)
      .pipe(
        tap(_ => this.log('fetched Materiais')),
        catchError(this.handleError('getMateriais', []))
      );
  }

  private log(message: string): void {
    console.log(message);
  }
 

  adicionarMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.materialURL, material, httpOptions).pipe(
      tap((material: Material) => alert(`Adicionado material!`)),
      catchError(this.handleError<Material>('adicionar material'))
    );
  }

  buscarMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialURL).pipe(
      tap(_ => this.log('Materiais carregados com sucesso')),
      catchError(this.handleError('buscar materiais', [])
      )
    );
  }

  buscarMaterialPorId(id: number): Observable<Material> {
    let url = this.materialURL + '/' + id;
    return this.http.get<Material>(url).pipe(
      tap(_ => this.log(`Material trazido com sucesso`)),
      catchError(this.handleError<Material>(`Erro ao buscar material `))
    )
  }

  eliminarMaterial(id: number): Observable<Material> {
    let url = this.materialURL + '/' + id;
    console.log(url);
    return this.http.delete<Material>(url, httpOptions).pipe(
      tap(_ => alert(`Apagado material `)),
      catchError(this.handleError<Material>('Apagar material'))
    );
  }

  atualizarMaterial(material: Material): Observable<any> {
    let url = this.materialURL + '/' + material.id;
    return this.http.put(url, material, httpOptions).pipe(
      tap(_ => alert(`Atualizado material`)),
      catchError(this.handleError<any>('atualizar material'))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
