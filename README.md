# Walert

Simple Notification jQuery plugin for easy use.
### Installation:
#### Dependencies:
- jQuery

Example:
```html
    <script src="jquery.min.js"></script>
    <script src="jquery.walert.js"></script>
    <script>
        var notification = new Walert({
            title:"Hello World!",//Sets the title
            body:"This is an example"//Defines the body (supports HTML tags)
        });
    </script>
```
#### Callbacks:
```javascript
        var notification = new Walert({
            title:"Hello World!",
            body:"This is an example",
            onClick:function(){//Event by clicking the notification
                console.log("Click!");
            },
            onHoverIn:function(){//Event when moving the cursor in the notification
                console.log("Hover In!");
            },
            onHoverOut:function(){//Event when leaving the cursor in the notification
                console.log("HoverOut!");
            },
            onClose:function(){//Event to close the notification
                console.log("Close!");
            },
            onOpen:function(){//Event to open the notification
                console.log("Open!");
            }
        });
```
#### Choose a icon!

```javascript
        var notification = new Walert({
            title:"Hello World!",
            body:"This is an example",
            time:5000,//Time to erase(in miliseconds)
            icon: "http://hfsvt.studentrad.no/wp-content/uploads/2015/08/Earth_Globe.png"//Sets a icon
        })
```

#### Take the property from the variable!
```javascript
        var notification = new Walert({
            title:"Hello World!",
            body:"This is an example",
            time:5000,
            icon: "http://hfsvt.studentrad.no/wp-content/uploads/2015/08/Earth_Globe.png"//Sets a icon
        })
        alert("Title:"+notification.title+);
        alert("Body:"+notification.body+);
```

## You can improve this code?
### Collaborate on GitHub!
