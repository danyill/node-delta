(function(exports, resolver, tree) {
    exports['should report zero offset when value is on specified index, zero radius'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 0, 0);
        var result;

        result = r.resolveByContext(0, ['a'], ['a'], [], []);
        test.equals(result, 0);
        test.done();
    };

    exports['should report undefined if value is at the wrong place, radius is zero'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 0, 0);
        var result;

        result = r.resolveByContext(0, ['a'], ['b'], [], []);
        test.equals(result, undefined);
        test.done();
    };

    exports['should report zero offset when value is correct and context matches'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 0, 0);
        var result;

        result = r.resolveByContext(1, ['a', 'b', 'c'], ['b'], ['a'], ['c']);
        test.equals(result, 0);
        test.done();
    };

    exports['should report zero offset if half of the context nodes match, threshold zero'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 0, 0);
        var result;

        result = r.resolveByContext(1, ['a', 'b', 'c'], ['b'], ['a'], ['x']);
        test.equals(result, 0);

        result = r.resolveByContext(1, ['a', 'b', 'c'], ['b'], ['x'], ['c']);
        test.equals(result, 0);
        test.done();
    };

    exports['should report correct offset when value is found within radius'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 1, 0);
        var result;

        result = r.resolveByContext(0, ['x', 'a', 'x'], ['a'], [], []);
        test.equals(result, 1);

        result = r.resolveByContext(2, ['x', 'a', 'x'], ['a'], [], []);
        test.equals(result, -1);

        test.done();
    };

    exports['should report undefined when value is outside of radius'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 1, 0);
        var result;

        result = r.resolveByContext(0, ['x', 'x', 'a'], ['a'], [], []);
        test.equals(result, undefined);

        result = r.resolveByContext(2, ['a', 'x', 'x'], ['a'], [], []);
        test.equals(result, undefined);

        test.done();
    };

    exports['example 1'] = function(test) {
        var r = new resolver.UniformDepthResolver(null, 4, 0);
        var result, content, values, head, tail;

        content = 'xxyzx1234abc4321xxxx'.split('');
        values = 'abc'.split('');
        head = '1234'.split('');
        tail = '4321'.split('');

        result = r.resolveByContext(9, content, values, head, tail);
        test.equals(result, 0);

        result = r.resolveByContext(8, content, values, head, tail);
        test.equals(result, 1);

        result = r.resolveByContext(7, content, values, head, tail);
        test.equals(result, 2);

        result = r.resolveByContext(6, content, values, head, tail);
        test.equals(result, 3);

        result = r.resolveByContext(5, content, values, head, tail);
        test.equals(result, 4);

        // FIXME: should not match beyond here (radius = 4)
        result = r.resolveByContext(4, content, values, head, tail);
        test.equals(result, 5);

        result = r.resolveByContext(3, content, values, head, tail);
        test.equals(result, 6);

        result = r.resolveByContext(2, content, values, head, tail);
        test.equals(result, undefined);

        // Forward
        result = r.resolveByContext(10, content, values, head, tail);
        test.equals(result, -1);

        result = r.resolveByContext(11, content, values, head, tail);
        test.equals(result, -2);

        result = r.resolveByContext(12, content, values, head, tail);
        test.equals(result, -3);

        result = r.resolveByContext(13, content, values, head, tail);
        test.equals(result, -4);

        // should not match beyond here (radius = 4)
        result = r.resolveByContext(14, content, values, head, tail);
        test.equals(result, undefined);

        test.done();
    };
}(
    typeof exports === 'undefined' ? (DeltaJS.contextResolverTest={}) : exports,
    typeof require === 'undefined' ? DeltaJS.resolver : require('deltajs').resolver,
    typeof require === 'undefined' ? DeltaJS.tree : require('deltajs').tree
));