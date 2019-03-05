# Let It Brie

_Grace Shopper project for the Grace Hopper program at Fullstack Academy_

**Let It Brie** can be demoed at https://let-it-brie-1.herokuapp.com/

This e-commerce sight was designed following the requirements of the _Grace Shopper Project_ assigned by Grace Hopper/Fullstack

Team members: Bethany Walker, Ayema Chowdhury, Summer Deehan, and Connie Lim

## Features

Let it Brie allows the user to shop for charcuterie boards and other related products.

### User ###

#### All users ####

* Users will have access to a list of products that can then be filtered by type (meat, cheese, etc.), or by searching for keywords.

* Users can add items to their shopping cart. A user’s shopping cart will still be accessible to them even if they return to the sight at a later date.

* All users can check out. If a user is not logged in, they can still make a purchase, but they will be offered the chance to sign up before completing the order.

#### Signed up/in users ####

* Users can sign up/in with an email address and password or through their google account

* Users who are signed in can access and update their account information and view their order history

### Admin User ###

A user registered as admin has more abilities, and different pages available to them. Admin uses can:

  * Add or remove products (By adding a product with a new product type, the new filter option will be added to the filter bar)

  * Edit current products (price, name, etc.)

  * Admin users have access to a 'manage orders' page where they can manage customer orders

## Design

This app has responsive design. **Try it on your phone!**

## Technologies

`HTML`, `CSS`, `JavaScript`, `React`, `Redux`, `Express`, `Sequelize`, `OAuth` and `Stripe` were used to build this site. The app is available online through `Heroku`.

The boilerplate code for this project was provided by **Fullstack Academy of Code**.

## Implementation

* The **redux** store keeps track of:
  * users
  * orders
  * products
  * reviews

* **Local storage** is used to store `cart`, the customers current, unsubmitted order. This allows a user, even one who's not signed in, to be able to return to the site later without losing what they had already put in their cart.

* **OAuth** is used to allow users the option to login with Google

* **Stripe** is used to allow users to securely place their orders with a credit card.
