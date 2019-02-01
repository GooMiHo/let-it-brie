# Let It Brie

_Grace Shopper project for the Grace Hopper program at Fullstack Academy_

Grace Shopper can be demoed at https://let-it-brie-1.herokuapp.com/

This e-commerce sight was designed following the requirments for the _Grace Shopper Project_ assigned by Grace Hopper/Fullstack

Team members: Bethany Walker, Ayema Chowdhury, Summer Deehan, and Connie Lim

## Features

Let it Brie allows the user to shop for charcuterie boards and other related products.

Users will have access to a list of products that can then be filtered by:
* type (meat, cheese, etc.)
* ...
* ...
...

### Extras
...

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

* **Local storage** is used to store `book`, the most recently viewed book. If the user clicks on a hyperlink leaving the app site, the book info is stored. Upon hitting the back button, the data is retrieved from local storage and used to repopulate the page.

## Notes

..
