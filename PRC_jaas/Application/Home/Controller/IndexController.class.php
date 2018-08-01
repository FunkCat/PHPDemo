<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Controller;

use Think\Controller;
use Think\Exception;
//use Think\Net;

/**
 * 前台首页控制器
 * 主要获取首页聚合数据
 */
class IndexController extends Controller
{

    //系统首页
    public function index()
    {
        if(is_login()){
        }
        hook('homeIndex');
        $default_url = C('DEFUALT_HOME_URL');//获得配置，如果为空则显示聚合，否则跳转
        if ($default_url != ''&&strtolower($default_url)!='home/index/index') {
            redirect(get_nav_url($default_url));
        }
        $this->display();
    }

    public function home()
    {
        if(is_login()){
        }
        hook('homeIndex');
        $default_url = C('DEFUALT_HOME_URL');//获得配置，如果为空则显示聚合，否则跳转
        if ($default_url != ''&&strtolower($default_url)!='home/index/index') {
            redirect(get_nav_url($default_url));
        }

        $show_blocks = get_kanban_config('BLOCK', 'enable', array(), 'Home');

        $this->assign('showBlocks', $show_blocks);


        $enter = modC('ENTER_URL', '', 'Home');
        $this->assign('enter', get_nav_url($enter));
        $this->display();
    }

    protected function _initialize()
    {

        /*读取站点配置*/
        $config = api('Config/lists');
        C($config); //添加配置

        if (!C('WEB_SITE_CLOSE')) {
            $this->error(L('_ERROR_WEBSITE_CLOSED_'));
        }
    }
    //获取界面数据
    public function getCrop(){
        $n1 = D("Crop");//造一个nation表的模型对象
        $attr1 = $n1->where('status=1')->select();
        
        $this->ajaxReturn($attr1);//ajax返回数据的方式，用ajaxReturn。
    }
    public function getPesticide(){
        $n2 = D("Pesticide");//造一个nation表的模型对象
        $attr2 = $n2->where('status=1')->select();
        
        $this->ajaxReturn($attr2);//ajax返回数据的方式，用ajaxReturn。
    }
    public function getSoil(){
        $n3 = D("Soil");//造一个nation表的模型对象
        $attr3 = $n3->where('status=1')->select();
        
        $this->ajaxReturn($attr3);//ajax返回数据的方式，用ajaxReturn。
    }
    public function getConstant(){
        $n4 = D("Constant");//造一个nation表的模型对象
        $attr4 = $n4->select();
        $this->ajaxReturn($attr4);//ajax返回数据的方式，用ajaxReturn。
    }
    public function getApplyType(){
        $n5 = D("Applytype");//造一个nation表的模型对象
        $attr5 = $n5->where('status=1')->select();    
        $this->ajaxReturn($attr5);//ajax返回数据的方式，用ajaxReturn。
    }
    public function calculateAndSave(){
        $data['useCount']=I('post.useCount');  
        $data['projectedArea']=I('post.projectedArea');  
        $data['soilDensity']=I('post.soilDensity');  
        $data['useNumber']=I('post.useNumber');  
        $data['activePrinciple_p']=I('post.activePrinciple_p');  
        $data['activePrinciple']=I('post.activePrinciple');  
        $data['adsorptionCoeff']=I('post.adsorptionCoeff');  
        $data['halfTime']=I('post.halfTime');  
        $data['estimateDays']=I('post.estimateDays');  
        $data['cropId']=I('post.cropId');  
        $data['soilId']=I('post.soilId');  
        $data['pesticideId']=I('post.pesticideId');  
        $data['isAccurate']=I('post.isAccurate');  
        $data['deepth']=I('post.deepth');  
        $data['applyType']=I('post.applyType');  
        $validate = D("Searchlog");
        $validate->add($date);   
        $f=$data['useCount'];
        $d=$data['useNumber'];
        $a0=$data['activePrinciple'];
        $a=$data['activePrinciple_p'];
        $p=$data['projectedArea'];
        $load=$f*$d*$a/100*$p/100;
        //echo "农药载入浓度kg/m2|".$load;
        $result['load']=$load*1000000;
        $Fint = 0.5 ;//Fint为农药试用后沉积于作物表面的部分
        $Fair = 0.32 ;//Fair为农药施用后进入空气中的部分（空气释放因子），与农药的蒸汽压有关。
        $Fsoil = (1 - $Fint) * (1 - $Fair);//Fsoil 为农药试用后分布于土壤中的比例（%）
        //echo "|Fsoil:".$Fsoil."|";
        $Deepth = $data['deepth'];//农药沉积土壤的深度
        
        $RHOpest = $data['soilDensity'];//土壤的密度
        $Csoil = ($Fsoil * $load)/($Deepth * $RHOpest);
      //  echo "起始土壤残留浓度（kg/kg）".$Csoil."------------";
        $result['Csoil']=$Csoil*1000000;
        $e = 2.718281828459 ;//  e = 2.718281828459
        $ln2 = 0.69314718055995 ;//ln(2) = 0.69314718055995    
        $ac0=$data['adsorptionCoeff'];
        $halfTime= $data['halfTime'];
        $k = $ln2 / $halfTime; //k 为表层土农药降解速率（d-1）
        $t= $data['estimateDays'];
        $C0 = $Csoil;
        $m=$k * $t;
        $n=pow($e,$m);
        $Ct = $C0/$n;
        //echo "n天后土壤残留浓度（mg/kg）".$Ct."------------";
        $result['Ct']=$Ct*1000000;
        $result['edays']=$t;
        $result['message']='';
        $result['halfTime']=$halfTime;
        $ip=get_client_ip();
       //事务
        $trans_result = true;
        $trans = M();
        $trans->startTrans(); 
        try {   // 异常处理
            // 更新实施
        //插入searchlog数据；
        $searchlog=D('Searchlog');
        $reason13=$searchlog->create();
        if($reason13.length>=0){
            $searchlog->useCount=$f;
            $searchlog->useNumber=$d;
            $searchlog->activePrinciple=$a0;
            $searchlog->activePrinciple_p=$a;
            $searchlog->projectedArea=$p;
            $searchlog->applyType=$data['applyType'];
            $searchlog->soilDensity=$RHOpest;
            $searchlog->adsorptionCoeff=$ac0;
            $searchlog->halfTime=$halfTime;
            $searchlog->estimateDays=$t;
            $searchlog->isAccurate=$data['isAccurate'];
            $searchlog->pesticideId=$data['pesticideId'];
            $searchlog->soilId=$data['soilId'];
            $searchlog->cropId=$data['cropId'];
            $searchlog->searchIp=$ip;
            $searchlog->createTime=date("Y-m-d H:i:s" ,time());
            $searchlogId =$searchlog->add();
            if($searchlogId) {
                $result['message']=$result['message'].'/searchlog-add-success';
            }else{
                $result['message']=$result['message'].'/searchlog-add-error';
                $trans_result = false;
            }
        }else{
            $result['message']=$result['message'].'/searchlog-create-error';
            $trans_result = false;
        }
        
        //插入result数据;
        $resultIn = D('Result');
        $reason=$resultIn->create();
        if($reason.length>=0){
            $resultIn->searchlogId=$searchlogId;
            $resultIn->concentration_load=$load*1000000;
            $resultIn->concentration_remain=$Csoil*1000000;
            $resultIn->concentration_remain_a=$result['Ct'];
            $resultIn->createTime=date("Y-m-d H:i:s" ,time());
            $reasultOut=$resultIn->add();
            if($reasultOut) {
                $result['message']=$result['message'].'/result-add-success';
            }else{
                $result['message']=$result['message'].'/result-add-error';
                $trans_result = false;
            }
        }else{
            $result['message']=$result['message'].'/result-create-error';
            $trans_result = false;
        } 
        //插入IP数据
        $ipDate=$this->taobaoIP($ip);
        list($country,$province,$city)=explode('@',$ipDate,3);
        $ipIn = D('Iplocation');
        $Iplocation=$ipIn->create();
        if($Iplocation.length>=0){
            $ipIn->IpAddress=$ip;
            $ipIn->country=$country;
            $ipIn->province=$province;
            $ipIn->city=$city;
            $ipIn->searchlogId=$searchlogId;
            $ipIn->createTime=date("Y-m-d H:i:s" ,time());
            $ipOut=$ipIn->add();
            if($ipOut) {
                $result['message']=$result['message'].'/ip-add-success';
            }else{
                $result['message']=$result['message'].'/ip-add-error';
                $trans_result = false;
            }
        }else{
            $result['message']=$result['message'].'/ip-create-error';
            $trans_result = false;
        }  
        //抛出异常
        } catch (Exception $ex) {
            $trans_result = false;
            // 记录日志
            $result['message']=$result['message'].'/'.$ex->getMessage();
        }
        if ($trans_result === false) {
            $trans->rollback();
            // 更新失败
            $result['message']=$result['message'].'/rollback';
        } else {
            $trans->commit();
            // 更新成功
            $result['message']=$result['message'].'/commit';
        }
        //ajax返回view
        $this->ajaxReturn($result);
    }
    
    //淘宝IP库
    public function taobaoIP($clientIP){
        $taobaoIP = 'http://ip.taobao.com/service/getIpInfo.php?ip='.$clientIP;
        $IPinfo = json_decode(file_get_contents($taobaoIP));
        $country =  $IPinfo->data->country;
        $province = $IPinfo->data->region;
        $city = $IPinfo->data->city;
        $ipdata =$country."@".$province."@".$city;
        return $ipdata;
    }
}
