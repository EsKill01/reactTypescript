import * as React from 'react';
import {renderToString} from 'react-dom/server';

declare module 'react'{
    interface Component{
        helloWorld(): string
    }
}

React.Component.prototype.hellowWorld = function() {
    return 'Hello world';
}

class MyComponent extends React.Component {
    render() {
        return <div>{this.helloWorld()}</div>;
    }
}

console.log(renderToString(<MyComponent />))