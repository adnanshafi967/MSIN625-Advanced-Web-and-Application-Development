package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentController {

    private List<Student> students = new ArrayList<>();

    public StudentController(){
        students.addAll(
                List.of(
                        new Student("1","Adnan"),
                        new Student("2","Akash"),
                        new Student("3","Marina"),
                        new Student("4","Monika"),
                        new Student("5","Parves")
            )
        );
    }

    @GetMapping(value = "/students")
    public Iterable<Student> getStudents(){
        return students;
    }

    @GetMapping(value = "/students/{id}")
    public Student getStudent(@PathVariable String id){
        for (Student s:students){
            if(s.getId().equals(id)){
                return s;
            }
        }
        return null;
    }
    /*
    CRUD
    Create = Post
    Read = Get
    Update = Put
    Delete = Delete
     */

    @PostMapping("/add-student")
    public Student postStudent(@RequestBody Student student){
        students.add(student);
        return student;
    }

    @DeleteMapping("/delete-student/{id}")
    public void deleteStudent(@PathVariable String id){
        students.removeIf(student -> student.getId().equals(id));
    }

    @PutMapping("/modify-student/{id}")
    public Student putStudent(@PathVariable String id, @RequestBody Student student){
        int indexOfStudent = -1;
        for(Student s: students){
            if (s.getId().equals(id)){
                indexOfStudent = students.indexOf(s);
                students.set(indexOfStudent,student);
            }
        }

        if(indexOfStudent == -1){
            return postStudent(student);
        }

        return student;
    }

}
