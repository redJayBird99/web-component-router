# web-component-router
a client side router using the web component API

## Installation
TODO

## usage

### e-router
this tag constrains all the tags you want to route
```html
<e-router>
  <div slot="/home">...</div>
  <article slot="/next">...</article>
  <e-name slot="/home?q=cat">...</e-name>
  <div slot="/next#62hsd26lc">...</div>
  ...
</e-router>
 ```
 * the attribute **slot='/path/search/hash'** specifies the route for the contained tag
 * the location origin is always already included
 * the class of e-router tag is Router if you prefer to use it

 ### e-link
 this tag navigates to the given **href** attribute
 ```html
<e-router>
  <div slot="/home">
    ...
    <a is='e-link' href='/path'>go to path</a>
    <a is='e-link' href='htpps://exemple.com/next?=baz'>go to other path</a>
  </div>
 </e-router>
 ```
* e-link tag should be always located inside the e-router tag, it doesn't matter how much deep or if it's nested in multiple shadow doom
* the class of e-link tag is Link if you prefer to use it
