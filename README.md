## Udacity FEND Project 6: Feed Reader Testing with Jasmine

#### How to use this app:

Click the link below to view the app. You will see two parts to the screen. The upper part has the functionality of the app and the lower part displays the results of the tests. Tests are run when the page loads.

**The tests are:**

* A test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
* A test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
* A test that ensures the menu element is hidden by default.
* A test that ensures the menu changes visibility when the menu icon is clicked.
* A test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
* A test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.

**Try it out:** <a href="http://fffplok.github.io/fend-feedreader">Feed Reader Testing</a>

![alt text](https://raw.githubusercontent.com/fffplok/fend-feedreader/master/img/p6-capture.png "Feed Reader Test")
