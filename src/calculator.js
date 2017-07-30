/*d定义了计算时需要的类：Token  Token_stream */

function Token(kind,value){
    this.kind = kind;
    this.value = value;
    this.getType = function(){
        return this.kind;
    }
}
function Token_stream() {                               //get a token stream;
    this.arr = [];
    this.full = false;
    this.buffer = 0;
    this.stream_size = 0;
    this.back = function(t){                            // make the last token put back the token_stream;
        this.buffer = t;
        this.full = true;
    };
    this.get_arr=function(ss) {                             //make what you input a token;
        var num = ss.length;
        var str = "";
        var i = 0;
        while (i < num) {
            var ch1 = ss[i];
            switch (ch1) {
                case ';':
                case '(':
                case')':
                case'+':
                case'-':
                case'*':
                case'/':
                case'%':
                case'!':                         //test these operands is valid;
                {
                    var tem1 = new Token(ch1,0);
                    this.arr[this.stream_size] = tem1 ;
                    this.stream_size +=1;
                    i += 1;
                    break;
                }
                case'.':
                case'0':
                case'1':
                case'2':
                case'3':
                case'4':
                case'5':
                case'6':
                case'7':
                case'8':
                case'9':                       //ensure what you input is a number;
                {
                    str += ch1;
                    if (i == num - 1 || ss[i + 1] != '0' && ss[i + 1] != '1' && ss[i + 1] != '2' && ss[i + 1] != '3'
                        && ss[i + 1] != '4' && ss[i + 1] != '5' && ss[i + 1] != '6' && ss[i + 1] != '7'
                        && ss[i + 1] != '8' && ss[i + 1] != '9' && ss[i + 1] != '.') {
                        var d = parseFloat(str);
                        var tem2  = new Token('8',d);
                        this.arr[this.stream_size] = tem2;
                        this.stream_size +=1;
                        str = "";
                    }
                    i+=1;
                    break;
                }
                default:
                {
                    alert("wrong input");
                    break;
                }
            }
        }
    };
    this.get = function(){                                   //make what you input a token;
        if(this.full) {
            this.full = false;
            return this.buffer;
        }
        else {
            var tt = Object.create(Token);
            tt = this.arr.shift();
            return tt;
        }
    };
    this.end_arr =function(){
        var a = new Token(';',0);
        this.arr[this.stream_size] = ';';
    };
    this.clear_arr=function(){
        this.arr = [];
        this.full = false;
        this.buffer = 0;
        this.stream_size = 0;
    };
    this.length=function(){
        return this.arr.length;
    }
}

function calculate_result(){
    this.ts = new Token_stream();            //构造一个对象
    this.prepare = function(input){
        this.ts.get_arr(input);
        this.ts.end_arr();
    };
    this.last = function(){
        this.ts.get();
    };
    this.primary=function() {               //deal with numbers ;
        var t = this.ts.get();
        switch (t.kind) {
            case '(':
                var d = this.expression();
                t = this.ts.get();
                if (t.kind != ')') alert("缺少 ) ");
                return d;
                break;
            case '8':
            {
                var num = t.value;
                var sum = 1;
                t = this.ts.get();
                var j = parseInt(num);
                if (t.kind == '!') {
                    if (j != num || num <0) alert("不是整数");
                    else if (num == 0) {
                        sum = 1;
                        return sum;
                    }
                    else {
                        for (var i = 1; i <= parseInt(num); ++i)
                            sum *= i;
                        return sum;
                    }
                }
                else
                    this.ts.back(t);
                return num;
            }
            case'-':                                      // achieve the negative number operation;
                return -this.primary();
            case'+': {
                t = this.ts.get();
                if (t.kind == '+')                       // achieve the "++" ;
                    return +this.primary() + 1;
                else
                    this.ts.back(t);
                return +this.primary();
            }
            default:                                   // error checking;
                alert("不符合规定的输入");
        }
    };
    this.term=function() {                                    //achieve '*','/','%' operation;
        var left = this.primary();
        var t = this.ts.get();
        while (true) {
            switch (t.kind) {
                case'*':
                    var d = this.primary();
                    left *= d;
                    t = this.ts.get();
                    break;
                case '/':
                {
                    d = this.primary();
                    if (d == 0) alert("分子不可以是0");
                    left /= d;
                    t = this.ts.get();
                    break;
                }
                case'%':
                    d = this.primary();
                    var i1 = parseInt(left);
                    var i2 = parseInt(d);
                    if (i1 != left || i2 != d || i2 == 0) throw input_error();
                    left = parseInt(left) % parseInt(d);
                    t = this.ts.get();
                    break;
                default:
                    this.ts.back(t);
                    return left;
            }
        }
    };
    this.expression=function() {                               //achieve two number "+" and "-";
        var left = this.term();
        var t = this.ts.get();
        while (true) {
            switch (t.kind) {
                case'+':
                    var d = this.term();
                    left += d;
                    t = this.ts.get();
                    break;
                case '-':
                    d = this.term();
                    left -= d;
                    t = this.ts.get();
                    break;
                default:
                    this.ts.back(t);        //make the not right but be called token back to the token_stream;
                    return left;
            }
        }
    };
    this.Calculate = function(){          //计算最终的结果
        var results = this.expression();
        return results;
    };
    this.clear=function(){               //使对象calculate_result 初始化
        this.ts.clear_arr();
    }
}


