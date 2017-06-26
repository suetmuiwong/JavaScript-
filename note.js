一、面向对象编程
    值类型：number int float string boolean null undefined
    引用类型：arry object function
1、避免创建三个全局变量（函数）对环境造成污染，利用对象点语法可以指创建（使用）一个变量，使用函数原型可以减少创建时重新函数的次数。
  这是一个可以看做类的函数
    var checkObject = function(){};
    checkObject.prototype = function(){
        checkName:function(){
            return this;
        },
        checkEmail:function(){
            return this
        },
        checkPassword:function(){
            return this
        }
    }
    var use = new checkObject();
    use.checkName()
    use.checkEmail()
    use.checkPassword()

2、面向对象编程（类）：将需求抽象成一个对象，然后针对这个对象分析其特征（属性）与动作（方法）。
   面向对象编程思想的特点是封装。
（1）封装（类的变量名首字母大写，使用this，类的原型）
    私有属性/私有方法、公有属性公有方法、特权方法、构造器
    prototype：每个对象有有一个原型，原型也是一个对象（拥有属性和方法），通过对象.prototype查找或使用
    constructor：构造器，构造实例函数（拥有类的所有属性和方法）

A：非闭包实现
    var Book = function(id,name,price){
        //私有属性
        var num = 1;
        //私有方法
        function checkId(){};
        //公有属性
        this.id = id;
        //公有方法
        this.copy = function(){};
        //特权方法
        this.getName = function(){};
        this.getPrice = function(){};
        this.setName = function(){};
        this.setPrice = function(){};
        //构造器
        this.setName(name);
        this.setPrice(price);
    }

    //类静态公有属性（对象不能访问）
    Book.isChinese = false;
    //类静态公有方法（对象不能访问）
    Book.resetTime = function(){};

    类原型公有属性和方法（对象可以访问）
    Book.prototype={
        isJSBook = false;
        display = function(){};
    }


B：闭包实现
    var Book =(function(){
      //静态私有变量
      var bookNum = 0;
      //静态私有方法
      function checkBookName (name){}
      //创建类
      function book(newId,newName,newPrice){
          //私有变量
          var name,price;
          //私有方法
          function checkId(id){};
          //公有属性
          this.id = newId;
          //公有方法
          this.copy = function(){};
          bookNum ++
          if(bookNum>100)
              throw new Error('我们仅出版100本书');
          //特权方法
          this.getName = function(){};
          this.getPrice = function(){};
          this.setName = function(){};
          this.setPrice = function(){};
          //构造器
          this.setName(name);
          this.setPrice(price);
      }
      //创建原型
      _book.prototype = {
          //静态公有属性
          isJSBook : false;
          //静态公有方法
          display : function(){};
      }
      //返回类
      return _book
    })()

(2)继承
A：类式继承
  原理：声明两个类，将父类的实例赋值给子类的原型==
  （不够完美，如果父类的公用属性是引用类型，子类型会更改父类的公有属性）

    //声明父类
    function SuperClass(){
        this.superValue = true;
    }
    //为父类添加公有方法
    SuperClass.prototype.getSuperValue = function(){
        return this.superValue;
    };
    //声明子类
    function SubClass(){
        this.subValuw = false;
    }
    //继承父类
    SubClass.prototype = new SuperClass();
    //为子类添加公有方法
    SubClass.prototype.getSubValue = function(){
        return this.subValue;
    };

B:构造函数继承
  原理：在子类构造函数作用环境中执行一次父类的构造函数==
  （不够完美，没有使用到原型，父类的原型没有被子类继承，如果想要被子类继承则要放在构造函数里面，但不能共用，违反了代码复用原则）

  构造函数与普通函数的区别
    1.命名规则：构造函数以大写字母开头，普通函数小驼峰式命名法；
    2.调用方式：构造函数使用new操作符调用（new fn()），普通函数直接调用（fn()）
    3.内部机制差异：构造函数内部会创建一个新的对象（实例）、this指向实例、默认返回实例；普通函数不创建实例、this默认指向调用函数的对象（如果没有就指向window）、返回值由return语句决定
    4.构造函数的返回值：默认返回值为实例；手动添加返回值（return语句）  1.返回值是基本数据类型-->真正的返回值还是那个新创建的对象（实例）2.返回值是复杂数据类型（对象）-->真正的返回值是这个对象

    //声明父类
    function SuperClass(id){
        //引用类型的公有属性
        this.books = ['a','b','c'];
        //值类型公有属性
        this.id = id;
    }
    //父类声明原型方法
    SuperClass.prototype.showBooks = function(){
        console.log(this.books);
    }
    //声明子类
    function SubClass(id){
        SuperClass.call(this,id);
        //更改函数的作用环境，将子类的变量在父类中执行一次
    }
    //创建第一个子类的实例
    var instance1 = new SubClass(10);
    //创建第二个子类的实例
    var instance1 = new SubClass(11);
    instance1.books.push('设计模式')


C：组合继承(类式继承与构造函数继承)
  （不够完美，执行了两次父类函数，子类构造函数执行了一次，原型也执行了一次）
    //声明父类
    function SuperClass(name){
        //值类型公有属性
        this.name = name;
        //引用类型公有属性
        this.books = ['a','b','c'];
    }
    //父类原型公有方法
    SuperClass.prototype.getName = function(){};
    //声明子类
    function SubClass(name,time){
        //构造函数式父类name属性
        SuperClass.call(this,name);
        this.time = time;
    }
    //类式继承 子类原型继承父类
    SubClass.prototype = new SuperClass();
    //子类原型方法
    SubClass.prototype.getTime = function(){};

D:原型式继承

  //声明父类
    function inheritObject(o) {
        //声明一个过渡函数对象
        function F() {
        }

        //过渡对象的原型继承父对象
        F.prototype = o;
        //返回一个过渡对象的实例，该实例的原型继承了父对象
        return new F();
    }

    var book = {
        name: "js books",
        alikeBook: ["css book", "html book"]
    }

    var newBook = inheritObject(book);
    newBook.name = "as book";
    newBook.alikeBook.push("php book");

    var otherBook = inheritObject(book);
    otherBook.name = "java book";
    otherBook.alikeBook.push("xml book");

    console.log(book.name);//js book
    console.log(book.alikeBook);//["css book", "html book", "php book", "xml book"]
    console.log(otherBook.name);//java book
    console.log(otherBook.alikeBook);//["css book", "html book", "php book", "xml book"]
    console.log(newBook.name);//as book
    console.log(newBook.alikeBook);//["css book", "html book", "php book", "xml book"]

E:寄生式继承（原型式继承二次封装）

    //声明父类
    function inheritObject(o) {
        //声明一个过渡函数对象
        function F() {
        }

        //过渡对象的原型继承父对象
        F.prototype = o;
        //返回一个过渡对象的实例，该实例的原型继承了父对象
        return new F();
    }

    var book = {
        name: "js books",
        alikeBook: ["css book", "html book"]
    }

    function createBook(obj) {
        //通过原型继承方式创建新对象
        var o = new inheritObject(obj);
        //扩展新对象
        o.getName = function () {
            console.log(this);
        };
        //返回扩展后的新对象
        return o;
    }

F:寄生组合式继承（寄生式继承和构造函数继承）

  //声明父类
    function inheritObject(o) {
        //声明一个过渡函数对象
        function F() {
        }

        //过渡对象的原型继承父对象
        F.prototype = o;
        //返回一个过渡对象的实例，该实例的原型继承了父对象
        return new F();
    }

    function inheritPrototype(subClass, superClass) {
        //复制一份父类的原型保存在变量中
        var p = inheritObject(superClass.prototype);
        //修正因为重写子类导致子类的constructor属性被修改
        p.constructor = subClass;
        //设置子类的原型
        subClass.prototype = p;
    }
    //定义父类
    function SuperClass(name) {
        this.name = name;
        this.colors = ["red", "pink", "blue"];
    }

    //定义父类原型方法
    SuperClass.prototype.getName = function () {
        console.log(this.name);
    }

    //定义子类
    function SubClass(name, time) {
        //构造函数式继承
        SuperClass.call(this, name);
        this.time = time;
    }

    //寄生式继承父亲原型
    inheritPrototype(SubClass, SuperClass);

    //子类新增原型方法
    SubClass.prototype.getTime = function () {
        console.log(this.time);
    }

    var instance1 = new SubClass('js books', 2013);
    var instance2 = new SubClass('as books', 2015);

    instance1.colors.push('black');
    console.log(instance1.colors);//["red", "pink", "blue", "black"]
    console.log(instance2.colors);//["red", "pink", "blue"]
    instance2.getTime();//2015
    instance2.getName();//as books

G：多继承（需要传人目标对象——第一个参数需要继承的对象）

    //单继承 属性复制
    var extend = function(target,source){
        //遍历源对象中的属性
        for(var property in source){
            //将源对象中的属性复制到目标对象中
            target[property] = source[property];
        }
        //返回目标对象
        return target;
    }
    //多继承 属性复制
    var mix = function(){
        var i = 1,len = arguments.length,arg;
        //遍历被继承的对象
        for(i;i<len;i++){
            //缓存当前对象
            arg = arguments[i];
            //遍历被继承对象中的属性
            for(var property in arg){
                //将被继承对象中的属性复制到目标对象中
                target[property] = arg [property];
            }
        }
        //返回目标对象
        return target
    }
    //绑定在原生对象Object上,所有对象都拥有这个方法，可以直接使用.mix调用
    Object.prototype.mix =function(){
        var arg;
        for(var i =0; i<arguments.length;i++){
            //缓存当前对象
            arg = arguments[i];
            //遍历被继承对象中的属性
            for(var property in arg){
                //将被继承对象中的属性复制到目标对象中
                this[property] = arg[property];
            }
        }
    }

    fn.mix(book1,book2);

H:多态（同一个方法多种调用方式）
    function Add(){
        //无参数算法
        function zero(){
            return 10;
        }
        //一个参数算法
        function one(num){
            return 10+num;
        }
        //两个参数算法
        function two(num1,num2){
            return num1 +num2;
        }
        //编写一个公用方法
        this.add = function(){
            var arg = arguments;
            //获参数长度
            len = arg.length;
            switch(len){
                //如果没有参数
               case 0 :
                    return zero();
               //如果只有一个参数
               case 1;
                    return one(arg[0]);
               //如果有两个参数
               case 2:
               return two(arg[0],arg[1]);
                }
            }
        }

    //实例化类
    var A = new Add();
    console.log(A.add());
    console.log(A.add(5));
    console.log(A.add(6,7));


二、创建型设计模式
    工厂模式主要为了创建对象实例或者类簇，关心的是结果不是过程
    1.简单工厂模式（由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象）
    //通过类实例化对象创建
    //篮球基类
    var Basketall = function(){
        this.intro ='篮球盛行于美国';
    }
    Basketall.prototype = {
        getMember :function(){
            console.log('每个队伍需要5名队员');
        },
        getBallSize:function(){
            console.log('篮球很大');
        }
    }
    //足球基类
    var Football = function(){
        this.intro ='足球在世界范围内很流行';
    }
    Football.prototype = {
        getMember :function(){
            console.log('每个队伍需要11名队员');
        },
        getBallSize:function(){
            console.log('足球很大');
        }
    }

    //网球基类
    var Tennis = function(){
        this.intro ='每年有很多网球系列赛';
    }
    Tennis.prototype = {
        getMember :function(){
            console.log('每个队伍需要1名队员');
        },
        getBallSize:function(){
            console.log('网球很小');
        }
    }
    //运动工厂类
    var SportsFactory = function(name){
        switch(name){
            case 'NBA':
                return new Basketall();
            case 'WordCup':
                return new Football();
            case 'FrenchOpen':
                return new Tennis();
        }
    }

    //使用
    var footnall = new SportsFactory('NBA');
    console.log(footnall);
    footnall.getMember();

    //使用一个对象替换多个类（创建一个新对象包装其属性与功能）
    //相同部分提取，不同部分针对性处理（将不同的属性使用参数传递处理）
    function createPop(type,text){
        //创建一个对象，并对对象拓展属性和方法
        var o = new Object();
        o.content = text;
        //相同部分
        o.show = function(){
            //显示方法
        };
        if(type == 'alert'){
            //警示框差异部分
        }
        if(type == 'prompt'){
            //提示框差异部分
        }
        if(type == 'confirm'){
            //确认框差异部分
        }

        //将对象返回
        return o;
    }

    //创建警示框
    var userNameAlert = createPop('alert','用户名只能是26个字母和数字');
    console.log(userNameAlert);
    userNameAlert.show();

2.工厂方法模式（实质是定义一个创建对象的接口，但是让实现这个接口的类来决定实例化哪个类。工厂方法让类的实例化推迟到子类中进行]

    //工厂方法模式
    function extend(sup, sub) {
            var F = function() {
            };
            F.prototype = sup.prototype;
            sub.prototype = new F();
            sub.sub = sub.prototype;

            if(sub.prototype.constructor == sup.prototype.constructor) {
              sub.prototype.constructor = sub;
            }
          }
    // 这也是原继承
          function supFun() {
          }
          supFun.prototype = {
            constructor : supFun,
            sellBike : function() {
              this.createBike();
            },
            createBike : function() {
              throw new Error("supFun");
            }
          }
          function MacBike() {
          }
          extend(supFun, MacBike);
          MacBike.prototype.createBike = function() {
            alert("要出新的自行车了");
          }
          var macFn = new MacBike();
          macFn.sellBike();

3.抽象工厂模式（通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例，即工厂类负责创建抽象产品的具体子类的实例）
    //抽象工厂方法
    var VehicleFactory = function(subType,superType){
    	//判断抽象工厂中是否有该抽象类
    	if(typeof VehicleFactory[superType] === 'function'){
    		//缓存类
    		function F(){};
    		//继承父类属性和方法
    		F.prototype = new VehicleFactory[superType]();
    		//将子类constructor指向子类
    		subType.constructor = subType;
    		//子类原型继承父类
    		subType.prototype = new F();
    	}else{
    		//不存在该抽象类抛出错误
    		throw new Error('未创建该抽象类');
    	}
    }
    //小汽车抽象类
    VehicleFactory.Car = function(){
    	this.type = 'car';
    };
    VehicleFactory.Car.prototype = {
    	getPrice : function(){
    		return new Error('抽象方法不能调用');
    	},
    	getSpeed : function(){
    		return new Error('抽象方法不能调用')
    	}
    }
    //公交车抽象类
    VehicleFactory.Bus = function(){
    	this.type = 'bus';
    };
    VehicleFactory.Bus = {
    	getPrice : function(){
    		return new Error('抽象方法不能调用');
    	},
    	getSpeed : function(){
    		return new Error('抽象方法不能调用')
    	}
    }
    //货车抽象类
    VehicleFactory.Truck = function(){
    	this.type = 'truck';
    };
    VehicleFactory.Truck = {
    	getPrice : function(){
    		return new Error('抽象方法不能调用');
    	},
    	getSpeed : function(){
    		return new Error('抽象方法不能调用')
    	}
    }

    //抽象类的实现
    //宝马汽车子类
    var BMW = function(price,speed){
    	this.price = price;
    	this.speed = speed;
    }
    //抽象工厂实现对Car抽象类的继承
    VehicleFactory(BMW,'Car');
    BMW.prototype.getPrice = function(){
    	return this.price;
    }
    BMW.prototype.getSpeed = function(){
    	return this.speed;
    }

    var aBMW = new BMW('100万','1000');
    console.log(aBMW);
    console.log(aBMW.getPrice());
    console.log(aBMW.getSpeed());

4.建造者模式（将一个复杂对象的建构层与其表示层相互分离，同样的构建过程可采用不同的表示 ==比较注重过程==）
    //建造者模式
    //创建一位人类
    var Human = function(param){
    	//技能
    	this.skill = param && param.skill || '保密';
    	//兴趣爱好
    	this.hobby = param && param.hobby || '保密';
    }
    //人类原型方法
    Human.prototype ={
    	getSkill : function(){
    		return this.skill;
    	},
    	getHobby : function(){
    		return this.hobby;
    	}
    }
    //实例化姓名类
    var Named = function(name){
    	var that = this;
    	//构造器
    	//构造函数解析姓名的姓与名
    	(function(name,that){
    		that.wholeName = name;
    		console.log(name.indexOf(''));
    		if(name.indexOf('') > -1){
    			console.log(name);
    			console.log(name.split(" ",1))
    			that.FirstName = name.split(" ",1).toString();
    			that.SecondName = name.slice(name.indexOf(''));
    		}
    	})(name,that);
    }

    //实例化职位类
    var Work = function(work){
    	var that = this;
    	//构造器
    	//构造函数中通过传入的职位特征来设置相应职位及描述
    	(function(work,that){
    		switch(work){
    			case 'code':
    				that.work = '工程师';
    				that.workDescript = '每天沉醉于编程';
    				break;
    			case 'UE':
    				that.work = '设计师';
    				that.workDescript = '设计更似一种艺术';
    				break;
    			case 'teach':
    				that.work = '教师';
    				that.workDescript = '分享也是一种快乐';
    				break;
    			default :
    				this.work = work;
    				that.workDescript = '对不起，我们还不清楚您选择职位的相关描述';
    		}
    	})(work,that);

    }

    //更换期望的职位
    Work.prototype.changeWork = function(work){
    	this.work = work;
    }
    //添加对职位的描述
    Work.prototype.changeDescript =function(setence){
    	this.workDescript = setence;
    }

    //创建一位应聘者
    //应聘者建造者 参数name（姓名）work （期望职位）
    var Person = function(name,work){
    	//创建应聘者缓存对象
    	var _person = new Human();
    	//创建应聘者姓名解析对象
    	_person.name = new Named(name);
    	//创建应聘者期望职位
    	_person.work = new Work(work);
    	//将创建的应聘者对象返回
    	return _person;
    }

    var person = new Person('zhang san','UE');
    console.log(person);
    console.log(person.skill);
    console.log(person.name.FirstName);
    console.log(person.work.work);
    console.log(person.work.workDescript);
    person.work.changeDescript('更改下职位描述');
    console.log(person.work.workDescript);

5.原型模式（用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法）


6.单例模式（又称为单体模式，只允许实例化一次的对象类）
A.静态变量单例
  var Conf = (function(){
    //私有变量
    var conf ={
      MAX_NUM:100,
      MIN_MUM:1,
      COUNT:1000
    }
    //返回取值器对象
    return{
      //取值器方法
      get:function(name){
        return conf[name]? conf[name]:null;
      }
    }
  })();

B.惰性单例（可以延迟创建）
  //惰性载入单例
  var LazySingle = (function(){
    //单例实例引用
    var instance = null;
    //单例
    function Single(){
      //这里定义私有属性和方法
      return {
        publicMethod:function(){};
        publicProperty:'1.0';
      }
    }
    //获取单例对象接口
    return function(){
      //如果为创建单例则创建单例
      if(!_instance){
        _instance = Single();
      }
      //返回单例
      return _instance;
    }
  })()
