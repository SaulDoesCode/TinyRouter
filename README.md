# TinyRouter
Tiny Front End Router for use in any modern website


#### Quick Use

##### How Handle a URL hash   

  ``` javascript
    router.handle("#anyHashOrLink", () => {   
         // do something when that hash/link has been called   
    });   
  ```    
  
##### set the Document Title 

``` javascript
    router.setTitle("My Awesome Website Title");
```

##### Open a link 

``` javascript   
  // router.openLink( _link_ , _optional-boolean-for-newtab_);
  
  // Opens the link in the same window
  router.openLink("/awesome-link");
 
  // Opens the link in a new tab
  router.openLink("http://www.some-other-site.meh",true); // notice the second parameter is just true, this opens the link in a new tab 
  // 
```
##### Make an Element a click-able link

Some arbitrary HTML
``` html
  <button id="myfancybutton"> Fancy Link </button>
```
then in your JavaScript file 
``` javascript   
  // Any CSS selector will work 
  router.makeLink("#myfancybutton","www.fancylink.com"); // This will change the window location on click of the element
  
  // Make link open in new tab -  add in true as the second parameter 
  router.makeLink("#myfancybutton","www.fancylink.com" , true );
  
  // What if it should open on a different event type ? - add in a third parameter with the desired event type
  // any of the usual addEventListener types should work
  router.makeLink("#myfancybutton","www.fancylink.com" , true , "dblclick");

```

##### Set a View On an Element
Some Site HTML
``` html
  <main class="important-content">
    <!-- Some Content the user should see when the route changes -->
  </main>
```
 Your JavaScript  
``` javascript   
    var NewsView = `
      <div class="news-article">
        <h2> This Just In New Tiny Router Micro toolkit rocks the crowd </h2>
        <p> Lorem Ipsum ... </p>
      </div>
    `;
    
    router.handle("#news", () => {   
         // select the element to recieve the view with a CSS selector
         router.setView('.important-content',NewsView); // This will set the contents of the element to the NewsView variable
    }); 
  
```
