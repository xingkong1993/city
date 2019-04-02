window.verCity = (function () {
    var link = document.querySelector("[data-city-list]");
    var callBack = function (data) {
        alert(data)
    };
    var city = function (param) {
        props;
        styles();
        if (param.callbacks) {
            callBack = param.callbacks;
        }
        if(param.citys){
            citiesLists = param.citys;
        }
        //获取定位点
        get_linkItems();
        link.onclick = show_citys;
    };
    var get_linkItems = function () {
        link.innerHTML = "";
        var icon = document.createElement("i");
        var defa = link.getAttribute("data-city-default");
        icon.className = "city-icon city-icon-location city-changes";
        icon.innerText = defa ? defa : "成都市";
        var hot_city = (link.getAttribute("data-city-hot"));
        hot_city = hot_city.split(",");
        link.appendChild(icon);
        var box = document.createElement("div");
        box.className = "ver-city-list-box";
        box.id = "ver-city-list-box";
        //生成到title
        var title = document.createElement("div");
        title.className = "ver-city-list-title";
        title.innerText = "城市列表";
        box.appendChild(title);
        var close = document.createElement("i");
        close.id = "ver-city-close";
        close.className = "city-icon city-icon-angle-left city-icon-lg";
        title.appendChild(close);
        var inits = Object.keys(citiesLists);
        var tag = document.createElement("ul");
        tag.className = "ver-city-list-tag";
        var tag_sta = document.createElement("li");
        tag_sta.className = "ver-city-tag-li hot";
        tag_sta.setAttribute("data-items", "hot");
        tag_sta.innerHTML = '<i class="city-icon city-icon-start"></i>';
        tag.appendChild(tag_sta);
        for (var i in inits) {
            tag_sta = document.createElement("li");
            tag_sta.className = "ver-city-tag-li " + inits[i];
            tag_sta.setAttribute("data-items", inits[i]);
            tag_sta.innerHTML = inits[i];
            tag.appendChild(tag_sta);
        }
        box.appendChild(tag);
        var items = document.createElement("ul");
        items.className = "ver-city-list-items";
        var location = document.createElement("li");
        location.innerHTML = '<dl>\n' +
            '                <dt>\n' +
            '                    <i class="city-icon city-icon-location" id="now-city"> 当前城市：' + defa + '</i>\n' +
            '                </dt>\n' +
            '            </dl>';
        items.appendChild(location);
        var hot_citys = document.createElement("li");
        hot_citys.id = "hot";
        var hots = document.createElement("dl");
        hots.className = "ver-city-list-items-hot";
        var _h = '<dt><i class="city-icon-start city-icon"> 热门城市</i></dt><dd>';
        for (var i in hot_city) {
            _h += '<p class="ver-city-list-name">' + hot_city[i] + '</p>';
        }
        _h += '</dd>';
        hots.innerHTML = _h;
        hot_citys.appendChild(hots);
        items.appendChild(hot_citys);
        for (var j in citiesLists) {
            var cit = citiesLists[j];
            var lis = document.createElement("li");
            lis.id = j;
            var ciyes = document.createElement("dl");
            // ciyes.className = "ver-city-list-items-";
            var _l = '<dt>' + j + '</dt><dd>';
            for (var k in cit) {
                var cc = cit[k].name;
                _l += '<p class="ver-city-list-name">' + cc + '</p>';
            }
            _l += "</dd>";
            ciyes.innerHTML = _l;
            lis.appendChild(ciyes);
            items.appendChild(lis);
        }
        box.appendChild(items);
        document.body.appendChild(box);
        close.onclick = function () {
            var ids = document.getElementById("ver-city-list-box");
            ids.scrollTo(0, 0);
            ids.classList.remove("ver-city-box-show");
            ids.classList.add("ver-city-box-hide");
        };
    };
    var show_citys = function () {
        var ids = document.getElementById("ver-city-list-box");
        ids.classList.add("ver-city-box-show");
        ids.classList.remove("ver-city-box-hide");
        var tags = ids.querySelectorAll(".ver-city-tag-li");
        [].forEach.call(tags, function (items) {
            items.onclick = function () {
                var data = this.getAttribute("data-items");
                var docu = ids.querySelector("#" + data);
                var tops = docu.offsetTop;
                var hei = ids.offsetTop;
                ids.scrollTo(tops, tops - 40);
            }
        });
        var citys = document.querySelectorAll(".ver-city-list-name");
        [].forEach.call(citys, function (its) {
            its.onclick = function () {
                var text = this.innerText;
                link.setAttribute("data-city-default", text);
                link.querySelector(".city-changes").innerText = text;
                ids.scrollTo(0, 0);
                document.getElementById("now-city").innerText = "当前城市：" + text;
                ids.classList.remove("ver-city-box-show");
                ids.classList.add("ver-city-box-hide");
                callBack(text);
            }
        });
    };
    var styles = function () {
        var css = document.createElement("link"),
            icon = document.createElement("link");
        css.href = getPath + "need/cityIcon.css?v=1.1.0";
        icon.href = getPath + "need/verCityList.css?v=1.1.0";
        css.rel = icon.rel = "stylesheet";
        css.type = icon.type = "text/css";
        var link = document.getElementsByTagName("head")[0];
        link.appendChild(css);
        link.appendChild(icon);
    };
    var props = function () {
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (callback, thisArg) {
                var T, k;
                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0; // Hack to convert O.length to a UInt32
                if ({}.toString.call(callback) != "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }
                if (thisArg) {
                    T = thisArg;
                }
                k = 0;
                while (k < len) {
                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }

        if (!("classList" in document.documentElement)) {
            Object.defineProperty(HTMLElement.prototype, 'classList', {
                get: function () {
                    var self = this;

                    function update(fn) {
                        return function (value) {
                            var classes = self.className.split(/\s+/g),
                                index = classes.indexOf(value);

                            fn(classes, index, value);
                            self.className = classes.join(" ");
                        }
                    }

                    return {
                        add: update(function (classes, index, value) {
                            if (!~index) classes.push(value);
                        }),

                        remove: update(function (classes, index) {
                            if (~index) classes.splice(index, 1);
                        }),

                        toggle: update(function (classes, index, value) {
                            if (~index)
                                classes.splice(index, 1);
                            else
                                classes.push(value);
                        }),

                        contains: function (value) {
                            return !!~self.className.split(/\s+/g).indexOf(value);
                        },

                        item: function (i) {
                            return self.className.split(/\s+/g)[i] || null;
                        }
                    };
                }
            });
        }
    }();

    var insertAfter = function (item, afters) {
        var parent = afters.parentNode;
        if (parent.lastChild == afters) {
            parent.appendChild(item);
        } else {
            parent.insertBefore(item, afters.nextSibling)
        }
    };

    var getPath = function () {
        var jsPath = document.currentScript ? document.currentScript.src : function () {
            var js = document.scripts
                , last = js.length - 1
                , src;
            for (var i = last; i > 0; i--) {
                if (js[i].readyState === 'interactive') {
                    src = js[i].src;
                    break;
                }
            }
            return src || js[last].src;
        }();
        return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }();
    var citiesLists = {
        "A": [{"name": "阿拉尔市", "initials": "A", "code": "659002"}, {
            "name": "阿坝藏族羌族自治州",
            "initials": "A",
            "code": "513200"
        }, {"name": "鞍山市", "initials": "A", "code": "210300"}, {
            "name": "安庆市",
            "initials": "A",
            "code": "340800"
        }, {"name": "阿克苏地区", "initials": "A", "code": "652900"}, {
            "name": "安康市",
            "initials": "A",
            "code": "610900"
        }, {"name": "阿拉善盟", "initials": "A", "code": "152900"}, {
            "name": "安阳市",
            "initials": "A",
            "code": "410500"
        }, {"name": "安顺市", "initials": "A", "code": "520400"}, {"name": "阿勒泰地区", "initials": "A", "code": "654300"}],
        "B": [{"name": "北京市", "initials": "B", "code": "110100"}, {
            "name": "保定市",
            "initials": "B",
            "code": "130600"
        }, {"name": "毕节市", "initials": "B", "code": "520500"}, {
            "name": "白银市",
            "initials": "B",
            "code": "620400"
        }, {"name": "本溪市", "initials": "B", "code": "210500"}, {
            "name": "百色市",
            "initials": "B",
            "code": "451000"
        }, {"name": "白沙黎族自治县", "initials": "B", "code": "469025"}, {
            "name": "北屯市",
            "initials": "B",
            "code": "659005"
        }, {"name": "保山市", "initials": "B", "code": "530500"}, {
            "name": "保亭黎族苗族自治县",
            "initials": "B",
            "code": "469029"
        }, {"name": "白城市", "initials": "B", "code": "220800"}, {
            "name": "白山市",
            "initials": "B",
            "code": "220600"
        }, {"name": "亳州市", "initials": "B", "code": "341600"}, {
            "name": "博尔塔拉蒙古自治州",
            "initials": "B",
            "code": "652700"
        }, {"name": "宝鸡市", "initials": "B", "code": "610300"}, {
            "name": "包头市",
            "initials": "B",
            "code": "150200"
        }, {"name": "巴中市", "initials": "B", "code": "511900"}, {
            "name": "巴彦淖尔市",
            "initials": "B",
            "code": "150800"
        }, {"name": "北海市", "initials": "B", "code": "450500"}, {
            "name": "滨州市",
            "initials": "B",
            "code": "371600"
        }, {"name": "蚌埠市", "initials": "B", "code": "340300"}, {
            "name": "巴音郭楞蒙古自治州",
            "initials": "B",
            "code": "652800"
        }],
        "C": [{"name": "崇左市", "initials": "C", "code": "451400"}, {
            "name": "朝阳市",
            "initials": "C",
            "code": "211300"
        }, {"name": "郴州市", "initials": "C", "code": "431000"}, {
            "name": "澄迈县",
            "initials": "C",
            "code": "469023"
        }, {"name": "池州市", "initials": "C", "code": "341700"}, {
            "name": "重庆郊县",
            "initials": "C",
            "code": "500200"
        }, {"name": "长春市", "initials": "C", "code": "220100"}, {
            "name": "楚雄彝族自治州",
            "initials": "C",
            "code": "532300"
        }, {"name": "昌江黎族自治县", "initials": "C", "code": "469026"}, {
            "name": "昌吉回族自治州",
            "initials": "C",
            "code": "652300"
        }, {"name": "赤峰市", "initials": "C", "code": "150400"}, {
            "name": "沧州市",
            "initials": "C",
            "code": "130900"
        }, {"name": "滁州市", "initials": "C", "code": "341100"}, {
            "name": "承德市",
            "initials": "C",
            "code": "130800"
        }, {"name": "长治市", "initials": "C", "code": "140400"}, {
            "name": "常德市",
            "initials": "C",
            "code": "430700"
        }, {"name": "重庆市", "initials": "C", "code": "500100"}, {
            "name": "长沙市",
            "initials": "C",
            "code": "430100"
        }, {"name": "成都市", "initials": "C", "code": "510100"}, {
            "name": "常州市",
            "initials": "C",
            "code": "320400"
        }, {"name": "潮州市", "initials": "C", "code": "445100"}],
        "D": [{"name": "大理白族自治州", "initials": "D", "code": "532900"}, {
            "name": "东方市",
            "initials": "D",
            "code": "469007"
        }, {"name": "达州市", "initials": "D", "code": "511700"}, {
            "name": "大庆市",
            "initials": "D",
            "code": "230600"
        }, {"name": "定安县", "initials": "D", "code": "469021"}, {
            "name": "大兴安岭地区",
            "initials": "D",
            "code": "232700"
        }, {"name": "东营市", "initials": "D", "code": "370500"}, {
            "name": "定西市",
            "initials": "D",
            "code": "621100"
        }, {"name": "丹东市", "initials": "D", "code": "210600"}, {
            "name": "德宏傣族景颇族自治州",
            "initials": "D",
            "code": "533100"
        }, {"name": "东莞市", "initials": "D", "code": "441900"}, {
            "name": "大连市",
            "initials": "D",
            "code": "210200"
        }, {"name": "德阳市", "initials": "D", "code": "510600"}, {
            "name": "儋州市",
            "initials": "D",
            "code": "460400"
        }, {"name": "德州市", "initials": "D", "code": "371400"}, {
            "name": "大同市",
            "initials": "D",
            "code": "140200"
        }, {"name": "迪庆藏族自治州", "initials": "D", "code": "533400"}, {"name": "东沙群岛", "initials": "D", "code": "442100"}],
        "E": [{"name": "恩施土家族苗族自治州", "initials": "E", "code": "422800"}, {
            "name": "鄂州市",
            "initials": "E",
            "code": "420700"
        }],
        "F": [{"name": "防城港市", "initials": "F", "code": "450600"}, {
            "name": "佛山市",
            "initials": "F",
            "code": "440600"
        }, {"name": "抚州市", "initials": "F", "code": "361000"}, {
            "name": "阜新市",
            "initials": "F",
            "code": "210900"
        }, {"name": "抚顺市", "initials": "F", "code": "210400"}, {
            "name": "福州市",
            "initials": "F",
            "code": "350100"
        }, {"name": "阜阳市", "initials": "F", "code": "341200"}],
        "G": [{"name": "固原市", "initials": "G", "code": "640400"}, {
            "name": "甘南藏族自治州",
            "initials": "G",
            "code": "623000"
        }, {"name": "甘孜藏族自治州", "initials": "G", "code": "513300"}, {
            "name": "赣州市",
            "initials": "G",
            "code": "360700"
        }, {"name": "广安市", "initials": "G", "code": "511600"}, {
            "name": "广元市",
            "initials": "G",
            "code": "510800"
        }, {"name": "广州市", "initials": "G", "code": "440100"}, {
            "name": "贵港市",
            "initials": "G",
            "code": "450800"
        }, {"name": "贵阳市", "initials": "G", "code": "520100"}, {
            "name": "果洛藏族自治州",
            "initials": "G",
            "code": "632600"
        }, {"name": "桂林市", "initials": "G", "code": "450300"}],
        "H": [{"name": "淮北市", "initials": "H", "code": "340600"}, {
            "name": "黄山市",
            "initials": "H",
            "code": "341000"
        }, {"name": "合肥市", "initials": "H", "code": "340100"}, {
            "name": "汉中市",
            "initials": "H",
            "code": "610700"
        }, {"name": "河池市", "initials": "H", "code": "451200"}, {
            "name": "呼伦贝尔市",
            "initials": "H",
            "code": "150700"
        }, {"name": "海西蒙古族藏族自治州", "initials": "H", "code": "632800"}, {
            "name": "哈密市",
            "initials": "H",
            "code": "650500"
        }, {"name": "和田地区", "initials": "H", "code": "653200"}, {
            "name": "海北藏族自治州",
            "initials": "H",
            "code": "632200"
        }, {"name": "邯郸市", "initials": "H", "code": "130400"}, {
            "name": "鹤岗市",
            "initials": "H",
            "code": "230400"
        }, {"name": "衡阳市", "initials": "H", "code": "430400"}, {
            "name": "杭州市",
            "initials": "H",
            "code": "330100"
        }, {"name": "淮南市", "initials": "H", "code": "340400"}, {
            "name": "菏泽市",
            "initials": "H",
            "code": "371700"
        }, {"name": "鹤壁市", "initials": "H", "code": "410600"}, {
            "name": "黄石市",
            "initials": "H",
            "code": "420200"
        }, {"name": "海口市", "initials": "H", "code": "460100"}, {
            "name": "黄南藏族自治州",
            "initials": "H",
            "code": "632300"
        }, {"name": "惠州市", "initials": "H", "code": "441300"}, {
            "name": "香港特别行政区",
            "initials": "H",
            "code": "810000"
        }, {"name": "淮安市", "initials": "H", "code": "320800"}, {
            "name": "呼和浩特市",
            "initials": "H",
            "code": "150100"
        }, {"name": "海南藏族自治州", "initials": "H", "code": "632500"}, {
            "name": "河源市",
            "initials": "H",
            "code": "441600"
        }, {"name": "黑河市", "initials": "H", "code": "231100"}, {
            "name": "怀化市",
            "initials": "H",
            "code": "431200"
        }, {"name": "哈尔滨市", "initials": "H", "code": "230100"}, {
            "name": "湖州市",
            "initials": "H",
            "code": "330500"
        }, {"name": "黄冈市", "initials": "H", "code": "421100"}, {
            "name": "兴安盟",
            "initials": "H",
            "code": "152200"
        }, {"name": "葫芦岛市", "initials": "H", "code": "211400"}, {
            "name": "红河哈尼族彝族自治州",
            "initials": "H",
            "code": "532500"
        }, {"name": "衡水市", "initials": "H", "code": "131100"}, {
            "name": "海东市",
            "initials": "H",
            "code": "630200"
        }, {"name": "贺州市", "initials": "H", "code": "451100"}],
        "I": [{"name": "伊犁哈萨克自治州", "initials": "I", "code": "654000"}],
        "J": [{"name": "吉林市", "initials": "J", "code": "220200"}, {
            "name": "嘉峪关市",
            "initials": "J",
            "code": "620200"
        }, {"name": "金昌市", "initials": "J", "code": "620300"}, {
            "name": "揭阳市",
            "initials": "J",
            "code": "445200"
        }, {"name": "焦作市", "initials": "J", "code": "410800"}, {
            "name": "晋城市",
            "initials": "J",
            "code": "140500"
        }, {"name": "荆州市", "initials": "J", "code": "421000"}, {
            "name": "济南市",
            "initials": "J",
            "code": "370100"
        }, {"name": "酒泉市", "initials": "J", "code": "620900"}, {
            "name": "佳木斯市",
            "initials": "J",
            "code": "230800"
        }, {"name": "荆门市", "initials": "J", "code": "420800"}, {
            "name": "景德镇市",
            "initials": "J",
            "code": "360200"
        }, {"name": "嘉兴市", "initials": "J", "code": "330400"}, {
            "name": "济源市",
            "initials": "J",
            "code": "419001"
        }, {"name": "金华市", "initials": "J", "code": "330700"}, {
            "name": "江门市",
            "initials": "J",
            "code": "440700"
        }, {"name": "济宁市", "initials": "J", "code": "370800"}, {
            "name": "吉安市",
            "initials": "J",
            "code": "360800"
        }, {"name": "鸡西市", "initials": "J", "code": "230300"}, {
            "name": "锦州市",
            "initials": "J",
            "code": "210700"
        }, {"name": "九江市", "initials": "J", "code": "360400"}, {"name": "晋中市", "initials": "J", "code": "140700"}],
        "K": [{"name": "克孜勒苏柯尔克孜自治州", "initials": "K", "code": "653000"}, {
            "name": "喀什地区",
            "initials": "K",
            "code": "653100"
        }, {"name": "可克达拉市", "initials": "K", "code": "659008"}, {
            "name": "昆玉市",
            "initials": "K",
            "code": "659009"
        }, {"name": "开封市", "initials": "K", "code": "410200"}, {
            "name": "昆明市",
            "initials": "K",
            "code": "530100"
        }, {"name": "克拉玛依市", "initials": "K", "code": "650200"}],
        "L": [{"name": "泸州市", "initials": "L", "code": "510500"}, {
            "name": "临汾市",
            "initials": "L",
            "code": "141000"
        }, {"name": "连云港市", "initials": "L", "code": "320700"}, {
            "name": "辽阳市",
            "initials": "L",
            "code": "211000"
        }, {"name": "辽源市", "initials": "L", "code": "220400"}, {
            "name": "临沂市",
            "initials": "L",
            "code": "371300"
        }, {"name": "六安市", "initials": "L", "code": "341500"}, {
            "name": "临高县",
            "initials": "L",
            "code": "469024"
        }, {"name": "丽江市", "initials": "L", "code": "530700"}, {
            "name": "丽水市",
            "initials": "L",
            "code": "331100"
        }, {"name": "廊坊市", "initials": "L", "code": "131000"}, {
            "name": "洛阳市",
            "initials": "L",
            "code": "410300"
        }, {"name": "聊城市", "initials": "L", "code": "371500"}, {
            "name": "乐东黎族自治县",
            "initials": "L",
            "code": "469027"
        }, {"name": "六盘水市", "initials": "L", "code": "520200"}, {
            "name": "乐山市",
            "initials": "L",
            "code": "511100"
        }, {"name": "凉山彝族自治州", "initials": "L", "code": "513400"}, {
            "name": "漯河市",
            "initials": "L",
            "code": "411100"
        }, {"name": "陵水黎族自治县", "initials": "L", "code": "469028"}, {
            "name": "柳州市",
            "initials": "L",
            "code": "450200"
        }, {"name": "娄底市", "initials": "L", "code": "431300"}, {
            "name": "临夏回族自治州",
            "initials": "L",
            "code": "622900"
        }, {"name": "兰州市", "initials": "L", "code": "620100"}, {
            "name": "来宾市",
            "initials": "L",
            "code": "451300"
        }, {"name": "陇南市", "initials": "L", "code": "621200"}, {
            "name": "林芝市",
            "initials": "L",
            "code": "540400"
        }, {"name": "龙岩市", "initials": "L", "code": "350800"}, {
            "name": "吕梁市",
            "initials": "L",
            "code": "141100"
        }, {"name": "临沧市", "initials": "L", "code": "530900"}, {"name": "拉萨市", "initials": "L", "code": "540100"}],
        "M": [{"name": "眉山市", "initials": "M", "code": "511400"}, {
            "name": "牡丹江市",
            "initials": "M",
            "code": "231000"
        }, {"name": "绵阳市", "initials": "M", "code": "510700"}, {
            "name": "茂名市",
            "initials": "M",
            "code": "440900"
        }, {"name": "澳门特别行政区", "initials": "M", "code": "820000"}, {
            "name": "马鞍山市",
            "initials": "M",
            "code": "340500"
        }, {"name": "梅州市", "initials": "M", "code": "441400"}],
        "N": [{"name": "南阳市", "initials": "N", "code": "411300"}, {
            "name": "宁波市",
            "initials": "N",
            "code": "330200"
        }, {"name": "南平市", "initials": "N", "code": "350700"}, {
            "name": "南京市",
            "initials": "N",
            "code": "320100"
        }, {"name": "宁德市", "initials": "N", "code": "350900"}, {
            "name": "南充市",
            "initials": "N",
            "code": "511300"
        }, {"name": "那曲市", "initials": "N", "code": "540600"}, {
            "name": "南通市",
            "initials": "N",
            "code": "320600"
        }, {"name": "怒江傈僳族自治州", "initials": "N", "code": "533300"}, {
            "name": "阿里地区",
            "initials": "N",
            "code": "542500"
        }, {"name": "南昌市", "initials": "N", "code": "360100"}, {
            "name": "南宁市",
            "initials": "N",
            "code": "450100"
        }, {"name": "内江市", "initials": "N", "code": "511000"}],
        "O": [{"name": "鄂尔多斯市", "initials": "O", "code": "150600"}],
        "P": [{"name": "平顶山市", "initials": "P", "code": "410400"}, {
            "name": "盘锦市",
            "initials": "P",
            "code": "211100"
        }, {"name": "普洱市", "initials": "P", "code": "530800"}, {
            "name": "濮阳市",
            "initials": "P",
            "code": "410900"
        }, {"name": "萍乡市", "initials": "P", "code": "360300"}, {
            "name": "攀枝花市",
            "initials": "P",
            "code": "510400"
        }, {"name": "平凉市", "initials": "P", "code": "620800"}, {"name": "莆田市", "initials": "P", "code": "350300"}],
        "Q": [{"name": "昌都市", "initials": "Q", "code": "540300"}, {
            "name": "衢州市",
            "initials": "Q",
            "code": "330800"
        }, {"name": "钦州市", "initials": "Q", "code": "450700"}, {
            "name": "清远市",
            "initials": "Q",
            "code": "441800"
        }, {"name": "黔南布依族苗族自治州", "initials": "Q", "code": "522700"}, {
            "name": "塔城地区",
            "initials": "Q",
            "code": "654200"
        }, {"name": "黔东南苗族侗族自治州", "initials": "Q", "code": "522600"}, {
            "name": "曲靖市",
            "initials": "Q",
            "code": "530300"
        }, {"name": "潜江市", "initials": "Q", "code": "429005"}, {
            "name": "琼中黎族苗族自治县",
            "initials": "Q",
            "code": "469030"
        }, {"name": "庆阳市", "initials": "Q", "code": "621000"}, {
            "name": "泉州市",
            "initials": "Q",
            "code": "350500"
        }, {"name": "琼海市", "initials": "Q", "code": "469002"}, {
            "name": "秦皇岛市",
            "initials": "Q",
            "code": "130300"
        }, {"name": "七台河市", "initials": "Q", "code": "230900"}, {
            "name": "齐齐哈尔市",
            "initials": "Q",
            "code": "230200"
        }, {"name": "青岛市", "initials": "Q", "code": "370200"}, {
            "name": "黔西南布依族苗族自治州",
            "initials": "Q",
            "code": "522300"
        }],
        "R": [{"name": "日喀则市", "initials": "R", "code": "540200"}, {"name": "日照市", "initials": "R", "code": "371100"}],
        "S": [{"name": "松原市", "initials": "S", "code": "220700"}, {
            "name": "绍兴市",
            "initials": "S",
            "code": "330600"
        }, {"name": "汕头市", "initials": "S", "code": "440500"}, {
            "name": "商丘市",
            "initials": "S",
            "code": "411400"
        }, {"name": "商洛市", "initials": "S", "code": "611000"}, {
            "name": "邵阳市",
            "initials": "S",
            "code": "430500"
        }, {"name": "韶关市", "initials": "S", "code": "440200"}, {
            "name": "石河子市",
            "initials": "S",
            "code": "659001"
        }, {"name": "三明市", "initials": "S", "code": "350400"}, {
            "name": "苏州市",
            "initials": "S",
            "code": "320500"
        }, {"name": "绥化市", "initials": "S", "code": "231200"}, {
            "name": "汕尾市",
            "initials": "S",
            "code": "441500"
        }, {"name": "上海市", "initials": "S", "code": "310100"}, {
            "name": "上饶市",
            "initials": "S",
            "code": "361100"
        }, {"name": "双河市", "initials": "S", "code": "659007"}, {
            "name": "遂宁市",
            "initials": "S",
            "code": "510900"
        }, {"name": "十堰市", "initials": "S", "code": "420300"}, {
            "name": "三亚市",
            "initials": "S",
            "code": "460200"
        }, {"name": "双鸭山市", "initials": "S", "code": "230500"}, {
            "name": "朔州市",
            "initials": "S",
            "code": "140600"
        }, {"name": "石嘴山市", "initials": "S", "code": "640200"}, {
            "name": "深圳市",
            "initials": "S",
            "code": "440300"
        }, {"name": "石家庄市", "initials": "S", "code": "130100"}, {
            "name": "四平市",
            "initials": "S",
            "code": "220300"
        }, {"name": "三沙市", "initials": "S", "code": "460300"}, {
            "name": "宿州市",
            "initials": "S",
            "code": "341300"
        }, {"name": "三门峡市", "initials": "S", "code": "411200"}, {
            "name": "神农架林区",
            "initials": "S",
            "code": "429021"
        }, {"name": "沈阳市", "initials": "S", "code": "210100"}, {
            "name": "宿迁市",
            "initials": "S",
            "code": "321300"
        }, {"name": "随州市", "initials": "S", "code": "421300"}, {"name": "山南市", "initials": "S", "code": "540500"}],
        "T": [{"name": "吐鲁番市", "initials": "T", "code": "650400"}, {
            "name": "屯昌县",
            "initials": "T",
            "code": "469022"
        }, {"name": "铜陵市", "initials": "T", "code": "340700"}, {
            "name": "通辽市",
            "initials": "T",
            "code": "150500"
        }, {"name": "铜仁市", "initials": "T", "code": "520600"}, {
            "name": "泰安市",
            "initials": "T",
            "code": "370900"
        }, {"name": "图木舒克市", "initials": "T", "code": "659003"}, {
            "name": "通化市",
            "initials": "T",
            "code": "220500"
        }, {"name": "铁门关市", "initials": "T", "code": "659006"}, {
            "name": "太原市",
            "initials": "T",
            "code": "140100"
        }, {"name": "天津市", "initials": "T", "code": "120100"}, {
            "name": "泰州市",
            "initials": "T",
            "code": "321200"
        }, {"name": "台湾省", "initials": "T", "code": "710000"}, {
            "name": "天水市",
            "initials": "T",
            "code": "620500"
        }, {"name": "铁岭市", "initials": "T", "code": "211200"}, {
            "name": "天门市",
            "initials": "T",
            "code": "429006"
        }, {"name": "铜川市", "initials": "T", "code": "610200"}, {
            "name": "台州市",
            "initials": "T",
            "code": "331000"
        }, {"name": "唐山市", "initials": "T", "code": "130200"}],
        "U": [{"name": "乌兰察布市", "initials": "U", "code": "150900"}, {
            "name": "乌鲁木齐市",
            "initials": "U",
            "code": "650100"
        }],
        "W": [{"name": "渭南市", "initials": "W", "code": "610500"}, {
            "name": "潍坊市",
            "initials": "W",
            "code": "370700"
        }, {"name": "武威市", "initials": "W", "code": "620600"}, {
            "name": "五家渠市",
            "initials": "W",
            "code": "659004"
        }, {"name": "乌海市", "initials": "W", "code": "150300"}, {
            "name": "文山壮族苗族自治州",
            "initials": "W",
            "code": "532600"
        }, {"name": "武汉市", "initials": "W", "code": "420100"}, {
            "name": "威海市",
            "initials": "W",
            "code": "371000"
        }, {"name": "芜湖市", "initials": "W", "code": "340200"}, {
            "name": "梧州市",
            "initials": "W",
            "code": "450400"
        }, {"name": "五指山市", "initials": "W", "code": "469001"}, {
            "name": "吴忠市",
            "initials": "W",
            "code": "640300"
        }, {"name": "温州市", "initials": "W", "code": "330300"}, {
            "name": "无锡市",
            "initials": "W",
            "code": "320200"
        }, {"name": "文昌市", "initials": "W", "code": "469005"}, {"name": "万宁市", "initials": "W", "code": "469006"}],
        "X": [{"name": "西安市", "initials": "X", "code": "610100"}, {
            "name": "湘潭市",
            "initials": "X",
            "code": "430300"
        }, {"name": "许昌市", "initials": "X", "code": "411000"}, {
            "name": "锡林郭勒盟",
            "initials": "X",
            "code": "152500"
        }, {"name": "徐州市", "initials": "X", "code": "320300"}, {
            "name": "忻州市",
            "initials": "X",
            "code": "140900"
        }, {"name": "邢台市", "initials": "X", "code": "130500"}, {
            "name": "咸阳市",
            "initials": "X",
            "code": "610400"
        }, {"name": "仙桃市", "initials": "X", "code": "429004"}, {
            "name": "宣城市",
            "initials": "X",
            "code": "341800"
        }, {"name": "咸宁市", "initials": "X", "code": "421200"}, {
            "name": "西宁市",
            "initials": "X",
            "code": "630100"
        }, {"name": "新乡市", "initials": "X", "code": "410700"}, {
            "name": "厦门市",
            "initials": "X",
            "code": "350200"
        }, {"name": "襄阳市", "initials": "X", "code": "420600"}, {
            "name": "孝感市",
            "initials": "X",
            "code": "420900"
        }, {"name": "西双版纳傣族自治州", "initials": "X", "code": "532800"}, {
            "name": "信阳市",
            "initials": "X",
            "code": "411500"
        }, {"name": "湘西土家族苗族自治州", "initials": "X", "code": "433100"}, {
            "name": "新余市",
            "initials": "X",
            "code": "360500"
        }],
        "Y": [{"name": "岳阳市", "initials": "Y", "code": "430600"}, {
            "name": "玉溪市",
            "initials": "Y",
            "code": "530400"
        }, {"name": "盐城市", "initials": "Y", "code": "320900"}, {
            "name": "鹰潭市",
            "initials": "Y",
            "code": "360600"
        }, {"name": "延边朝鲜族自治州", "initials": "Y", "code": "222400"}, {
            "name": "宜昌市",
            "initials": "Y",
            "code": "420500"
        }, {"name": "雅安市", "initials": "Y", "code": "511800"}, {
            "name": "银川市",
            "initials": "Y",
            "code": "640100"
        }, {"name": "营口市", "initials": "Y", "code": "210800"}, {
            "name": "烟台市",
            "initials": "Y",
            "code": "370600"
        }, {"name": "阳泉市", "initials": "Y", "code": "140300"}, {
            "name": "伊春市",
            "initials": "Y",
            "code": "230700"
        }, {"name": "宜宾市", "initials": "Y", "code": "511500"}, {
            "name": "运城市",
            "initials": "Y",
            "code": "140800"
        }, {"name": "云浮市", "initials": "Y", "code": "445300"}, {
            "name": "延安市",
            "initials": "Y",
            "code": "610600"
        }, {"name": "宜春市", "initials": "Y", "code": "360900"}, {
            "name": "益阳市",
            "initials": "Y",
            "code": "430900"
        }, {"name": "扬州市", "initials": "Y", "code": "321000"}, {
            "name": "永州市",
            "initials": "Y",
            "code": "431100"
        }, {"name": "榆林市", "initials": "Y", "code": "610800"}, {
            "name": "玉林市",
            "initials": "Y",
            "code": "450900"
        }, {"name": "玉树藏族自治州", "initials": "Y", "code": "632700"}, {"name": "阳江市", "initials": "Y", "code": "441700"}],
        "Z": [{"name": "郑州市", "initials": "Z", "code": "410100"}, {
            "name": "镇江市",
            "initials": "Z",
            "code": "321100"
        }, {"name": "中卫市", "initials": "Z", "code": "640500"}, {
            "name": "张家界市",
            "initials": "Z",
            "code": "430800"
        }, {"name": "自贡市", "initials": "Z", "code": "510300"}, {
            "name": "张掖市",
            "initials": "Z",
            "code": "620700"
        }, {"name": "淄博市", "initials": "Z", "code": "370300"}, {
            "name": "漳州市",
            "initials": "Z",
            "code": "350600"
        }, {"name": "株洲市", "initials": "Z", "code": "430200"}, {
            "name": "张家口市",
            "initials": "Z",
            "code": "130700"
        }, {"name": "舟山市", "initials": "Z", "code": "330900"}, {
            "name": "驻马店市",
            "initials": "Z",
            "code": "411700"
        }, {"name": "昭通市", "initials": "Z", "code": "530600"}, {
            "name": "资阳市",
            "initials": "Z",
            "code": "512000"
        }, {"name": "遵义市", "initials": "Z", "code": "520300"}, {
            "name": "周口市",
            "initials": "Z",
            "code": "411600"
        }, {"name": "中山市", "initials": "Z", "code": "442000"}, {
            "name": "枣庄市",
            "initials": "Z",
            "code": "370400"
        }, {"name": "湛江市", "initials": "Z", "code": "440800"}, {
            "name": "珠海市",
            "initials": "Z",
            "code": "440400"
        }, {"name": "肇庆市", "initials": "Z", "code": "441200"}]
    };
    return city;
})();