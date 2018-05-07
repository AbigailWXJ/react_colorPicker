# react_colorPicker
这是一个小小的项目，主要用来说明react这个框架中的单向数据流的一个特点;该项目主要是简单粗略的实现了一个粗糙的取色器，比较简单，可以帮助对react入门的一个理解。
# react的特点
react可以看成是MVC中的V层，即视图层;它不是一个完整的框架;主要用于创建可复用的web的Js库;
功能：全部以构建组件视图为核心，并提供类似的控制器的函数接口和生命周期函数;在react中无控制器，没有服务，没有指令。
* 1、组件
react的一切都是基于组件化的。使用react，唯一关心的就是构建组件。组件有着良好的封装性，组件让代码的复用，测试，分离都变的更加简洁;各个组件都有各自的状态，当状态变更时，便会重新渲染整个组件。
* 2、JSX
JSX语法：直接将HTML嵌套在JS中的写法这种语法结合了javascript和HTML的有点，既可以像平常一样适应HTML，也可以在里面嵌套javaScript语法
* 3、Virtual DOM
Virtual DOM是一种对于HTML DOM节点的抽象描述;可看成是一种用javaScript实现的结构，它不需要浏览器的DOM API支持，所以在Node.js中也可以使用。它和DOM的一大区别就是它采用了更高效的渲染方式，组件的DOM结构映射到Vitual DOM上，当需要重新渲染组件时，React在Virtual DOm上实现了一个DIff算法，通过这个算法寻找需要变更的节点，再把里面的修改更新到实际需要修改的DOM节点上，这样就避免了整个渲染DOM带来的巨大代价。
其实，virtual DOM不过就是DOM结构的javaScript对象描述;
## react与传统前端的比较
传统的前端开发在真实的业务中，存在两大缺陷：
* 1、每次数据变动都要整体重新渲染，性能非常差，尤其在数据变动频繁、界面复杂时;
* 2、每次渲染都要重新生成所有的DOM节点，那么在这些DOM节点上绑定的事件及外部持有的对这些DOM节点的引用都将失效。
react恰好解决了这两个缺点
* 1、React以额外的计算量（Diff算法）换取了对于更新点的自动定位，以框架本身复杂的代码实现换取了业务代码逻辑的清晰简单;
* 2、React对DOM事件进行了封装并提供了相应的接口。值得注意的是，React提供的事件绑定接口与其界面声明方式是一脉相承的，事件绑定表现为，值为毁掉函数的组件属性（props）。这样的好处是，绑定事件的过程自然地变成了界面渲染（render）的一部分，无需特别处理。
### Prop属性
prop属性是父组件传入给子组件的属性;也就是说props就是传给子组件的属性，由外部（父组件）的JSX传入，在子组件内部通过this.props来访问。
### state状态
state是组件内部的属性。组件本身是一个状态机，它可以在constructor中通过this.state直接定义它的值，然后根据这些值来渲染不同的UI。当state的值发生改变时，可以通过this.setState方法让组件再次调用render方法，来渲染新的UI。
在大多数情况下，不需要通过操作DOM的方式去更新UI，应该使用setState来重新渲染UI。但是，有些情况需要访问一些DOM结构（例如表单的值），那么可以采用refs这种方式来获取DOM节点，其具体做法就是在要应用的节点上面设置一个
ref属性，然后通过this.refs.name获得对应的DOM结构。
# 项目说明
该项目是单纯的一个react实践;
入口文件为：./app/index.js;
出口文件为：./dist/bundle.js;
编译指令：webpack
安装：npm install
两个组件：子组件Bar.js，父组件app.js;
对于父组件app.js;首先，在constructor函数里面，设置了自己的内部初始状态值state，以及改变染色值的方法setColor;通过render渲染UI，且引用了子组件Bar，由于引入了三次子组件Bar，为了避免代码的重复，使用了数组map的方法;父组件app给子组件Bar传入了value属性，color属性以及一个函数;传入函数的目的是，想让子组件改变的值传给父组件;因为reaxt是单向数据传递，只能是子组件向父组件传值，如果父组件想获得子组件的值，需要实现传递给子组件一个函数，用来获取子组件中的数据。
子组件中通过constructor函数接受传入的prop属性;该组件的change方法肩负者两个功能，一个是通过change事件改变子组件的视图，另外一个是给父组件传入的函数，传入改变后的状态值，使父组件的视图也能同时改变。
* 总的来说，这个小项目说明了一下三点：
1、各组件有自己各自的状态state;要想改变state的值，必须通过setState（）函数来改变;

2、父组件传入给子组件的值，需要通过props参数来传递;

3、严格意义上，子组件不能传值给父组件，如果非要传值，需要父组件给定一个函数，函数的参数就是父组件想从子组件获得的参数；子组件就通过传参数的形式将数据返给父组件，父组件接受实参改变父组件中的state值。

那么问题来了？如果要隔代传值（爷爷辈组件传给孙子辈组件）怎么办呢？

则需要用到context;上下文的精髓是可以跨级传输，爷爷组件直接跨级传给孙子组件。则需要在爷爷组件中设置一个getChildContext（）返回一个对象，这个对象就是现在这个家族体系共享的上下文。使得祖先元素中更改了上下文的数据时，所有的子孙元素中的数据都会改变，视图也会改变;但是反之不成立;即可认为上下文的数据在子孙元素中是只读的。但可以通过在context中共享一个操作祖先元素的函数，子孙元素通过上下文获得这个函数，从而操作祖先元素的值。