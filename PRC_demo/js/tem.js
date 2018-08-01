 require.config({  
            paths: {  
                echarts: 'dist'  
            }  
        });  
  
        // 使用  
        require(  
            [  
                'echarts',
                'echarts/chart/map',  // 使用柱状图就加载bar模块，按需加载
                'echarts/chart/scatter'
            ],  
            function(ec) { 
                // 基于准备好的dom，初始化echarts图表  
                var myChart = ec.init(document.getElementById('main'));  
                var ecConfig = require('echarts/config');  
		      //  var zrEvent = require('zrender/tool/event');  
                var curIndx = 0;  
               
              
                var mapGeoData = require('echarts/util/mapData/params');  
                
                for(var city in cityMap) {  
                    mapType.push(city);  //{city:postcode...[key:value]}
                    // 自定义扩展图表类型  
                    mapGeoData.params[city] = {  
                        getGeoJson: (function(c) {  
                            var geoJsonName = cityMap[c];  
                            return function(callback) {  
                                $.getJSON('geoJson/china-main-city/' + geoJsonName + '.json', callback);  
                            }  
                        })(city)  
                    }  
                } 
                //地图选择事件
                myChart.on(ecConfig.EVENT.MAP_SELECTED, function(param) {  
                    var len = mapType.length;  
                    var mt = param.target;  
                    var f = false;  
                    for(var i = 0; i < len; i++) {  
                        if(mt == mapType[i]) {  
                            f = true;  
                            mt = mapType[i];  
                        }  
                    }  
                    if(!f) {  
                        mt = 'china';  
                        option.title.text = "全国地图";  
                    }else{  
                        option.title.text = mt+"地图";  
                    }  
                    option.tooltip.trigger = 'item';  
                    option.series[0].mapType = mt;                    
                    myChart.setOption(option, true);  
                });  
                
                option = {  
                    title: {  
                        text: '全国地图',  
                        x: 'center'  
                    },  
                    tooltip: {  
                        trigger: 'item'  
                    },  
                    legend: {  
                        orient: 'vertical',  
                        x: 'left',  
                        data: ['农残'],  
                    },  
  
                    //数据范围栏
                    dataRange: {  
                        x: 'left',  
                        y: 'bottom',  
                        splitList: [{  
                            start: 100  
                        }, {  
                            start: 85,  
                            end: 100  
                        }, {  
                            start: 65,  
                            end: 85  
                        }, {  
                            start: 45,  
                            end: 65  
                        }, {  
                            start: 25,  
                            end: 45,  
                        }, {  
                            start: 25,  
                            end: 5,  
                        }, {  
                            end: 5  
                        }],  
                        color: ['#D3776C', '#E19E81', '#FBE8A4']  
                    },  
                    toolbox: {  
                        show: true,  
                        orient: 'vertical',  
                        x: 'right',  
                        y: 'center',  
                    }, 
                   /* xAxis : [
                        {
                            type : 'value',
                            show:false,
                            min:55,
                            max:153
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            show:false,
                            min:23,
                            max:50
                        }
                    ],*/
                    animation: false,

                    series: [{  
                        name: '环境承载',  
                        type: 'map',  
                        mapType: 'china',  
                        selectedMode: 'single',  
                        itemStyle: {  
                            normal: {  
                                label: {  
                                    show: true,  
                                    textStyle: {  
                                        color: "rgb(249, 249, 249)"  
                                    }  
                                },  
                            },  
                            emphasis: { label: { show: true } },  
                        }, 
                        data: [  
                            { name: '湖南', value: Math.round(Math.random() * 100) },  
                            { name: '湖北', value: Math.round(Math.random() * 100) },  
                            { name: '广东', value: Math.round(Math.random() * 100) },  
                            { name: '青海', value: Math.round(Math.random() * 100) },  
                            { name: '四川', value: Math.round(Math.random() * 100) },  
                            { name: '海南', value: Math.round(Math.random() * 100) },  
                            { name: '陕西', value: Math.round(Math.random() * 100) },  
                            { name: '甘肃', value: Math.round(Math.random() * 100) },  
                            { name: '云南', value: Math.round(Math.random() * 100) },  
                            { name: '黑龙江', value: Math.round(Math.random() * 100) },  
                            { name: '贵州', value: Math.round(Math.random() * 100) },  
                            { name: '山东', value: Math.round(Math.random() * 100) },  
                            { name: '江西', value: Math.round(Math.random() * 100) },  
                            { name: '河南', value: Math.round(Math.random() * 100) },  
                            { name: '河北', value: Math.round(Math.random() * 100) },  
                            { name: '山西', value: Math.round(Math.random() * 100) },  
                            { name: '安徽', value: Math.round(Math.random() * 100) },  
                            { name: '福建', value: Math.round(Math.random() * 100) },  
                            { name: '浙江', value: Math.round(Math.random() * 100) },  
                            { name: '江苏', value: Math.round(Math.random() * 100) },  
                            { name: '吉林', value: Math.round(Math.random() * 100) },  
                            { name: '辽宁', value: Math.round(Math.random() * 100) },  
                            { name: '台湾', value: Math.round(Math.random() * 100) },  
                            { name: '新疆', value: Math.round(Math.random() * 100) },  
                            { name: '广西', value: Math.round(Math.random() * 100) },  
                            { name: '宁夏', value: Math.round(Math.random() * 100) },       
                            { name: '内蒙古', value: Math.round(Math.random() * 100) },  
                            { name: '西藏', value: Math.round(Math.random() * 100) },  
                            { name: '北京', value: Math.round(Math.random() * 100) },  
                            { name: '天津', value: Math.round(Math.random() * 100) },  
                            { name: '重庆', value: Math.round(Math.random() * 100) },   
                            { name: '上海', value: Math.round(Math.random() * 100) },  
                            { name: '广州', value: Math.round(Math.random() * 100) },  
                            { name: '重庆市', value: Math.round(Math.random() * 100) },  
                            { name: '北京市', value: Math.round(Math.random() * 100) },  
                            { name: '天津市', value: Math.round(Math.random() * 100) },  
                            { name: '上海市', value: Math.round(Math.random() * 100) },  
                            { name: '香港', value: Math.round(Math.random() * 100) },  
                            { name: '澳门', value: Math.round(Math.random() * 100) },  
                            { name: '巴音郭楞蒙古自治州', value: Math.round(Math.random() * 100) },  
                            { name: '和田地区', value: Math.round(Math.random() * 100) },  
                            { name: '哈密地区', value: Math.round(Math.random() * 100) },  
                            { name: '阿克苏地区', value: Math.round(Math.random() * 100) },  
                            { name: '阿勒泰地区', value: Math.round(Math.random() * 100) },  
                            { name: '喀什地区', value: Math.round(Math.random() * 100) },  
                            { name: '塔城地区', value: Math.round(Math.random() * 100) },  
                            { name: '昌吉回族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '克孜勒苏柯尔克孜自治州', value: Math.round(Math.random() * 100) },  
                            { name: '吐鲁番地区', value: Math.round(Math.random() * 100) },  
                            { name: '伊犁哈萨克自治州', value: Math.round(Math.random() * 100) },  
                            { name: '博尔塔拉蒙古自治州', value: Math.round(Math.random() * 100) },  
                            { name: '乌鲁木齐市', value: Math.round(Math.random() * 100) },  
                            { name: '克拉玛依市', value: Math.round(Math.random() * 100) },  
                            { name: '阿拉尔市', value: Math.round(Math.random() * 100) },  
                            { name: '图木舒克市', value: Math.round(Math.random() * 100) },  
                            { name: '五家渠市', value: Math.round(Math.random() * 100) },  
                            { name: '石河子市', value: Math.round(Math.random() * 100) },  
                            { name: '那曲地区', value: Math.round(Math.random() * 100) },  
                            { name: '阿里地区', value: Math.round(Math.random() * 100) },  
                            { name: '日喀则地区', value: Math.round(Math.random() * 100) },  
                            { name: '林芝地区', value: Math.round(Math.random() * 100) },  
                            { name: '昌都地区', value: Math.round(Math.random() * 100) },  
                            { name: '山南地区', value: Math.round(Math.random() * 100) },  
                            { name: '拉萨市', value: Math.round(Math.random() * 100) },  
                            { name: '呼伦贝尔市', value: Math.round(Math.random() * 100) },  
                            { name: '阿拉善盟', value: Math.round(Math.random() * 100) },  
                            { name: '锡林郭勒盟', value: Math.round(Math.random() * 100) },  
                            { name: '鄂尔多斯市', value: Math.round(Math.random() * 100) },  
                            { name: '赤峰市', value: Math.round(Math.random() * 100) },  
                            { name: '巴彦淖尔市', value: Math.round(Math.random() * 100) },  
                            { name: '通辽市', value: Math.round(Math.random() * 100) },  
                            { name: '乌兰察布市', value: Math.round(Math.random() * 100) },  
                            { name: '兴安盟', value: Math.round(Math.random() * 100) },  
                            { name: '包头市', value: Math.round(Math.random() * 100) },  
                            { name: '呼和浩特市', value: Math.round(Math.random() * 100) },  
                            { name: '乌海市', value: Math.round(Math.random() * 100) },  
                            { name: '海西蒙古族藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '玉树藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '果洛藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '海南藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '海北藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '黄南藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '海东地区', value: Math.round(Math.random() * 100) },  
                            { name: '西宁市', value: Math.round(Math.random() * 100) },  
                            { name: '甘孜藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '阿坝藏族羌族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '凉山彝族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '绵阳市', value: Math.round(Math.random() * 100) },  
                            { name: '达州市', value: Math.round(Math.random() * 100) },  
                            { name: '广元市', value: Math.round(Math.random() * 100) },  
                            { name: '雅安市', value: Math.round(Math.random() * 100) },  
                            { name: '宜宾市', value: Math.round(Math.random() * 100) },  
                            { name: '乐山市', value: Math.round(Math.random() * 100) },  
                            { name: '南充市', value: Math.round(Math.random() * 100) },  
                            { name: '巴中市', value: Math.round(Math.random() * 100) },  
                            { name: '泸州市', value: Math.round(Math.random() * 100) },  
                            { name: '成都市', value: Math.round(Math.random() * 100) },  
                            { name: '资阳市', value: Math.round(Math.random() * 100) },  
                            { name: '攀枝花市', value: Math.round(Math.random() * 100) },  
                            { name: '眉山市', value: Math.round(Math.random() * 100) },  
                            { name: '广安市', value: Math.round(Math.random() * 100) },  
                            { name: '德阳市', value: Math.round(Math.random() * 100) },  
                            { name: '内江市', value: Math.round(Math.random() * 100) },  
                            { name: '遂宁市', value: Math.round(Math.random() * 100) },  
                            { name: '自贡市', value: Math.round(Math.random() * 100) },  
                            { name: '黑河市', value: Math.round(Math.random() * 100) },  
                            { name: '大兴安岭地区', value: Math.round(Math.random() * 100) },  
                            { name: '哈尔滨市', value: Math.round(Math.random() * 100) },  
                            { name: '齐齐哈尔市', value: Math.round(Math.random() * 100) },  
                            { name: '牡丹江市', value: Math.round(Math.random() * 100) },  
                            { name: '绥化市', value: Math.round(Math.random() * 100) },  
                            { name: '伊春市', value: Math.round(Math.random() * 100) },  
                            { name: '佳木斯市', value: Math.round(Math.random() * 100) },  
                            { name: '鸡西市', value: Math.round(Math.random() * 100) },  
                            { name: '双鸭山市', value: Math.round(Math.random() * 100) },  
                            { name: '大庆市', value: Math.round(Math.random() * 100) },  
                            { name: '鹤岗市', value: Math.round(Math.random() * 100) },  
                            { name: '七台河市', value: Math.round(Math.random() * 100) },  
                            { name: '酒泉市', value: Math.round(Math.random() * 100) },  
                            { name: '张掖市', value: Math.round(Math.random() * 100) },  
                            { name: '甘南藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '武威市', value: Math.round(Math.random() * 100) },  
                            { name: '陇南市', value: Math.round(Math.random() * 100) },  
                            { name: '庆阳市', value: Math.round(Math.random() * 100) },  
                            { name: '白银市', value: Math.round(Math.random() * 100) },  
                            { name: '定西市', value: Math.round(Math.random() * 100) },  
                            { name: '天水市', value: Math.round(Math.random() * 100) },  
                            { name: '兰州市', value: Math.round(Math.random() * 100) },  
                            { name: '平凉市', value: Math.round(Math.random() * 100) },  
                            { name: '临夏回族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '金昌市', value: Math.round(Math.random() * 100) },  
                            { name: '嘉峪关市', value: Math.round(Math.random() * 100) },  
                            { name: '普洱市', value: Math.round(Math.random() * 100) },  
                            { name: '红河哈尼族彝族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '文山壮族苗族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '曲靖市', value: Math.round(Math.random() * 100) },  
                            { name: '楚雄彝族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '大理白族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '临沧市', value: Math.round(Math.random() * 100) },  
                            { name: '迪庆藏族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '昭通市', value: Math.round(Math.random() * 100) },  
                            { name: '昆明市', value: Math.round(Math.random() * 100) },  
                            { name: '丽江市', value: Math.round(Math.random() * 100) },  
                            { name: '西双版纳傣族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '保山市', value: Math.round(Math.random() * 100) },  
                            { name: '玉溪市', value: Math.round(Math.random() * 100) },  
                            { name: '怒江傈僳族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '德宏傣族景颇族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '百色市', value: Math.round(Math.random() * 100) },  
                            { name: '河池市', value: Math.round(Math.random() * 100) },  
                            { name: '桂林市', value: Math.round(Math.random() * 100) },  
                            { name: '南宁市', value: Math.round(Math.random() * 100) },  
                            { name: '柳州市', value: Math.round(Math.random() * 100) },  
                            { name: '崇左市', value: Math.round(Math.random() * 100) },  
                            { name: '来宾市', value: Math.round(Math.random() * 100) },  
                            { name: '玉林市', value: Math.round(Math.random() * 100) },  
                            { name: '梧州市', value: Math.round(Math.random() * 100) },  
                            { name: '贺州市', value: Math.round(Math.random() * 100) },  
                            { name: '钦州市', value: Math.round(Math.random() * 100) },  
                            { name: '贵港市', value: Math.round(Math.random() * 100) },  
                            { name: '防城港市', value: Math.round(Math.random() * 100) },  
                            { name: '北海市', value: Math.round(Math.random() * 100) },  
                            { name: '怀化市', value: Math.round(Math.random() * 100) },  
                            { name: '永州市', value: Math.round(Math.random() * 100) },  
                            { name: '邵阳市', value: Math.round(Math.random() * 100) },  
                            { name: '郴州市', value: Math.round(Math.random() * 100) },  
                            { name: '常德市', value: Math.round(Math.random() * 100) },  
                            { name: '湘西土家族苗族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '衡阳市', value: Math.round(Math.random() * 100) },  
                            { name: '岳阳市', value: Math.round(Math.random() * 100) },  
                            { name: '益阳市', value: Math.round(Math.random() * 100) },  
                            { name: '长沙市', value: Math.round(Math.random() * 100) },  
                            { name: '株洲市', value: Math.round(Math.random() * 100) },  
                            { name: '张家界市', value: Math.round(Math.random() * 100) },  
                            { name: '娄底市', value: Math.round(Math.random() * 100) },  
                            { name: '湘潭市', value: Math.round(Math.random() * 100) },  
                            { name: '榆林市', value: Math.round(Math.random() * 100) },  
                            { name: '延安市', value: Math.round(Math.random() * 100) },  
                            { name: '汉中市', value: Math.round(Math.random() * 100) },  
                            { name: '安康市', value: Math.round(Math.random() * 100) },  
                            { name: '商洛市', value: Math.round(Math.random() * 100) },  
                            { name: '宝鸡市', value: Math.round(Math.random() * 100) },  
                            { name: '渭南市', value: Math.round(Math.random() * 100) },  
                            { name: '咸阳市', value: Math.round(Math.random() * 100) },  
                            { name: '西安市', value: Math.round(Math.random() * 100) },  
                            { name: '铜川市', value: Math.round(Math.random() * 100) },  
                            { name: '清远市', value: Math.round(Math.random() * 100) },  
                            { name: '韶关市', value: Math.round(Math.random() * 100) },  
                            { name: '湛江市', value: Math.round(Math.random() * 100) },  
                            { name: '梅州市', value: Math.round(Math.random() * 100) },  
                            { name: '河源市', value: Math.round(Math.random() * 100) },  
                            { name: '肇庆市', value: Math.round(Math.random() * 100) },  
                            { name: '惠州市', value: Math.round(Math.random() * 100) },  
                            { name: '茂名市', value: Math.round(Math.random() * 100) },  
                            { name: '江门市', value: Math.round(Math.random() * 100) },  
                            { name: '阳江市', value: Math.round(Math.random() * 100) },  
                            { name: '云浮市', value: Math.round(Math.random() * 100) },  
                            { name: '广州市', value: Math.round(Math.random() * 100) },  
                            { name: '汕尾市', value: Math.round(Math.random() * 100) },  
                            { name: '揭阳市', value: Math.round(Math.random() * 100) },  
                            { name: '珠海市', value: Math.round(Math.random() * 100) },  
                            { name: '佛山市', value: Math.round(Math.random() * 100) },  
                            { name: '潮州市', value: Math.round(Math.random() * 100) },  
                            { name: '汕头市', value: Math.round(Math.random() * 100) },  
                            { name: '深圳市', value: Math.round(Math.random() * 100) },  
                            { name: '东莞市', value: Math.round(Math.random() * 100) },  
                            { name: '中山市', value: Math.round(Math.random() * 100) },  
                            { name: '延边朝鲜族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '吉林市', value: Math.round(Math.random() * 100) },  
                            { name: '白城市', value: Math.round(Math.random() * 100) },  
                            { name: '松原市', value: Math.round(Math.random() * 100) },  
                            { name: '长春市', value: Math.round(Math.random() * 100) },  
                            { name: '白山市', value: Math.round(Math.random() * 100) },  
                            { name: '通化市', value: Math.round(Math.random() * 100) },  
                            { name: '四平市', value: Math.round(Math.random() * 100) },  
                            { name: '辽源市', value: Math.round(Math.random() * 100) },  
                            { name: '承德市', value: Math.round(Math.random() * 100) },  
                            { name: '张家口市', value: Math.round(Math.random() * 100) },  
                            { name: '保定市', value: Math.round(Math.random() * 100) },  
                            { name: '唐山市', value: Math.round(Math.random() * 100) },  
                            { name: '沧州市', value: Math.round(Math.random() * 100) },  
                            { name: '石家庄市', value: Math.round(Math.random() * 100) },  
                            { name: '邢台市', value: Math.round(Math.random() * 100) },  
                            { name: '邯郸市', value: Math.round(Math.random() * 100) },  
                            { name: '秦皇岛市', value: Math.round(Math.random() * 100) },  
                            { name: '衡水市', value: Math.round(Math.random() * 100) },  
                            { name: '廊坊市', value: Math.round(Math.random() * 100) },  
                            { name: '恩施土家族苗族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '十堰市', value: Math.round(Math.random() * 100) },  
                            { name: '宜昌市', value: Math.round(Math.random() * 100) },  
                            { name: '襄樊市', value: Math.round(Math.random() * 100) },  
                            { name: '黄冈市', value: Math.round(Math.random() * 100) },  
                            { name: '荆州市', value: Math.round(Math.random() * 100) },  
                            { name: '荆门市', value: Math.round(Math.random() * 100) },  
                            { name: '咸宁市', value: Math.round(Math.random() * 100) },  
                            { name: '随州市', value: Math.round(Math.random() * 100) },  
                            { name: '孝感市', value: Math.round(Math.random() * 100) },  
                            { name: '武汉市', value: Math.round(Math.random() * 100) },  
                            { name: '黄石市', value: Math.round(Math.random() * 100) },  
                            { name: '神农架林区', value: Math.round(Math.random() * 100) },  
                            { name: '天门市', value: Math.round(Math.random() * 100) },  
                            { name: '仙桃市', value: Math.round(Math.random() * 100) },  
                            { name: '潜江市', value: Math.round(Math.random() * 100) },  
                            { name: '鄂州市', value: Math.round(Math.random() * 100) },  
                            { name: '遵义市', value: Math.round(Math.random() * 100) },  
                            { name: '黔东南苗族侗族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '毕节地区', value: Math.round(Math.random() * 100) },  
                            { name: '黔南布依族苗族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '铜仁地区', value: Math.round(Math.random() * 100) },  
                            { name: '黔西南布依族苗族自治州', value: Math.round(Math.random() * 100) },  
                            { name: '六盘水市', value: Math.round(Math.random() * 100) },  
                            { name: '安顺市', value: Math.round(Math.random() * 100) },  
                            { name: '贵阳市', value: Math.round(Math.random() * 100) },  
                            { name: '烟台市', value: Math.round(Math.random() * 100) },  
                            { name: '临沂市', value: Math.round(Math.random() * 100) },  
                            { name: '潍坊市', value: Math.round(Math.random() * 100) },  
                            { name: '青岛市', value: Math.round(Math.random() * 100) },  
                            { name: '菏泽市', value: Math.round(Math.random() * 100) },  
                            { name: '济宁市', value: Math.round(Math.random() * 100) },  
                            { name: '德州市', value: Math.round(Math.random() * 100) },  
                            { name: '滨州市', value: Math.round(Math.random() * 100) },  
                            { name: '聊城市', value: Math.round(Math.random() * 100) },  
                            { name: '东营市', value: Math.round(Math.random() * 100) },  
                            { name: '济南市', value: Math.round(Math.random() * 100) },  
                            { name: '泰安市', value: Math.round(Math.random() * 100) },  
                            { name: '威海市', value: Math.round(Math.random() * 100) },  
                            { name: '日照市', value: Math.round(Math.random() * 100) },  
                            { name: '淄博市', value: Math.round(Math.random() * 100) },  
                            { name: '枣庄市', value: Math.round(Math.random() * 100) },  
                            { name: '莱芜市', value: Math.round(Math.random() * 100) },  
                            { name: '赣州市', value: Math.round(Math.random() * 100) },  
                            { name: '吉安市', value: Math.round(Math.random() * 100) },  
                            { name: '上饶市', value: Math.round(Math.random() * 100) },  
                            { name: '九江市', value: Math.round(Math.random() * 100) },  
                            { name: '抚州市', value: Math.round(Math.random() * 100) },  
                            { name: '宜春市', value: Math.round(Math.random() * 100) },  
                            { name: '南昌市', value: Math.round(Math.random() * 100) },  
                            { name: '景德镇市', value: Math.round(Math.random() * 100) },  
                            { name: '萍乡市', value: Math.round(Math.random() * 100) },  
                            { name: '鹰潭市', value: Math.round(Math.random() * 100) },  
                            { name: '新余市', value: Math.round(Math.random() * 100) },  
                            { name: '南阳市', value: Math.round(Math.random() * 100) },  
                            { name: '信阳市', value: Math.round(Math.random() * 100) },  
                            { name: '洛阳市', value: Math.round(Math.random() * 100) },  
                            { name: '驻马店市', value: Math.round(Math.random() * 100) },  
                            { name: '周口市', value: Math.round(Math.random() * 100) },  
                            { name: '商丘市', value: Math.round(Math.random() * 100) },  
                            { name: '三门峡市', value: Math.round(Math.random() * 100) },  
                            { name: '新乡市', value: Math.round(Math.random() * 100) },  
                            { name: '平顶山市', value: Math.round(Math.random() * 100) },  
                            { name: '郑州市', value: Math.round(Math.random() * 100) },  
                            { name: '安阳市', value: Math.round(Math.random() * 100) },  
                            { name: '开封市', value: Math.round(Math.random() * 100) },  
                            { name: '焦作市', value: Math.round(Math.random() * 100) },  
                            { name: '许昌市', value: Math.round(Math.random() * 100) },  
                            { name: '濮阳市', value: Math.round(Math.random() * 100) },  
                            { name: '漯河市', value: Math.round(Math.random() * 100) },  
                            { name: '鹤壁市', value: Math.round(Math.random() * 100) },  
                            { name: '大连市', value: Math.round(Math.random() * 100) },  
                            { name: '朝阳市', value: Math.round(Math.random() * 100) },  
                            { name: '丹东市', value: Math.round(Math.random() * 100) },  
                            { name: '铁岭市', value: Math.round(Math.random() * 100) },  
                            { name: '沈阳市', value: Math.round(Math.random() * 100) },  
                            { name: '抚顺市', value: Math.round(Math.random() * 100) },  
                            { name: '葫芦岛市', value: Math.round(Math.random() * 100) },  
                            { name: '阜新市', value: Math.round(Math.random() * 100) },  
                            { name: '锦州市', value: Math.round(Math.random() * 100) },  
                            { name: '鞍山市', value: Math.round(Math.random() * 100) },  
                            { name: '本溪市', value: Math.round(Math.random() * 100) },  
                            { name: '营口市', value: Math.round(Math.random() * 100) },  
                            { name: '辽阳市', value: Math.round(Math.random() * 100) },  
                            { name: '盘锦市', value: Math.round(Math.random() * 100) },  
                            { name: '忻州市', value: Math.round(Math.random() * 100) },  
                            { name: '吕梁市', value: Math.round(Math.random() * 100) },  
                            { name: '临汾市', value: Math.round(Math.random() * 100) },  
                            { name: '晋中市', value: Math.round(Math.random() * 100) },  
                            { name: '运城市', value: Math.round(Math.random() * 100) },  
                            { name: '大同市', value: Math.round(Math.random() * 100) },  
                            { name: '长治市', value: Math.round(Math.random() * 100) },  
                            { name: '朔州市', value: Math.round(Math.random() * 100) },  
                            { name: '晋城市', value: Math.round(Math.random() * 100) },  
                            { name: '太原市', value: Math.round(Math.random() * 100) },  
                            { name: '阳泉市', value: Math.round(Math.random() * 100) },  
                            { name: '六安市', value: Math.round(Math.random() * 100) },  
                            { name: '安庆市', value: Math.round(Math.random() * 100) },  
                            { name: '滁州市', value: Math.round(Math.random() * 100) },  
                            { name: '宣城市', value: Math.round(Math.random() * 100) },  
                            { name: '阜阳市', value: Math.round(Math.random() * 100) },  
                            { name: '宿州市', value: Math.round(Math.random() * 100) },  
                            { name: '黄山市', value: Math.round(Math.random() * 100) },  
                            { name: '巢湖市', value: Math.round(Math.random() * 100) },  
                            { name: '亳州市', value: Math.round(Math.random() * 100) },  
                            { name: '池州市', value: Math.round(Math.random() * 100) },  
                            { name: '合肥市', value: Math.round(Math.random() * 100) },  
                            { name: '蚌埠市', value: Math.round(Math.random() * 100) },  
                            { name: '芜湖市', value: Math.round(Math.random() * 100) },  
                            { name: '淮北市', value: Math.round(Math.random() * 100) },  
                            { name: '淮南市', value: Math.round(Math.random() * 100) },  
                            { name: '马鞍山市', value: Math.round(Math.random() * 100) },  
                            { name: '铜陵市', value: Math.round(Math.random() * 100) },  
                            { name: '南平市', value: Math.round(Math.random() * 100) },  
                            { name: '三明市', value: Math.round(Math.random() * 100) },  
                            { name: '龙岩市', value: Math.round(Math.random() * 100) },  
                            { name: '宁德市', value: Math.round(Math.random() * 100) },  
                            { name: '福州市', value: Math.round(Math.random() * 100) },  
                            { name: '漳州市', value: Math.round(Math.random() * 100) },  
                            { name: '泉州市', value: Math.round(Math.random() * 100) },  
                            { name: '莆田市', value: Math.round(Math.random() * 100) },  
                            { name: '厦门市', value: Math.round(Math.random() * 100) },  
                            { name: '丽水市', value: Math.round(Math.random() * 100) },  
                            { name: '杭州市', value: Math.round(Math.random() * 100) },  
                            { name: '温州市', value: Math.round(Math.random() * 100) },  
                            { name: '宁波市', value: Math.round(Math.random() * 100) },  
                            { name: '舟山市', value: Math.round(Math.random() * 100) },  
                            { name: '台州市', value: Math.round(Math.random() * 100) },  
                            { name: '金华市', value: Math.round(Math.random() * 100) },  
                            { name: '衢州市', value: Math.round(Math.random() * 100) },  
                            { name: '绍兴市', value: Math.round(Math.random() * 100) },  
                            { name: '嘉兴市', value: Math.round(Math.random() * 100) },  
                            { name: '湖州市', value: Math.round(Math.random() * 100) },  
                            { name: '盐城市', value: Math.round(Math.random() * 100) },  
                            { name: '徐州市', value: Math.round(Math.random() * 100) },  
                            { name: '南通市', value: Math.round(Math.random() * 100) },  
                            { name: '淮安市', value: Math.round(Math.random() * 100) },  
                            { name: '苏州市', value: Math.round(Math.random() * 100) },  
                            { name: '宿迁市', value: Math.round(Math.random() * 100) },  
                            { name: '连云港市', value: Math.round(Math.random() * 100) },  
                            { name: '扬州市', value: Math.round(Math.random() * 100) },  
                            { name: '南京市', value: Math.round(Math.random() * 100) },  
                            { name: '泰州市', value: Math.round(Math.random() * 100) },  
                            { name: '无锡市', value: Math.round(Math.random() * 100) },  
                            { name: '常州市', value: Math.round(Math.random() * 100) },  
                            { name: '镇江市', value: Math.round(Math.random() * 100) },  
                            { name: '吴忠市', value: Math.round(Math.random() * 100) },  
                            { name: '中卫市', value: Math.round(Math.random() * 100) },  
                            { name: '固原市', value: Math.round(Math.random() * 100) },  
                            { name: '银川市', value: Math.round(Math.random() * 100) },  
                            { name: '石嘴山市', value: Math.round(Math.random() * 100) },  
                            { name: '儋州市', value: Math.round(Math.random() * 100) },  
                            { name: '文昌市', value: Math.round(Math.random() * 100) },  
                            { name: '乐东黎族自治县', value: Math.round(Math.random() * 100) },  
                            { name: '三亚市', value: Math.round(Math.random() * 100) },  
                            { name: '琼中黎族苗族自治县', value: Math.round(Math.random() * 100) },  
                            { name: '东方市', value: Math.round(Math.random() * 100) },  
                            { name: '海口市', value: Math.round(Math.random() * 100) },  
                            { name: '万宁市', value: Math.round(Math.random() * 100) },  
                            { name: '澄迈县', value: Math.round(Math.random() * 100) },  
                            { name: '白沙黎族自治县', value: Math.round(Math.random() * 100) },  
                            { name: '琼海市', value: Math.round(Math.random() * 100) },  
                            { name: '昌江黎族自治县', value: Math.round(Math.random() * 100) },  
                            { name: '临高县', value: Math.round(Math.random() * 100) },  
                            { name: '陵水黎族自治县', value: Math.round(Math.random() * 100) },  
                            { name: '屯昌县', value: Math.round(Math.random() * 100) },  
                            { name: '定安县', value: Math.round(Math.random() * 100) },  
                            { name: '保亭黎族苗族自治县', value: Math.round(Math.random() * 100) },  
                            { name: '五指山市', value: Math.round(Math.random() * 100) },  
                            { name: '长沙县', value: Math.round(Math.random() * 100) },  
                            { name: '宁乡县', value: Math.round(Math.random() * 100) },  
                            { name: '浏阳市', value: Math.round(Math.random() * 100) },  
                            { name: '长沙县', value: Math.round(Math.random() * 100) },  
                            { name: '开福区', value: Math.round(Math.random() * 100) },  
                            { name: '芙蓉区', value: Math.round(Math.random() * 100) },  
                            { name: '雨花区', value: Math.round(Math.random() * 100) },  
                            { name: '望城区', value: Math.round(Math.random() * 100) },  
                            { name: '天心区', value: Math.round(Math.random() * 100) },  
                            { name: '岳麓区', value: Math.round(Math.random() * 100) },  
                        ]  
                    },
/*                    //散点图
                    {
                        name:'污染指数',
                        type:'scatter',
                        itemStyle: {  
                            normal: {  
                                color: '#ddb926'  
                            }  
                        } ,
                        tooltip : {
                            trigger: 'item',
                            formatter : function (params) {
                                return params.seriesName + ' （'  +  params.value[2] + '）<br/>'
                                       + params.value[0] + ', ' 
                                       + params.value[1]; 
                            },
                         axisPointer:{
                              show: true,
                              type:'cross'
                            }//坐标轴指示器
                        },
                        symbol:'circle',//标志样式
                        symbolSize: function (value){
                            return Math.round(value[2]/10);
                        },//标志大小
                        data: convertData(PRData)
                        zlevel: 1 //层优先级，越大越优先
                    }*/
                   
                    ]  
                };  
  
                myChart.setOption(option);  
            }  
        );  
        
      //散点数据变成{name:“地名”,value:"[x坐标，y坐标，值]"}
        var convertData = function(PRData) {
        	var res = [];
        	for (var i = 0; i < PRData.length; i++) {
        		var geoCoord = geoCoordMap[PRData[i].name];
        		if (geoCoord) {
        			res.push({
        				name : PRData[i].name,
        				value : geoCoord.concat(PRData[i].value)
        			});
        		}
        	}
        	return res;
        };

 var PRData = [ {
	name : '海门',
	value : 9
}, {
	name : '鄂尔多斯',
	value : 12
}, {
	name : '招远',
	value : 12
}, {
	name : '舟山',
	value : 12
}, {
	name : '齐齐哈尔',
	value : 14
}, {
	name : '盐城',
	value : 15
}, {
	name : '赤峰',
	value : 16
}, {
	name : '青岛',
	value : 18
}, {
	name : '乳山',
	value : 18
}, {
	name : '金昌',
	value : 19
}, {
	name : '泉州',
	value : 21
}, {
	name : '莱西',
	value : 21
}, {
	name : '日照',
	value : 21
}, {
	name : '胶南',
	value : 22
}, {
	name : '南通',
	value : 23
}, {
	name : '拉萨',
	value : 24
}, {
	name : '云浮',
	value : 24
}, {
	name : '梅州',
	value : 25
}, {
	name : '文登',
	value : 25
}, {
	name : '上海',
	value : 25
}, {
	name : '攀枝花',
	value : 25
}, {
	name : '威海',
	value : 25
}, {
	name : '承德',
	value : 25
}, {
	name : '厦门',
	value : 26
}, {
	name : '汕尾',
	value : 26
}, {
	name : '潮州',
	value : 26
}, {
	name : '丹东',
	value : 27
}, {
	name : '太仓',
	value : 27
}, {
	name : '曲靖',
	value : 27
}, {
	name : '烟台',
	value : 28
}, {
	name : '福州',
	value : 29
}, {
	name : '瓦房店',
	value : 30
}, {
	name : '即墨',
	value : 30
}, {
	name : '抚顺',
	value : 31
}, {
	name : '玉溪',
	value : 31
}, {
	name : '张家口',
	value : 31
}, {
	name : '阳泉',
	value : 31
}, {
	name : '莱州',
	value : 32
}, {
	name : '湖州',
	value : 32
}, {
	name : '汕头',
	value : 32
}, {
	name : '昆山',
	value : 33
}, {
	name : '宁波',
	value : 33
}, {
	name : '湛江',
	value : 33
}, {
	name : '揭阳',
	value : 34
}, {
	name : '荣成',
	value : 34
}, {
	name : '连云港',
	value : 35
}, {
	name : '葫芦岛',
	value : 35
}, {
	name : '常熟',
	value : 36
}, {
	name : '东莞',
	value : 36
}, {
	name : '河源',
	value : 36
}, {
	name : '淮安',
	value : 36
}, {
	name : '泰州',
	value : 36
}, {
	name : '南宁',
	value : 37
}, {
	name : '营口',
	value : 37
}, {
	name : '惠州',
	value : 37
}, {
	name : '江阴',
	value : 37
}, {
	name : '蓬莱',
	value : 37
}, {
	name : '韶关',
	value : 38
}, {
	name : '嘉峪关',
	value : 38
}, {
	name : '广州',
	value : 38
}, {
	name : '延安',
	value : 38
}, {
	name : '太原',
	value : 39
}, {
	name : '清远',
	value : 39
}, {
	name : '中山',
	value : 39
}, {
	name : '昆明',
	value : 39
}, {
	name : '寿光',
	value : 40
}, {
	name : '盘锦',
	value : 40
}, {
	name : '长治',
	value : 41
}, {
	name : '深圳',
	value : 41
}, {
	name : '珠海',
	value : 42
}, {
	name : '宿迁',
	value : 43
}, {
	name : '咸阳',
	value : 43
}, {
	name : '铜川',
	value : 44
}, {
	name : '平度',
	value : 44
}, {
	name : '佛山',
	value : 44
}, {
	name : '海口',
	value : 44
}, {
	name : '江门',
	value : 45
}, {
	name : '章丘',
	value : 45
}, {
	name : '肇庆',
	value : 46
}, {
	name : '大连',
	value : 47
}, {
	name : '临汾',
	value : 47
}, {
	name : '吴江',
	value : 47
}, {
	name : '石嘴山',
	value : 49
}, {
	name : '沈阳',
	value : 50
}, {
	name : '苏州',
	value : 50
}, {
	name : '茂名',
	value : 50
}, {
	name : '嘉兴',
	value : 51
}, {
	name : '长春',
	value : 51
}, {
	name : '胶州',
	value : 52
}, {
	name : '银川',
	value : 52
}, {
	name : '张家港',
	value : 52
}, {
	name : '三门峡',
	value : 53
}, {
	name : '锦州',
	value : 54
}, {
	name : '南昌',
	value : 54
}, {
	name : '柳州',
	value : 54
}, {
	name : '三亚',
	value : 54
}, {
	name : '自贡',
	value : 56
}, {
	name : '吉林',
	value : 56
}, {
	name : '阳江',
	value : 57
}, {
	name : '泸州',
	value : 57
}, {
	name : '西宁',
	value : 57
}, {
	name : '宜宾',
	value : 58
}, {
	name : '呼和浩特',
	value : 58
}, {
	name : '成都',
	value : 58
}, {
	name : '大同',
	value : 58
}, {
	name : '镇江',
	value : 59
}, {
	name : '桂林',
	value : 59
}, {
	name : '张家界',
	value : 59
}, {
	name : '宜兴',
	value : 59
}, {
	name : '北海',
	value : 60
}, {
	name : '西安',
	value : 61
}, {
	name : '金坛',
	value : 62
}, {
	name : '东营',
	value : 62
}, {
	name : '牡丹江',
	value : 63
}, {
	name : '遵义',
	value : 63
}, {
	name : '绍兴',
	value : 63
}, {
	name : '扬州',
	value : 64
}, {
	name : '常州',
	value : 64
}, {
	name : '潍坊',
	value : 65
}, {
	name : '重庆',
	value : 66
}, {
	name : '台州',
	value : 67
}, {
	name : '南京',
	value : 67
}, {
	name : '滨州',
	value : 70
}, {
	name : '贵阳',
	value : 71
}, {
	name : '无锡',
	value : 71
}, {
	name : '本溪',
	value : 71
}, {
	name : '克拉玛依',
	value : 72
}, {
	name : '渭南',
	value : 72
}, {
	name : '马鞍山',
	value : 72
}, {
	name : '宝鸡',
	value : 72
}, {
	name : '焦作',
	value : 75
}, {
	name : '句容',
	value : 75
}, {
	name : '北京',
	value : 79
}, {
	name : '徐州',
	value : 79
}, {
	name : '衡水',
	value : 80
}, {
	name : '包头',
	value : 80
}, {
	name : '绵阳',
	value : 80
}, {
	name : '乌鲁木齐',
	value : 84
}, {
	name : '枣庄',
	value : 84
}, {
	name : '杭州',
	value : 84
}, {
	name : '淄博',
	value : 85
}, {
	name : '鞍山',
	value : 86
}, {
	name : '溧阳',
	value : 86
}, {
	name : '库尔勒',
	value : 86
}, {
	name : '安阳',
	value : 90
}, {
	name : '开封',
	value : 90
}, {
	name : '济南',
	value : 92
}, {
	name : '德阳',
	value : 93
}, {
	name : '温州',
	value : 95
}, {
	name : '九江',
	value : 96
}, {
	name : '邯郸',
	value : 98
}, {
	name : '临安',
	value : 99
}, {
	name : '兰州',
	value : 99
}, {
	name : '沧州',
	value : 100
}, {
	name : '临沂',
	value : 103
}, {
	name : '南充',
	value : 104
}, {
	name : '天津',
	value : 105
}, {
	name : '富阳',
	value : 106
}, {
	name : '泰安',
	value : 112
}, {
	name : '诸暨',
	value : 112
}, {
	name : '郑州',
	value : 113
}, {
	name : '哈尔滨',
	value : 114
}, {
	name : '聊城',
	value : 116
}, {
	name : '芜湖',
	value : 117
}, {
	name : '唐山',
	value : 119
}, {
	name : '平顶山',
	value : 119
}, {
	name : '邢台',
	value : 119
}, {
	name : '德州',
	value : 120
}, {
	name : '济宁',
	value : 120
}, {
	name : '荆州',
	value : 127
}, {
	name : '宜昌',
	value : 130
}, {
	name : '义乌',
	value : 132
}, {
	name : '丽水',
	value : 133
}, {
	name : '洛阳',
	value : 134
}, {
	name : '秦皇岛',
	value : 136
}, {
	name : '株洲',
	value : 143
}, {
	name : '石家庄',
	value : 147
}, {
	name : '莱芜',
	value : 148
}, {
	name : '常德',
	value : 152
}, {
	name : '保定',
	value : 153
}, {
	name : '湘潭',
	value : 154
}, {
	name : '金华',
	value : 157
}, {
	name : '岳阳',
	value : 169
}, {
	name : '长沙',
	value : 175
}, {
	name : '衢州',
	value : 177
}, {
	name : '廊坊',
	value : 193
}, {
	name : '菏泽',
	value : 194
}, {
	name : '合肥',
	value : 229
}, {
	name : '武汉',
	value : 273
}, {
	name : '大庆',
	value : 279
} ];
var geoCoordMap = {
	'海门' : [ 121.15, 31.89 ],
	'鄂尔多斯' : [ 109.781327, 39.608266 ],
	'招远' : [ 120.38, 37.35 ],
	'舟山' : [ 122.207216, 29.985295 ],
	'齐齐哈尔' : [ 123.97, 47.33 ],
	'盐城' : [ 120.13, 33.38 ],
	'赤峰' : [ 118.87, 42.28 ],
	'青岛' : [ 120.33, 36.07 ],
	'乳山' : [ 121.52, 36.89 ],
	'金昌' : [ 102.188043, 38.520089 ],
	'泉州' : [ 118.58, 24.93 ],
	'莱西' : [ 120.53, 36.86 ],
	'日照' : [ 119.46, 35.42 ],
	'胶南' : [ 119.97, 35.88 ],
	'南通' : [ 121.05, 32.08 ],
	'拉萨' : [ 91.11, 29.97 ],
	'云浮' : [ 112.02, 22.93 ],
	'梅州' : [ 116.1, 24.55 ],
	'文登' : [ 122.05, 37.2 ],
	'上海' : [ 121.48, 31.22 ],
	'攀枝花' : [ 101.718637, 26.582347 ],
	'威海' : [ 122.1, 37.5 ],
	'承德' : [ 117.93, 40.97 ],
	'厦门' : [ 118.1, 24.46 ],
	'汕尾' : [ 115.375279, 22.786211 ],
	'潮州' : [ 116.63, 23.68 ],
	'丹东' : [ 124.37, 40.13 ],
	'太仓' : [ 121.1, 31.45 ],
	'曲靖' : [ 103.79, 25.51 ],
	'烟台' : [ 121.39, 37.52 ],
	'福州' : [ 119.3, 26.08 ],
	'瓦房店' : [ 121.979603, 39.627114 ],
	'即墨' : [ 120.45, 36.38 ],
	'抚顺' : [ 123.97, 41.97 ],
	'玉溪' : [ 102.52, 24.35 ],
	'张家口' : [ 114.87, 40.82 ],
	'阳泉' : [ 113.57, 37.85 ],
	'莱州' : [ 119.942327, 37.177017 ],
	'湖州' : [ 120.1, 30.86 ],
	'汕头' : [ 116.69, 23.39 ],
	'昆山' : [ 120.95, 31.39 ],
	'宁波' : [ 121.56, 29.86 ],
	'湛江' : [ 110.359377, 21.270708 ],
	'揭阳' : [ 116.35, 23.55 ],
	'荣成' : [ 122.41, 37.16 ],
	'连云港' : [ 119.16, 34.59 ],
	'葫芦岛' : [ 120.836932, 40.711052 ],
	'常熟' : [ 120.74, 31.64 ],
	'东莞' : [ 113.75, 23.04 ],
	'河源' : [ 114.68, 23.73 ],
	'淮安' : [ 119.15, 33.5 ],
	'泰州' : [ 119.9, 32.49 ],
	'南宁' : [ 108.33, 22.84 ],
	'营口' : [ 122.18, 40.65 ],
	'惠州' : [ 114.4, 23.09 ],
	'江阴' : [ 120.26, 31.91 ],
	'蓬莱' : [ 120.75, 37.8 ],
	'韶关' : [ 113.62, 24.84 ],
	'嘉峪关' : [ 98.289152, 39.77313 ],
	'广州' : [ 113.23, 23.16 ],
	'延安' : [ 109.47, 36.6 ],
	'太原' : [ 112.53, 37.87 ],
	'清远' : [ 113.01, 23.7 ],
	'中山' : [ 113.38, 22.52 ],
	'昆明' : [ 102.73, 25.04 ],
	'寿光' : [ 118.73, 36.86 ],
	'盘锦' : [ 122.070714, 41.119997 ],
	'长治' : [ 113.08, 36.18 ],
	'深圳' : [ 114.07, 22.62 ],
	'珠海' : [ 113.52, 22.3 ],
	'宿迁' : [ 118.3, 33.96 ],
	'咸阳' : [ 108.72, 34.36 ],
	'铜川' : [ 109.11, 35.09 ],
	'平度' : [ 119.97, 36.77 ],
	'佛山' : [ 113.11, 23.05 ],
	'海口' : [ 110.35, 20.02 ],
	'江门' : [ 113.06, 22.61 ],
	'章丘' : [ 117.53, 36.72 ],
	'肇庆' : [ 112.44, 23.05 ],
	'大连' : [ 121.62, 38.92 ],
	'临汾' : [ 111.5, 36.08 ],
	'吴江' : [ 120.63, 31.16 ],
	'石嘴山' : [ 106.39, 39.04 ],
	'沈阳' : [ 123.38, 41.8 ],
	'苏州' : [ 120.62, 31.32 ],
	'茂名' : [ 110.88, 21.68 ],
	'嘉兴' : [ 120.76, 30.77 ],
	'长春' : [ 125.35, 43.88 ],
	'胶州' : [ 120.03336, 36.264622 ],
	'银川' : [ 106.27, 38.47 ],
	'张家港' : [ 120.555821, 31.875428 ],
	'三门峡' : [ 111.19, 34.76 ],
	'锦州' : [ 121.15, 41.13 ],
	'南昌' : [ 115.89, 28.68 ],
	'柳州' : [ 109.4, 24.33 ],
	'三亚' : [ 109.511909, 18.252847 ],
	'自贡' : [ 104.778442, 29.33903 ],
	'吉林' : [ 126.57, 43.87 ],
	'阳江' : [ 111.95, 21.85 ],
	'泸州' : [ 105.39, 28.91 ],
	'西宁' : [ 101.74, 36.56 ],
	'宜宾' : [ 104.56, 29.77 ],
	'呼和浩特' : [ 111.65, 40.82 ],
	'成都' : [ 104.06, 30.67 ],
	'大同' : [ 113.3, 40.12 ],
	'镇江' : [ 119.44, 32.2 ],
	'桂林' : [ 110.28, 25.29 ],
	'张家界' : [ 110.479191, 29.117096 ],
	'宜兴' : [ 119.82, 31.36 ],
	'北海' : [ 109.12, 21.49 ],
	'西安' : [ 108.95, 34.27 ],
	'金坛' : [ 119.56, 31.74 ],
	'东营' : [ 118.49, 37.46 ],
	'牡丹江' : [ 129.58, 44.6 ],
	'遵义' : [ 106.9, 27.7 ],
	'绍兴' : [ 120.58, 30.01 ],
	'扬州' : [ 119.42, 32.39 ],
	'常州' : [ 119.95, 31.79 ],
	'潍坊' : [ 119.1, 36.62 ],
	'重庆' : [ 106.54, 29.59 ],
	'台州' : [ 121.420757, 28.656386 ],
	'南京' : [ 118.78, 32.04 ],
	'滨州' : [ 118.03, 37.36 ],
	'贵阳' : [ 106.71, 26.57 ],
	'无锡' : [ 120.29, 31.59 ],
	'本溪' : [ 123.73, 41.3 ],
	'克拉玛依' : [ 84.77, 45.59 ],
	'渭南' : [ 109.5, 34.52 ],
	'马鞍山' : [ 118.48, 31.56 ],
	'宝鸡' : [ 107.15, 34.38 ],
	'焦作' : [ 113.21, 35.24 ],
	'句容' : [ 119.16, 31.95 ],
	'北京' : [ 116.46, 39.92 ],
	'徐州' : [ 117.2, 34.26 ],
	'衡水' : [ 115.72, 37.72 ],
	'包头' : [ 110, 40.58 ],
	'绵阳' : [ 104.73, 31.48 ],
	'乌鲁木齐' : [ 87.68, 43.77 ],
	'枣庄' : [ 117.57, 34.86 ],
	'杭州' : [ 120.19, 30.26 ],
	'淄博' : [ 118.05, 36.78 ],
	'鞍山' : [ 122.85, 41.12 ],
	'溧阳' : [ 119.48, 31.43 ],
	'库尔勒' : [ 86.06, 41.68 ],
	'安阳' : [ 114.35, 36.1 ],
	'开封' : [ 114.35, 34.79 ],
	'济南' : [ 117, 36.65 ],
	'德阳' : [ 104.37, 31.13 ],
	'温州' : [ 120.65, 28.01 ],
	'九江' : [ 115.97, 29.71 ],
	'邯郸' : [ 114.47, 36.6 ],
	'临安' : [ 119.72, 30.23 ],
	'兰州' : [ 103.73, 36.03 ],
	'沧州' : [ 116.83, 38.33 ],
	'临沂' : [ 118.35, 35.05 ],
	'南充' : [ 106.110698, 30.837793 ],
	'天津' : [ 117.2, 39.13 ],
	'富阳' : [ 119.95, 30.07 ],
	'泰安' : [ 117.13, 36.18 ],
	'诸暨' : [ 120.23, 29.71 ],
	'郑州' : [ 113.65, 34.76 ],
	'哈尔滨' : [ 126.63, 45.75 ],
	'聊城' : [ 115.97, 36.45 ],
	'芜湖' : [ 118.38, 31.33 ],
	'唐山' : [ 118.02, 39.63 ],
	'平顶山' : [ 113.29, 33.75 ],
	'邢台' : [ 114.48, 37.05 ],
	'德州' : [ 116.29, 37.45 ],
	'济宁' : [ 116.59, 35.38 ],
	'荆州' : [ 112.239741, 30.335165 ],
	'宜昌' : [ 111.3, 30.7 ],
	'义乌' : [ 120.06, 29.32 ],
	'丽水' : [ 119.92, 28.45 ],
	'洛阳' : [ 112.44, 34.7 ],
	'秦皇岛' : [ 119.57, 39.95 ],
	'株洲' : [ 113.16, 27.83 ],
	'石家庄' : [ 114.48, 38.03 ],
	'莱芜' : [ 117.67, 36.19 ],
	'常德' : [ 111.69, 29.05 ],
	'保定' : [ 115.48, 38.85 ],
	'湘潭' : [ 112.91, 27.87 ],
	'金华' : [ 119.64, 29.12 ],
	'岳阳' : [ 113.09, 29.37 ],
	'长沙' : [ 113, 28.21 ],
	'衢州' : [ 118.88, 28.97 ],
	'廊坊' : [ 116.7, 39.53 ],
	'菏泽' : [ 115.480656, 35.23375 ],
	'合肥' : [ 117.27, 31.86 ],
	'武汉' : [ 114.31, 30.52 ],
	'大庆' : [ 125.03, 46.58 ]
};

var mapType = [  
    'china',  
    // 23个省  
    '广东', '青海', '四川', '海南', '陕西',  
    '甘肃', '云南', '湖南', '湖北', '黑龙江',  
    '贵州', '山东', '江西', '河南', '河北',  
    '山西', '安徽', '福建', '浙江', '江苏',  
    '吉林', '辽宁', '台湾',  
    // 5个自治区  
    '新疆', '广西', '宁夏', '内蒙古', '西藏',  
    // 4个直辖市  
    '北京', '天津', '上海', '重庆',  
    // 2个特别行政区  
    '香港', '澳门',  
]; 

var cityMap = {  
        "北京市": "110100",  
        "天津市": "120100",  
        "上海市": "310100",  
        "重庆市": "500100",  

        "崇明县": "310200", //   
        "湖北省直辖县市": "429000", //   
        "铜仁市": "522200", //   
        "毕节市": "522400", //   

        "石家庄市": "130100",  
        "唐山市": "130200",  
        "秦皇岛市": "130300",  
        "邯郸市": "130400",  
        "邢台市": "130500",  
        "保定市": "130600",  
        "张家口市": "130700",  
        "承德市": "130800",  
        "沧州市": "130900",  
        "廊坊市": "13100",  
        "衡水市": "131100",  
        "太原市": "140100",  
        "大同市": "140200",  
        "阳泉市": "140300",  
        "长治市": "140400",  
        "晋城市": "140500",  
        "朔州市": "140600",  
        "晋中市": "140700",  
        "运城市": "140800",  
        "忻州市": "140900",  
        "临汾市": "14100",  
        "吕梁市": "141100",  
        "呼和浩特市": "150100",  
        "包头市": "150200",  
        "乌海市": "150300",  
        "赤峰市": "150400",  
        "通辽市": "150500",  
        "鄂尔多斯市": "150600",  
        "呼伦贝尔市": "150700",  
        "巴彦淖尔市": "150800",  
        "乌兰察布市": "150900",  
        "兴安盟": "152200",  
        "锡林郭勒盟": "152500",  
        "阿拉善盟": "152900",  
        "沈阳市": "210100",  
        "大连市": "210200",  
        "鞍山市": "210300",  
        "抚顺市": "210400",  
        "本溪市": "210500",  
        "丹东市": "210600",  
        "锦州市": "210700",  
        "营口市": "210800",  
        "阜新市": "210900",  
        "辽阳市": "21100",  
        "盘锦市": "211100",  
        "铁岭市": "211200",  
        "朝阳市": "211300",  
        "葫芦岛市": "211400",  
        "长春市": "220100",  
        "吉林市": "220200",  
        "四平市": "220300",  
        "辽源市": "220400",  
        "通化市": "220500",  
        "白山市": "220600",  
        "松原市": "220700",  
        "白城市": "220800",  
        "延边朝鲜族自治州": "222400",  
        "哈尔滨市": "230100",  
        "齐齐哈尔市": "230200",  
        "鸡西市": "230300",  
        "鹤岗市": "230400",  
        "双鸭山市": "230500",  
        "大庆市": "230600",  
        "伊春市": "230700",  
        "佳木斯市": "230800",  
        "七台河市": "230900",  
        "牡丹江市": "23100",  
        "黑河市": "231100",  
        "绥化市": "231200",  
        "大兴安岭地区": "232700",  
        "南京市": "320100",  
        "无锡市": "320200",  
        "徐州市": "320300",  
        "常州市": "320400",  
        "苏州市": "320500",  
        "南通市": "320600",  
        "连云港市": "320700",  
        "淮安市": "320800",  
        "盐城市": "320900",  
        "扬州市": "32100",  
        "镇江市": "321100",  
        "泰州市": "321200",  
        "宿迁市": "321300",  
        "杭州市": "330100",  
        "宁波市": "330200",  
        "温州市": "330300",  
        "嘉兴市": "330400",  
        "湖州市": "330500",  
        "绍兴市": "330600",  
        "金华市": "330700",  
        "衢州市": "330800",  
        "舟山市": "330900",  
        "台州市": "33100",  
        "丽水市": "331100",  
        "合肥市": "340100",  
        "芜湖市": "340200",  
        "蚌埠市": "340300",  
        "淮南市": "340400",  
        "马鞍山市": "340500",  
        "淮北市": "340600",  
        "铜陵市": "340700",  
        "安庆市": "340800",  
        "黄山市": "34100",  
        "滁州市": "341100",  
        "阜阳市": "341200",  
        "宿州市": "341300",  
        "六安市": "341500",  
        "亳州市": "341600",  
        "池州市": "341700",  
        "宣城市": "341800",  
        "福州市": "350100",  
        "厦门市": "350200",  
        "莆田市": "350300",  
        "三明市": "350400",  
        "泉州市": "350500",  
        "漳州市": "350600",  
        "南平市": "350700",  
        "龙岩市": "350800",  
        "宁德市": "350900",  
        "南昌市": "360100",  
        "景德镇市": "360200",  
        "萍乡市": "360300",  
        "九江市": "360400",  
        "新余市": "360500",  
        "鹰潭市": "360600",  
        "赣州市": "360700",  
        "吉安市": "360800",  
        "宜春市": "360900",  
        "抚州市": "36100",  
        "上饶市": "361100",  
        "济南市": "370100",  
        "青岛市": "370200",  
        "淄博市": "370300",  
        "枣庄市": "370400",  
        "东营市": "370500",  
        "烟台市": "370600",  
        "潍坊市": "370700",  
        "济宁市": "370800",  
        "泰安市": "370900",  
        "威海市": "37100",  
        "日照市": "371100",  
        "莱芜市": "371200",  
        "临沂市": "371300",  
        "德州市": "371400",  
        "聊城市": "371500",  
        "滨州市": "371600",  
        "菏泽市": "371700",  
        "郑州市": "410100",  
        "开封市": "410200",  
        "洛阳市": "410300",  
        "平顶山市": "410400",  
        "安阳市": "410500",  
        "鹤壁市": "410600",  
        "新乡市": "410700",  
        "焦作市": "410800",  
        "濮阳市": "410900",  
        "许昌市": "41100",  
        "漯河市": "411100",  
        "三门峡市": "411200",  
        "南阳市": "411300",  
        "商丘市": "411400",  
        "信阳市": "411500",  
        "周口市": "411600",  
        "驻马店市": "411700",  
        "省直辖县级行政区划": "469000",  
        "武汉市": "420100",  
        "黄石市": "420200",  
        "十堰市": "420300",  
        "宜昌市": "420500",  
        "襄阳市": "420600",  
        "鄂州市": "420700",  
        "荆门市": "420800",  
        "孝感市": "420900",  
        "荆州市": "42100",  
        "黄冈市": "421100",  
        "咸宁市": "421200",  
        "随州市": "421300",  
        "恩施土家族苗族自治州": "422800",  
        "长沙市": "430100",  
        "株洲市": "430200",  
        "湘潭市": "430300",  
        "衡阳市": "430400",  
        "邵阳市": "430500",  
        "岳阳市": "430600",  
        "常德市": "430700",  
        "张家界市": "430800",  
        "益阳市": "430900",  
        "郴州市": "43100",  
        "永州市": "431100",  
        "怀化市": "431200",  
        "娄底市": "431300",  
        "湘西土家族苗族自治州": "433100",  
        "广州市": "440100",  
        "韶关市": "440200",  
        "深圳市": "440300",  
        "珠海市": "440400",  
        "汕头市": "440500",  
        "佛山市": "440600",  
        "江门市": "440700",  
        "湛江市": "440800",  
        "茂名市": "440900",  
        "肇庆市": "441200",  
        "惠州市": "441300",  
        "梅州市": "441400",  
        "汕尾市": "441500",  
        "河源市": "441600",  
        "阳江市": "441700",  
        "清远市": "441800",  
        "东莞市": "441900",  
        "中山市": "442000",  
        "潮州市": "445100",  
        "揭阳市": "445200",  
        "云浮市": "445300",  
        "南宁市": "450100",  
        "柳州市": "450200",  
        "桂林市": "450300",  
        "梧州市": "450400",  
        "北海市": "450500",  
        "防城港市": "450600",  
        "钦州市": "450700",  
        "贵港市": "450800",  
        "玉林市": "450900",  
        "百色市": "45100",  
        "贺州市": "451100",  
        "河池市": "451200",  
        "来宾市": "451300",  
        "崇左市": "451400",  
        "海口市": "460100",  
        "三亚市": "460200",  
        "三沙市": "460300",  
        "成都市": "510100",  
        "自贡市": "510300",  
        "攀枝花市": "510400",  
        "泸州市": "510500",  
        "德阳市": "510600",  
        "绵阳市": "510700",  
        "广元市": "510800",  
        "遂宁市": "510900",  
        "内江市": "51100",  
        "乐山市": "511100",  
        "南充市": "511300",  
        "眉山市": "511400",  
        "宜宾市": "511500",  
        "广安市": "511600",  
        "达州市": "511700",  
        "雅安市": "511800",  
        "巴中市": "511900",  
        "资阳市": "512000",  
        "阿坝藏族羌族自治州": "513200",  
        "甘孜藏族自治州": "513300",  
        "凉山彝族自治州": "513400",  
        "贵阳市": "520100",  
        "六盘水市": "520200",  
        "遵义市": "520300",  
        "安顺市": "520400",  
        "黔西南布依族苗族自治州": "522300",  
        "黔东南苗族侗族自治州": "522600",  
        "黔南布依族苗族自治州": "522700",  
        "昆明市": "530100",  
        "曲靖市": "530300",  
        "玉溪市": "530400",  
        "保山市": "530500",  
        "昭通市": "530600",  
        "丽江市": "530700",  
        "普洱市": "530800",  
        "临沧市": "530900",  
        "楚雄彝族自治州": "532300",  
        "红河哈尼族彝族自治州": "532500",  
        "文山壮族苗族自治州": "532600",  
        "西双版纳傣族自治州": "532800",  
        "大理白族自治州": "532900",  
        "德宏傣族景颇族自治州": "533100",  
        "怒江傈僳族自治州": "533300",  
        "迪庆藏族自治州": "533400",  
        "拉萨市": "540100",  
        "昌都地区": "542100",  
        "山南地区": "542200",  
        "日喀则地区": "542300",  
        "那曲地区": "542400",  
        "阿里地区": "542500",  
        "林芝地区": "542600",  
        "西安市": "610100",  
        "铜川市": "610200",  
        "宝鸡市": "610300",  
        "咸阳市": "610400",  
        "渭南市": "610500",  
        "延安市": "610600",  
        "汉中市": "610700",  
        "榆林市": "610800",  
        "安康市": "610900",  
        "商洛市": "61100",  
        "兰州市": "620100",  
        "嘉峪关市": "620200",  
        "金昌市": "620300",  
        "白银市": "620400",  
        "天水市": "620500",  
        "武威市": "620600",  
        "张掖市": "620700",  
        "平凉市": "620800",  
        "酒泉市": "620900",  
        "庆阳市": "62100",  
        "定西市": "621100",  
        "陇南市": "621200",  
        "临夏回族自治州": "622900",  
        "甘南藏族自治州": "623000",  
        "西宁市": "630100",  
        "海东地区": "632100",  
        "海北藏族自治州": "632200",  
        "黄南藏族自治州": "632300",  
        "海南藏族自治州": "632500",  
        "果洛藏族自治州": "632600",  
        "玉树藏族自治州": "632700",  
        "海西蒙古族藏族自治州": "632800",  
        "银川市": "640100",  
        "石嘴山市": "640200",  
        "吴忠市": "640300",  
        "固原市": "640400",  
        "中卫市": "640500",  
        "乌鲁木齐市": "650100",  
        "克拉玛依市": "650200",  
        "吐鲁番地区": "652100",  
        "哈密地区": "652200",  
        "昌吉回族自治州": "652300",  
        "博尔塔拉蒙古自治州": "652700",  
        "巴音郭楞蒙古自治州": "652800",  
        "阿克苏地区": "652900",  
        "克孜勒苏柯尔克孜自治州": "653000",  
        "喀什地区": "653100",  
        "和田地区": "653200",  
        "伊犁哈萨克自治州": "654000",  
        "塔城地区": "654200",  
        "阿勒泰地区": "654300",  
        "自治区直辖县级行政区划": "659000",  
        "台湾省": "71000",  
        "香港特别行政区": "810100",  
        "澳门特别行政区": "820000"  
    };  

