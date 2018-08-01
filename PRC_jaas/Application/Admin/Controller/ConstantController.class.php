<?php

namespace Admin\Controller;

use Admin\Model\ConstantModel;
use User\Api\UserApi as UserApi;

/**
 * 农药管理控制器
 * @author 房焜
 */
class ConstantController extends AdminController
{

    /**
     * 后台首页
     * @author 房焜
     */
    public function index()
    {
        if(!empty($_POST)&&I('post.useCount')!=NULL){
            $Constant=D('Constant');
            $Constant->create();
            $Constant->useCount=I('post.useCount');          
            $Constant->estimateDays=I('post.estimateDays');
            $Constant->where('constantId=1')->save();
/*             $estimateDays=I('post.estimateDays');
            $useCount=I('post.useCount');
            $Constant-> limit(1)->setField('useCount',$useCount);
            $Constant-> limit(1)->setField('estimateDays',$estimateDays); */
        }
         $map['status'] = array('egt', 0);
         $Constant=new ConstantModel();
         //$list = $this->lists('Constant', $map);
         $list =$Constant->lists();
         int_to_string($list);
         $this->assign('_list', $list);
         $this->meta_title = L('_INDEX_MANAGE_');
         $this->display();
     }
     /**
      * 常数修改
      * @author 房焜
      */
     public function editConstant()
     {
         if(!empty($_POST)){
         $Constant=D('Constant');
         $Constant->useCount=I('post.useCount');
         $Constant->estimateDays=I('post.estimateDays');
         $Constant->save();
         }
         $this->index();
     }



}
