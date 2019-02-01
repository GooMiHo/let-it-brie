# Let It Brie

_Grace Shopper project for the Grace Hopper program at Fullstack Academy_

**Let It Brie** can be demoed at https://let-it-brie-1.herokuapp.com/

This e-commerce sight was designed following the requirments for the _Grace Shopper Project_ assigned by Grace Hopper/Fullstack

Team members: Bethany Walker, Ayema Chowdhury, Summer Deehan, and Connie Lim

## Features

Let it Brie allows the user to shop for charcuterie boards and other related products.

### Standard User ###

* Users will have access to a list of products that can then be filtered by type (meat, cheese, etc.), or by searching for keywords. 
* Users 

### Admin User ###
 A user registerd as admin have more abilities, and diffenernt pages available to them. Admin uses can:
  * Add or remove products (By adding a product with a new product type, the new filter option will be added to the the filter bar)
  * Edit current products (price, name, etc.)
  * Admin has access to a 'manage orders' page where they can manage customer orders


## Design
This app has responsive design. **Try it on your phone!**

## Technologies

`HTML`, `CSS`, `React`, and `Redux` were used to build this site's front end. `Express` was use for the backend. The app is available online through `Heroku`.

The boilerplate code for this project was provided by **Fullstack Academy of Code**.


## Implementation

* The **redux** store keeps track of `books`, a full list of books found by title, and `book`, the most recently clicked book.

* The main **react** component also keeps track of a local state that includes `filterTopics` and `sortChoice`.

  * `filterTopics` keeps track of a list of all the chosen filters selected. It is used to:
    * filter the list of books
    * display a list of what filters were selected

  * `sortChoice` keeps track of which sort is turned on, if any. It determines how the list is sorted.

* **Local storage** is used to store `cart`, the customers current, unsubmitted order. This allows a user, even one whose not signed in,to be able to return to the site later without loosing what they had already put in their cart.
