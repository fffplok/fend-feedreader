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
    /* Test suite all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        // Test to make sure that the allFeeds variable has
        // been defined and that it is not empty.
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test that loops through each feed in the allFeeds object
        // and ensures it has a URL defined and that the URL is not empty.
        it('have appropriate URLs', function() {
            var urlsOk = true;

            allFeeds.forEach(function(feed) {
                if (!(typeof(feed.url) === 'string' && feed.url.length)) urlsOk = false;
            });

            expect(urlsOk).toBe(true);
        });


        // Test that loops through each feed in the allFeeds object and ensures
        // it has a name defined and that the name is not empty.
        it('have defined, non-empty names', function() {
            var namesOk = true;

            allFeeds.forEach(function(feed) {
                if (!(typeof(feed.name) === 'string' && feed.name.length)) namesOk = false;
            });

            expect(namesOk).toBe(true);
        });

    });


    /* Test suite named "The menu" */
    describe('The menu', function(){
        var $body = $('body'),
            $menuIcon = $body.find('.menu-icon-link'),
            $menu = $body.find('.menu');


        // make sure ui is restored after each test. initially, menu is hidden
        afterEach(function(){
            if (!$body.hasClass('menu-hidden')) $body.addClass('menu-hidden');
        });

        // Test that ensures the menu element is hidden by default.
        it('is hidden by default', function(){
            expect($body.hasClass('menu-hidden')).toBe(true);

            // verify that right position of menu is 0 or less
            // when shifted left, the menu is actually farther left than it's width
            expect($menu.offset().left + $menu.width() <= 0).toBe(true);
        });

        // Tests that ensure the menu changes visibility when the menu icon is clicked.
        // First test whether the menu displays when clicked.
        // Second, that it hides when clicked again.
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

    /* Test suite named "Initial Entries"
     * It has a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */

    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('are populated by at least one element', function(){
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });

    /* Test suite named "New Feed Selection"
     * It has a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    describe('New Feed Selection', function(){
        // compare the strings that contain feed titles and verify change
        var first, second;

        beforeEach(function(done){
            loadFeed(0, function() {
                first = $('.feed').find('h2').text();
                loadFeed(1, function() {
                    second = $('.feed').find('h2').text();
                    done();
                });
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
