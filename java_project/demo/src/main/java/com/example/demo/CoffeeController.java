package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.awt.geom.CubicCurve2D;
import java.util.*;
@RestController
public class CoffeeController {

    private List<Coffee> coffees = new ArrayList<>();

    public CoffeeController(){
        coffees.addAll(
                List.of(
                new Coffee("1","Light"),
                new Coffee("2","Medium"),
                new Coffee("3","Dark")
            )
        );
    }

    @GetMapping(value = "/coffees")
    public Iterable<Coffee> getCoffees(){
        return coffees;
    }

    @GetMapping(value = "/coffees/{id}")
    public Coffee getCoffee(@PathVariable String id){
        for (Coffee c:coffees){
            if(c.getId().equals(id)){
                return c;
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

    @PostMapping("/add-coffee")
    public Coffee postCoffee(@RequestBody Coffee coffee){
        coffees.add(coffee);
        return coffee;
    }

    @DeleteMapping("/delete-coffee/{id}")
    public void deleteCoffee(@PathVariable String id){
        coffees.removeIf(coffee -> coffee.getId().equals(id));
    }

    @PutMapping("/modify-coffee/{id}")
    public Coffee putCoffee(@PathVariable String id, @RequestBody Coffee coffee){
        int indexOfCoffee = -1;
        for(Coffee c: coffees){
            if (c.getId().equals(id)){
                indexOfCoffee = coffees.indexOf(c);
                coffees.set(indexOfCoffee,coffee);
            }
        }

        if(indexOfCoffee == -1){
            return postCoffee(coffee);
        }

        return coffee;
    }

}
