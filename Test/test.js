/**
 * Created by 联想 on 2017/7/29.
 */

var data1  = new calculate_result();
var data2  = new calculate_result();
var data3  = new calculate_result();
var input1 = "1+4*5/10";
var input2 = "(7+6)/4";
var input3 = "9/0";

var expect = chai.expect;

describe('calculate_result',function(){
    before(function(){
        data1.prepare("input1");
        data2.prepare("input2");
        data3.prepare("input3");
    });

    describe('#Calculate()',function(){
        it('should return the value ',function(){
            expect(data1.Calculate()).to.be.equal(3);
            });

        it('should return the value',function(){
            expect(data2.Calculate()).to.be.equal(3.25);
        });

        it('should not return the value',function(){
        expect(data3.Calculate()).to.be.equal(4);
        })
    });
});
