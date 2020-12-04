import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {

  filteredCourses: Course[] = [];

  _courses: Course[] = [];

  _filterBy: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.retirveAll();
  }

  retirveAll() {
    this.courseService.retriveAll().subscribe({
      next: courses => {
        this._courses = courses;
        this.filteredCourses = this._courses;
      }, error: err => { console.log('Error ', err); }
    });
  }

  deleteById(courseId: number) {
    this.courseService.deleteById(courseId).subscribe({
      next: () => {
        console.log('Deleted with success')
        this.retirveAll();
      }, error: err => console.log(err)
    })
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredCourses = this._courses.filter(element => element.name.toLocaleLowerCase().includes(this._filterBy.toLocaleLowerCase()));
  }

  get filter() {
    return this._filterBy;
  }
}
