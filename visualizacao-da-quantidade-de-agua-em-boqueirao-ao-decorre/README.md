# Visualização da quantidade de água em Boqueirão ao decorrer dos anos

https://observablehq.com/@thaynnara007/visualizacao-da-quantidade-de-agua-em-boqueirao-ao-decorre@23

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
python -m SimpleHTTPServer
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/d/cf131c8b287dab25.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@thaynnara007/visualizacao-da-quantidade-de-agua-em-boqueirao-ao-decorre";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
