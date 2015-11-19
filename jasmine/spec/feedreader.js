/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have appropriate URLs', function() {
            var urlsOk = true;

            allFeeds.forEach(function(feed) {
                if (!(typeof(feed.url) === 'string' && feed.url.length)) urlsOk = false;
            });

            expect(urlsOk).toBe(true);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            var namesOk = true;

            allFeeds.forEach(function(feed) {
                if (!(typeof(feed.name) === 'string' && feed.name.length)) namesOk = false;
            });

            expect(namesOk).toBe(true);
        });

    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    describe('The menu', function(){
        var $body = $('body'),
            $menuIcon = $body.find('.menu-icon-link'),
            $menu = $body.find('.menu');


        // make sure ui is restored after each test. initially, menu is hidden
        afterEach(function(){
            if (!$body.hasClass('menu-hidden')) $body.addClass('menu-hidden');
        });

        it('is hidden by default', function(){
            expect($body.hasClass('menu-hidden')).toBe(true);

            // verify that right position of menu is 0 or less
            // when shifted left, the menu is actually farther left than it's width
            expect($menu.offset().left + $menu.width() <= 0).toBe(true);
        });

        it('is revealed when menu icon clicked (from hidden state)', function(done){
            // body will initially have menu-hidden class. so left position of menu should be negative
            // trigger click event on the menu icon, which should remove menu-hidden class from body.
            $menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBe(false);

            // the css indicates a transition lasting 0.2s to shift menu left the width of the menu.
            // use setTimeout to wait til done then verify left position of menu becomes 0
            setTimeout(function(){
                expect($menu.offset().left).toBe(0);
                done();
            }, 250);
        });

        it('is hidden when menu icon clicked (from revealed state)', function(done){
            // first ensure that body doesn't have the menu-hidden class.
            $body.removeClass('menu-hidden');

            // trigger click event on the menu icon, which should add menu-hidden class to body.
            $menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBe(true);

            // verify that right position of menu is now 0 or less
            setTimeout(function(){
                expect($menu.offset().left + $menu.width() <= 0).toBe(true);
                done();
            }, 250);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('are populated by at least one element', function(){
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe('New Feed Selection', function(){
        // compare the strings that contain feed titles and verify change
        var first, second;

        beforeEach(function(done){
            loadFeed(0, function() {
                first = $('.feed').find('h2').text();
            });

            loadFeed(1, function() {
                second = $('.feed').find('h2').text();
                done();
            });
        });

        // make sure ui is restored. initially, allFeeds[0] is loaded
        afterAll(function(){
            loadFeed(0);
        });

        it('changes from prior selected feed', function(){
            expect(first).not.toEqual(second);
        });
    });


}());
