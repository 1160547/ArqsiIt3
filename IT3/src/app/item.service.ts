import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Item } from './model/item';
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private itensUrl = 'http://localhost:8562/item';  // URL to web api

constructor(private messageService: MessageService,
    private http: HttpClient) { }


  /** GET heroes from the server */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itensUrl)
      .pipe(
        tap(_ => this.log('fetched Items')),
        catchError(this.handleError('getItems', []))
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
    this.messageService.add(`produtoService: ${message}`);
  }

/** GET item by id. Return `undefined` when id not found */
getItemNo404<Data>(id: number): Observable<Item> {
  const url = `${this.itensUrl}/?id=${id}`;
  return this.http.get<Item[]>(url)
    .pipe(
      map(itens => itens[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} iten id=${id}`);
      }),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
}

/** GET item by id. Will 404 if id not found */
getItem(id: number): Observable<Item> {
  const url = `${this.itensUrl}/${id}`;
  return this.http.get<Item>(url).pipe(
    tap(_ => this.log(`fetched item id=${id}`)),
    catchError(this.handleError<Item>(`getItem id=${id}`))
  );
}

/** GET item by name. Will 404 if id not found */
getItemNome(nome: string): Observable<Item> {
  const url = `${this.itensUrl}/${nome}`;
  return this.http.get<Item>(url).pipe(
    tap(_ => this.log(`fetched item id=${nome}`)),
    catchError(this.handleError<Item>(`getItem nome=${nome}`))
  );
}

/* GET itens whose name contains search term */
searchItem(term: string): Observable<Item[]> {
  if (!term.trim()) {
    // if not search term, return empty item array.
    return of([]);
  }
  return this.http.get<Item[]>(`${this.itensUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found itens matching "${term}"`)),
    catchError(this.handleError<Item[]>('searchItens', []))
  );
}

//////// Save methods //////////

/** POST: add a new item to the server */
addItem (item: Item): Observable<Item> {
  return this.http.post<Item>(this.itensUrl, item, httpOptions).pipe(
    tap((itens: Item) => this.log(`added item w/ id=${item.id}`)),
    catchError(this.handleError<Item>('addItem'))
  );
}

/** DELETE: delete the item from the server */
deleteItem (item: Item | number): Observable<Item> {
  const id = typeof item === 'number' ? item : item.id;
  const url = `${this.itensUrl}/${id}`;

  return this.http.delete<Item>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted item id=${id}`)),
    catchError(this.handleError<Item>('deleteItem'))
  );
}

/** PUT: update the item on the server */
updateItem (item: Item): Observable<any> {
  return this.http.put(this.itensUrl, item, httpOptions).pipe(
    tap(_ => this.log(`updated item id=${item.id}`)),
    catchError(this.handleError<any>('updateItem'))
  );
}


}
