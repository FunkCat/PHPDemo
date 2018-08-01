$(function($){
	//$("#useCount_r").val(2);//农药使用次数
	//$("#estimateDays").val(365);//n天预设时间
	$("#isAccurate").val(0);
	$.ajax({
        url:U('home/index/getConstant'),
        data:{},
        type:"post",
        dataType:"json",
        error: function(){   
        	console.log('ajax error');   
        },   
        success: function(data){
            for(a in data)
            {
           	 if(data[a].useCount!=null&&data[a].estimateDays!=null){
           		 $("#useCount_r").val(data[a].useCount);
           		$("#estimateDays").val(data[a].estimateDays);
           		break;
           	 }
            }
        }
	});
	
	$.ajax({
        url:U('home/index/getApplyType'),
        data:{},
        type:"post",
        dataType:"json",
        error: function(){   
        	console.log('ajax error');   
        },   
        success: function(data){
       	 var str="";
         for(a in data)
         {
        	 if(data[a].applyId!=null&&data[a].applyName!=null){
        	
             str = str+"<option value='"+data[a].applyId+"@"+data[a].deepth+"'>"+data[a].applyName+"</option>";
             
        	 }
         }
         $("#applyType").html(str);
        }
	});
	
	$.ajax({
        url:U('home/index/getCrop'),//这里指向的就不再是页面了，而是一个方法。
        data:{},
        type:"post",
        dataType:"json",
        error: function(){   
        	console.log('ajax error');   
        },   
        success: function(data){
       	 var str="";
         for(a in data)
         {
        	 if(data[a].cropId!=null&&data[a].cropName!=null){
        	
             str = str+"<option value='"+data[a].cropId+"@"+data[a].projectedArea+"'>"+data[a].cropName+"</option>";
             
        	 }
         }
         $("#mySelect1").html(str);
         setValue1();
        }
	});
	
	$("#mySelect1").change(function() {
		console.log($('#mySelect1 option:selected').val());
		setValue1();
	});
	
	$.ajax({
        url:U('home/index/getSoil'),//
        data:{},
        type:"post",
        dataType:"json",
        error: function(){   
        	console.log('ajax error');   
        },   
        success: function(data){
       	 var str="";
         for(a in data)
         {
        	 if(data[a].soilId!=null&&data[a].soilName!=null){
        	
             str = str+"<option value='"+data[a].soilId+"@"+data[a].soilCoeff+"@"+data[a].soilDensity+"'>"+data[a].soilName+"</option>";
        	 }
         }
         $("#mySelect2").html(str);
         setValue2();
        }
	});
	
	$("#mySelect2").change(function() {
		setValue2();
	});
	
	$.ajax({
        url:U('home/index/getPesticide'),
        data:{},
        type:"post",
        dataType:"json",
        error: function(){   
        	console.log('ajax error');   
        },   
        success: function(data){
     	var str="";
    	var array=data;
     	for(a in array)
       {
    		
      	 if(array[a].pesticideId!=null&&array[a].pesticideName!=null){
      	
           str = str+"<option value='"+array[a].pesticideId+"@"+array[a].useNumber+"@"+array[a].activePrinciple_p+"@"+array[a].activePrinciple+"@"+array[a].adsorptionCoeff+"@"+array[a].halfTime+"'>"+array[a].pesticideName+"</option>";
        		 
      	 }
       }
    	$("#mySelect3").html(str);
    	setValue3();
        }
	});
	 
     
	$("#mySelect3").change(function() {
	 setValue3();
	});
	

	/*	
	//柱状图
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('line'));

	// 指定图表的配置项和数据
	var option = {
		title : {
			text : '柱状图示例'
		},
		tooltip : {},
		legend : {
			data : [ '农残' ]
		},
		xAxis : {
			data : [ "南京 ", "无锡 ", "常州 ", "苏州 ", "南通 ", "泰州 " ]
		},
		yAxis : {},
		series : [ {
			name : '农残',
			type : 'bar',
			data : [ 5, 20, 36, 10, 10, 20 ]
		} ]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	
	//折线图
	var myChart2 = echarts.init( document.getElementById("container"));
	var app = {};
	option2 = null;
	function randomData() {
		now = new Date(+now + oneDay);
		value = value + Math.random() * 21 - 10;
		return {
			name : now.toString(),
			value : [
					[ now.getFullYear(), now.getMonth() + 1, now.getDate() ]
							.join('/'), Math.round(value) ]
		}
	}

	var data = [];
	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
		data.push(randomData());
	}

	option2 = {
		title : {
			text : '动态数据 + 时间坐标轴'
		},
		tooltip : {
			trigger : 'axis',
			formatter : function(params) {
				params = params[0];
				var date = new Date(params.name);
				return date.getDate() + '/' + (date.getMonth() + 1) + '/'
						+ date.getFullYear() + ' : ' + params.value[1];
			},
			axisPointer : {
				animation : false
			}
		},
		xAxis : {
			type : 'time',
			splitLine : {
				show : false
			}
		},
		yAxis : {
			type : 'value',
			boundaryGap : [ 0, '100%' ],
			splitLine : {
				show : false
			}
		},
		series : [ {
			name : '模拟数据',
			type : 'line',
			showSymbol : false,
			hoverAnimation : false,
			data : data
		} ]
	};

	setInterval(function() {

		for (var i = 0; i < 5; i++) {
			data.shift();
			data.push(randomData());
		}

		myChart2.setOption({
			series : [ {
				data : data
			} ]
		});
	}, 1000);
	
	if (option2 && typeof option2 === "object") {
		myChart2.setOption(option2, true);
	};*/

});


//作物变更赋值精确
function setValue1(){
	var s1="";
	s1=$('#mySelect1 option:selected').val();
	var ss1 = s1.split("@");
	$("#cropId").val(ss1[0]);
	$("#projectedArea").val(100-ss1[1]);
};
//土壤变更赋值精确
function setValue2(){
	var s2="";
	s2=$('#mySelect2 option:selected').val();
	var ss2 = s2.split("@");
	$("#soilId").val(ss2[0]);
	//$("#adsorptionCoeff").val(ss[1]);
    $("#soilDensity_r").val(ss2[2]);
}; 
//农药变更赋值精确
function setValue3(){
	var s3="";
	s3=$('#mySelect3 option:selected').val();
	var ss3 = s3.split("@");
	$("#pesticideId").val(ss3[0]);
	$("#useNumber_r").val(ss3[1]);
    $("#activePrinciple_p_r").val(ss3[2]);
    $("#activePrinciple_r").val(ss3[3]);
    $("#adsorptionCoeff").val(ss3[4]);
    $("#halfTime").val(ss3[5]);
};
//校验
function SubmitCK() {
	var dig=/^\+?[1-9][0-9]*$/; //正整数
	var p=/^[1-9][0-9]$/;//(0-100)整数
	var txt=/^.{1,10}$/;//1-10字符以下文本
	var num=/^[0-9]+$/;//数字
	var dou=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;//正浮点数 
	var flag=true;
	if (!txt.test($("#activePrinciple_r").val())) {
		alert("农药名称不得大于10个字符！")
		flag = false;
	}
	if (!dou.test($("#useNumber_r").val())) {
		alert("农药使用量应为正小数！")
		flag = false;
	}
	if (!p.test($("#activePrinciple_p_r").val())) {
		alert("有效成分比例应为1-99的整数！")
		flag = false;
	}
	if (!dig.test($("#useCount_r").val())) {
		alert("农药使用次数为正整数！")
		flag = false;
	}
	if (!dig.test($("#projectedArea").val())) {
		alert("土壤受药面积应为正整数！")
		flag = false;
	}
	if (!dig.test($("#adsorptionCoeff").val())) {
		alert("土壤吸附系数应为正整数！")
		flag = false;
	}
	if (!dig.test($("#halfTime").val())) {
		alert("土壤半衰期应为正整数！")
		flag = false;
	}
	if (!dig.test($("#halfTime").val())) {
		alert("估算天数应为正整数！")
		flag = false;
	}
	if(flag){
		
	}
	return flag;
}
//计算结果并保存结果和查询
function calculateAndSave(){
	 if(!SubmitCK()){
		 return false;
	 }
	var useCount=$("#useCount_r").val();//农药使用次数
	var projectedArea=$("#projectedArea").val();//土壤收药面积
	var soilDensity=$("#soilDensity_r").val();//土壤密度
	var useNumber=$("#useNumber_r").val();//农药使用量
	var activePrinciple_p=$("#activePrinciple_p_r").val();//有效成分含量
	var activePrinciple=$("#activePrinciple_r").val();//有效成分
	var adsorptionCoeff=$("#adsorptionCoeff").val();//土壤吸附系数
	var halfTime=$("#halfTime").val();//土壤中半衰期
	var estimateDays=$("#estimateDays").val();//n天预设时间
	var cropId=$("#cropId").val();
	var soilId=$("#soilId").val();
	var pesticideId=$("#pesticideId").val();
	var isAccurate=$("#isAccurate").val();
	var applyValue=$('#applyType option:selected').val();
	var ss3 = applyValue.split("@");
	var applyType=ss3[0];
	var deepth=ss3[1];
	console.log('calculateAndSave()start'+deepth);  
	$.ajax({
        url:U('home/index/calculateAndSave'),
        data:{useCount:useCount,projectedArea:projectedArea,soilDensity:soilDensity,useNumber:useNumber,activePrinciple_p:activePrinciple_p,activePrinciple:activePrinciple,adsorptionCoeff:adsorptionCoeff,halfTime:halfTime,estimateDays:estimateDays,cropId:cropId,soilId:soilId,pesticideId:pesticideId,isAccurate:isAccurate,deepth:deepth,applyType:applyType},
        type:"post",
        dataType:"json",
        error: function(){   
        	console.log('ajax error');  
        },   
        success: function(data){
        	console.log('ajax success');
        	console.log(data.message);
	     		if(data.load!=null&&data.Csoil!=null){
	     			console.log('计算过程正确:'+data.load+'@'+data.Csoil+'@'+data.Ct+'@'+data.edays+'@'+data.halfTime);
	     			var load =data.load;
	     			load = load.toFixed(2);
	     			var Csoil=data.Csoil;
	     			Csoil=Csoil.toFixed(2);
	     			var Ct=data.Ct;
	     			Ct=Ct.toFixed(2);
	     			$("#load").html(load);
	     			$("#Csoil").html(Csoil);
	     			$('#edays').html(data.edays); 
	     			$("#Ct").html(Ct);
	     			var halfTime=data.halfTime;
	     			printLine(Csoil,halfTime);
	     			showview();
	          	 } else{
	          		console.log('计算过程有误');
	          		
	          	 }
	     	return true;
       }
	});
}

//报告显示关闭
function showview() {　　　　　　　　
     if($("#view_bg").css("display") == "none") {　　　　　　　　　　
         $("#view_bg").show();　　
         $("#shade").show();
         $(".view_close").show();
     } else {　　　　　　　　　　
         $("#view_bg").hide();
         $("#shade").hide();　　　
         $(".view_close").hide();
     }　　　　
     console.log("showview");
};
//绘制曲线图
function printLine(Csoil,halfTime){
		//曲线图
		var myChart3 = echarts.init(document.getElementById('smoothline'));
		var option3 = {
			title : {
				text : '污染指数时间变化表'
			},
			tooltip : {
				trigger : 'axis',
		        axisPointer: {
		            type: 'cross'
		        }
			},
			legend: {
				orient: 'vertical',
				left: 'right',
				data:['低度污染','中度污染','高度污染'],
				selected: {
				'低度污染' :true,
				'中度污染' :true,
				'高度污染' :true,
				//不想显示的都设置成false
				}
				},
			color:['#e34850','#f2f0e3','#d9e39e'],
		    xAxis: {
		        type: 'category',
		        name:'使用后天数',
		        data: ['当前',halfTime, 2*halfTime,3*halfTime,4*halfTime,5*halfTime,6*halfTime,7*halfTime,8*halfTime]
		    },
		    yAxis: {
		        type: 'value',
		        name:'土壤残留浓度mg/kg',
		    },
		    series: [
		    	{
		        data: [Csoil,Csoil/2,Csoil/4,Csoil/8,Csoil/16,Csoil/32,Csoil/64,Csoil/128,Csoil/256],
		        type: 'line',
		        smooth: true
		    },
		   {
		    	name:'低度污染',
		    	type:'line',
		    	animation: false,
		    	areaStyle: {
		    	normal: {}
		    	},
		    	lineStyle: {
		    	normal: {
		    	width: 1
		    	}
		    	},
		    	markArea: {
		    	data: [[{
		    	yAxis: '0.05'
		    	}, {
		    	yAxis: '1'
		    	}]]
		    	},

		    	},{
		    	name:'中度污染',
		    	type:'line',
		    	animation: false,
		    	areaStyle: {
		    	normal: {}
		    	},
		    	lineStyle: {
		    	normal: {
		    	width: 1
		    	}
		    	},
		    	markArea: {
		    	data: [[{
		    	yAxis: '1'
		    	}, {
		    	yAxis: '5'
		    	}]]
		    	}
		    	},{
		    	name:'高度污染',
		    	type:'line',
		    	animation: false,
		    	areaStyle: {
		    	normal: {}
		    	},
		    	lineStyle: {
		    	normal: {
		    	width: 1
		    	}
		    	},
		    	markArea: {
		    	data: [[{
		    	yAxis: '5'
		    	}, {
		    	yAxis: '20'
		    	}]]
		    	}
		    	},
		    ]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart3.setOption(option3);
}

function showview2() {　　　　　　　　
	var searchWIND = document.getElementById('searchWIND');
	//var height = parseInt(searchWIND.style.height || searchWIND.clientWidth || searchWIND.offsetWidth || searchWIND.scrollWidth);
	//console.log(height);
	var view_jz=document.getElementById('view_jz');
	if (!parseInt(view_jz.style.height)){
		searchWIND.style.height = '400px';
		view_jz.style.height = '200px';
		setTimeout(function(){ $("#assess_jz").show();},1000);
		$("#isAccurate").val(1);
	}else {
		searchWIND.style.height = '200px';
		view_jz.style.height = '0px';
		 $("#assess_jz").hide();　
		 $("#isAccurate").val(0);
	}
	

};

function display(){
	if($("#assess_jz").css("display") == "none") {　　　　　　　　　　
         $("#assess_jz").show();　　　　　　　　
     } else {　　　　　　　　　　
         $("#assess_jz").hide();　　　　　　　　
     }　　　　

}