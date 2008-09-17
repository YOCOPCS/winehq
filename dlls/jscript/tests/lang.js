/*
 * Copyright 2008 Jacek Caban for CodeWeavers
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 */

var tmp;

ok(true, "true is not true?");
ok(!false, "!false is not true");
ok(!undefined, "!undefined is not true");
ok(!null, "!null is not true");
ok(!0, "!0 is not true");
ok(!0.0, "!0.0 is not true");

ok(1 === 1, "1 === 1 is false");
ok(!(1 === 2), "!(1 === 2) is false");
ok(1.0 === 1, "1.0 === 1 is false");
ok("abc" === "abc", "\"abc\" === \"abc\" is false");
ok(true === true, "true === true is false");
ok(null === null, "null === null is false");
ok(undefined === undefined, "undefined === undefined is false");
ok(!(undefined === null), "!(undefined === null) is false");

ok(1 !== 2, "1 !== 2 is false");
ok(null !== undefined, "null !== undefined is false");

ok(1 == 1, "1 == 1 is false");
ok(!(1 == 2), "!(1 == 2) is false");
ok(1.0 == 1, "1.0 == 1 is false");
ok("abc" == "abc", "\"abc\" == \"abc\" is false");
ok(true == true, "true == true is false");
ok(null == null, "null == null is false");
ok(undefined == undefined, "undefined == undefined is false");
ok(undefined == null, "undefined == null is false");
ok(true == 1, "true == 1 is false");
ok(!(true == 2), "true == 2");
ok(0 == false, "0 == false is false");

ok(1 != 2, "1 != 2 is false");
ok(false != 1, "false != 1 is false");

var trueVar = true;
ok(trueVar, "trueVar is not true");

ok(ScriptEngine.length === 0, "ScriptEngine.length is not 0");

function testFunc1(x, y) {
    ok(this !== undefined, "this is undefined");
    ok(x === true, "x is not 1");
    ok(y === "test", "y is not \"test\"");
    ok(arguments.length === 2, "arguments.length is not 2");
    ok(arguments["0"] === true, "arguments[0] is not true");
    ok(arguments["1"] === "test", "arguments[1] is not \"test\"");

    return true;
}

ok(testFunc1.length === 2, "testFunc1.length is not 2");

ok(Object.prototype !== undefined, "Object.prototype is undefined");
ok(Object.prototype.prototype === undefined, "Object.prototype is not undefined");
ok(String.prototype !== undefined, "String.prototype is undefined");
ok(Array.prototype !== undefined, "Array.prototype is undefined");
ok(Boolean.prototype !== undefined, "Boolean.prototype is undefined");
ok(Number.prototype !== undefined, "Number.prototype is undefined");
ok(RegExp.prototype !== undefined, "RegExp.prototype is undefined");
ok(Math !== undefined, "Math is undefined");
ok(Math.prototype === undefined, "Math.prototype is not undefined");

ok(typeof(0) === "number", "typeof(0) is not number");
ok(typeof(1.5) === "number", "typeof(1.5) is not number");
ok(typeof("abc") === "string", "typeof(\"abc\") is not string");
ok(typeof("") === "string", "typeof(\"\") is not string");
ok(typeof(true) === "boolean", "typeof(true) is not boolean");
ok(typeof(null) === "object", "typeof(null) is not object");
ok(typeof(undefined) === "undefined", "typeof(undefined) is not undefined");
ok(typeof(Math) === "object", "typeof(Math) is not object");
ok(typeof(String.prototype) === "object", "typeof(String.prototype) is not object");
ok(typeof(testFunc1) === "function", "typeof(testFunc1) is not function");
ok(typeof(String) === "function", "typeof(String) is not function");
ok(typeof(ScriptEngine) === "function", "typeof(ScriptEngine) is not function");
ok(typeof(this) === "object", "typeof(this) is not object");

ok(testFunc1(true, "test") === true, "testFunc1 not returned true");

var obj1 = new Object();
ok(typeof(obj1) === "object", "typeof(obj1) is not object");
obj1.test = true;
obj1.func = function () {
    ok(this === obj1, "this is not obj1");
    ok(this.test === true, "this.test is not true");
    ok(arguments.length === 1, "arguments.length is not 1");
    ok(arguments["0"] === true, "arguments[0] is not true");

    return "test";
};

ok(obj1.func(true) === "test", "obj1.func(true) is not \"test\"");

function testConstr1() {
    this.var1 = 1;

    ok(this !== undefined, "this is undefined");
    ok(arguments.length === 1, "arguments.length is not 1");
    ok(arguments["0"] === true, "arguments[0] is not 1");

    return false;
}

testConstr1.prototype.pvar = 1;

var obj2 = new testConstr1(true);
ok(typeof(obj2) === "object", "typeof(obj2) is not object");
ok(obj2.pvar === 1, "obj2.pvar is not 1");

testConstr1.prototype.pvar = 2;
ok(obj2.pvar === 2, "obj2.pvar is not 2");

obj2.pvar = 3;
testConstr1.prototype.pvar = 1;
ok(obj2.pvar === 3, "obj2.pvar is not 3");

tmp = 0;
if(true)
    tmp = 1;
else
    ok(false, "else evaluated");
ok(tmp === 1, "tmp !== 1, if not evaluated?");

tmp = 0;
if(1 === 0)
    ok(false, "if evaluated");
else
    tmp = 1;
ok(tmp === 1, "tmp !== 1, if not evaluated?");

if(false)
    ok(false, "if(false) evaluated");

tmp = 0;
if(true)
    tmp = 1;
ok(tmp === 1, "tmp !== 1, if(true) not evaluated?");

var obj3 = { prop1: 1,  prop2: typeof(false) };
ok(obj3.prop1 === 1, "obj3.prop1 is not 1");
ok(obj3.prop2 === "boolean", "obj3.prop2 is not \"boolean\"");

{
    var blockVar = 1;
    blockVar = 2;
}
ok(blockVar === 2, "blockVar !== 2");

ok((true ? 1 : 2) === 1, "conditional expression true is not 1");
ok((0 === 2 ? 1 : 2) === 2, "conditional expression true is not 2");

ok(getVT(undefined) === "VT_EMPTY", "getVT(undefined) is not VT_EMPTY");
ok(getVT(null) === "VT_NULL", "getVT(null) is not VT_NULL");
ok(getVT(0) === "VT_I4", "getVT(0) is not VT_I4");
ok(getVT(0.5) === "VT_R8", "getVT(1.5) is not VT_R8");
ok(getVT("test") === "VT_BSTR", "getVT(\"test\") is not VT_BSTR");
ok(getVT(Math) === "VT_DISPATCH", "getVT(Math) is not VT_DISPATCH");
ok(getVT(false) === "VT_BOOL", "getVT(false) is not VT_BOOL");

tmp = 2+2;
ok(tmp === 4, "2+2 !== 4");
ok(getVT(tmp) === "VT_I4", "getVT(2+2) !== VT_I4");

tmp = 2+2.5;
ok(tmp === 4.5, "2+2.5 !== 4.5");
ok(getVT(tmp) === "VT_R8", "getVT(2+2.5) !== VT_R8");

tmp = 1.5+2.5;
ok(tmp === 4, "1.4+2.5 !== 4");
ok(getVT(tmp) === "VT_I4", "getVT(1.5+2.5) !== VT_I4");

tmp = 4-2;
ok(tmp === 2, "4-2 !== 2");
ok(getVT(tmp) === "VT_I4", "getVT(4-2) !== VT_I4");

tmp = 4.5-2;
ok(tmp === 2.5, "4.5-2 !== 2.5");
ok(getVT(tmp) === "VT_R8", "getVT(4-2) !== VT_R8");

tmp = -2;
ok(tmp === 0-2, "-2 !== 0-2");
ok(getVT(tmp) === "VT_I4", "getVT(-2) !== VT_I4");

tmp = 2*3;
ok(tmp === 6, "2*3 !== 6");
ok(getVT(tmp) === "VT_I4", "getVT(2*3) !== VT_I4");

tmp = 2*3.5;
ok(tmp === 7, "2*3.5 !== 7");
ok(getVT(tmp) === "VT_I4", "getVT(2*3.5) !== VT_I4");

tmp = 2.5*3.5;
ok(tmp === 8.75, "2.5*3.5 !== 8.75");
ok(getVT(tmp) === "VT_R8", "getVT(2.5*3.5) !== VT_R8");

tmp = 4/2;
ok(tmp === 2, "4/2 !== 2");
ok(getVT(tmp) === "VT_I4", "getVT(4/2) !== VT_I4");

tmp = 4.5/1.5;
ok(tmp === 3, "4.5/1.5 !== 3");
ok(getVT(tmp) === "VT_I4", "getVT(4.5/1.5) !== VT_I4");

tmp = 3/2;
ok(tmp === 1.5, "3/2 !== 1.5");
ok(getVT(tmp) === "VT_R8", "getVT(3/2) !== VT_R8");

tmp = "ab" + "cd";
ok(tmp === "abcd", "\"ab\" + \"cd\" !== \"abcd\"");

tmp = 1;
ok((tmp += 1) === 2, "tmp += 1 !== 2");
ok(tmp === 2, "tmp !== 2");

tmp = 2;
ok((tmp -= 1) === 1, "tmp -= 1 !== 1");
ok(tmp === 1, "tmp !=== 1");

tmp = 2;
ok((tmp *= 1.5) === 3, "tmp *= 1.5 !== 3");
ok(tmp === 3, "tmp !=== 3");

tmp = 5;
ok((tmp /= 2) === 2.5, "tmp /= 2 !== 2.5");
ok(tmp === 2.5, "tmp !=== 2.5");

tmp = 3 || ok(false, "second or expression called");
ok(tmp === 3, "3 || (...) is not 3");

tmp = false || 2;
ok(tmp === 2, "false || 2 is not 2");

tmp = 0 && ok(false, "second and expression called");
ok(tmp === 0, "0 && (...) is not 0");

tmp = true && "test";
ok(tmp === "test", "true && \"test\" is not \"test\"");

tmp = true && 0;
ok(tmp === 0, "true && 0 is not 0");

ok(1 < 3.4, "1 < 3.4 failed");
ok(!(3.4 < 1), "3.4 < 1");
ok("abc" < "abcd", "abc < abcd failed");
ok("abcd" < "abce", "abce < abce failed");
ok("" < "x", "\"\" < \"x\" failed");
ok(!(0 < 0), "0 < 0");

ok(1 <= 3.4, "1 <= 3.4 failed");
ok(!(3.4 <= 1), "3.4 <= 1");
ok("abc" <= "abcd", "abc <= abcd failed");
ok("abcd" <= "abce", "abce <= abce failed");
ok("" <= "x", "\"\" <= \"x\" failed");
ok(0 <= 0, "0 <= 0 failed");

ok(3.4 > 1, "3.4 > 1 failed");
ok(!(1 > 3.4), "1 > 3.4");
ok("abcd" > "abc", "abc > abcd failed");
ok("abce" > "abcd", "abce > abce failed");
ok("x" > "", "\"x\" > \"\" failed");
ok(!(0 > 0), "0 > 0");

ok(3.4 >= 1, "3.4 >= 1 failed");
ok(!(1 >= 3.4), "1 >= 3.4");
ok("abcd" >= "abc", "abc >= abcd failed");
ok("abce" >= "abcd", "abce >= abce failed");
ok("x" >= "", "\"x\" >= \"\" failed");
ok(0 >= 0, "0 >= 0");

tmp = 1;
ok(++tmp === 2, "++tmp (1) is not 2");
ok(tmp === 2, "incremented tmp is not 2");
ok(--tmp === 1, "--tmp (2) is not 1");
ok(tmp === 1, "decremented tmp is not 1");
ok(tmp++ === 1, "tmp++ (1) is not 1");
ok(tmp === 2, "incremented tmp(1) is not 2");
ok(tmp-- === 2, "tmp-- (2) is not 2");
ok(tmp === 1, "decremented tmp is not 1");

String.prototype.test = true;
ok("".test === true, "\"\".test is not true");

Boolean.prototype.test = true;
ok(true.test === true, "true.test is not true");

Number.prototype.test = true;
ok((0).test === true, "(0).test is not true");
ok((0.5).test === true, "(0.5).test is not true");

var state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
}catch(ex) {
    ok(false, "unexpected catch");
}
ok(state === "try", "state = " + state + " expected try");

state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
}finally {
    ok(state === "try", "funally: state = " + state);
    state = "finally";
}
ok(state === "finally", "state = " + state + " expected finally");

state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
}catch(ex) {
    ok(false, "unexpected catch");
}finally {
    ok(state === "try", "funally: state = " + state);
    state = "finally";
}
ok(state === "finally", "state = " + state + " expected finally");

var state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
    throw "except";
}catch(ex) {
    ok(state === "try", "catch: state = " + state);
    ok(ex === "except", "ex is not \"except\"");
    state = "catch";
}
ok(state === "catch", "state = " + state + " expected catch");

var state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
    throw true;
}catch(ex) {
    ok(state === "try", "catch: state = " + state);
    ok(ex === true, "ex is not true");
    state = "catch";
}finally {
    ok(state === "catch", "funally: state = " + state);
    state = "finally";
}
ok(state === "finally", "state = " + state + " expected finally");

var state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
    try { throw true; } finally {}
}catch(ex) {
    ok(state === "try", "catch: state = " + state);
    ok(ex === true, "ex is not true");
    state = "catch";
}finally {
    ok(state === "catch", "funally: state = " + state);
    state = "finally";
}
ok(state === "finally", "state = " + state + " expected finally");

var state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
    try { throw "except"; } catch(ex) { throw true; }
}catch(ex) {
    ok(state === "try", "catch: state = " + state);
    ok(ex === true, "ex is not true");
    state = "catch";
}finally {
    ok(state === "catch", "funally: state = " + state);
    state = "finally";
}
ok(state === "finally", "state = " + state + " expected finally");

function throwFunc(x) {
    throw x;
}

var state = "";
try {
    ok(state === "", "try: state = " + state);
    state = "try";
    throwFunc(true);
}catch(ex) {
    ok(state === "try", "catch: state = " + state);
    ok(ex === true, "ex is not true");
    state = "catch";
}finally {
    ok(state === "catch", "funally: state = " + state);
    state = "finally";
}
ok(state === "finally", "state = " + state + " expected finally");

reportSuccess();
