import { Component, OnInit, ViewChild } from '@angular/core';
import TodoListService from '@services/todo-list.service';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import _ from 'lodash'

declare var $: any;
@Component({
  selector: 'app-permission-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.scss']
})
export default class toDoListComponent implements OnInit {

 on = {
   title: null,
 }

  res = {
    items:[]
  };

  list = {
    items:[]
  };

  constructor(private todoS: TodoListService) { }

  ngOnInit() {
    this.fetch()
  }

  fetch(){
    of(0).pipe(
      flatMap(this.fetchTodoList.bind(this)),
      tap(this.handleFetchTodoList.bind(this))
    ).subscribe();
  }

 onCreate(){
  this.todoS.update({title: this.on.title})
  .subscribe(res=>{
    this.fetch()
  })
  }

  onUpdate(each){
    if(!each.title || !each.item_id){
      return window.alert('Missing info. Can not update.')
    }this.todoS.update(_.pick(each, ['completed','item_id','title']))
    .subscribe(res=>{
      each.edit=false;
      this.fetch()
    })
  }

  onDelete(each){
    this.todoS.delete({id:each.item_id})
    .subscribe(res=>{
      this.fetch()
    });
  }

  onCompleted(each){
    if(each.completed || !each.item_id){
      return window.alert('Can not update.')
    }
    each.completed= 1;
    this.onUpdate(each);
  }

  fetchTodoList() {
    return this.todoS.getList();
  }

  handleFetchTodoList(response) {
    this.list.items = _.chain(response.data)
    .orderBy(['completed','updated_at'],['asc','desc'])
    .value();
  }

  
}

export { toDoListComponent };
