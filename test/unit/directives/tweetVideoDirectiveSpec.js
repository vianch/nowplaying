describe("Tweet video directive ", function() {
    var twitterVideoDirective,
        element,
        _scope;


    beforeEach(module("NowPlayingApp"));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        _scope = _$rootScope_.$new();

        _$templateCache_.put('templates/directives/tweet-video.html', '.<template-goes-here />');
        twitterVideoDirective = angular.element("<tweet-video></tweet-video>");

        element = _$compile_(twitterVideoDirective)(_scope);
        _scope.$digest();

    }));

    beforeEach(function(){

    });

    describe("Initialize data",function(){

        it("Should exist videoUrl when directive is called", function(){
            expect(element.isolateScope().videoUrl).not.tobeUndfined();
        });

    });

});