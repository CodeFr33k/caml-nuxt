import * as util from './util';

it('eval javascript', () => {
    const fn = util.evalFn(`
       function(x) {
           return x === 1;
       }
   `);
    expect(fn(1)).toBeTruthy();

});

it('match URIs', () => {
    const uris = util.matchUris('hello file:///localhost/hello hello');
    expect(uris[0]).toBe('file:///localhost/hello');
});
