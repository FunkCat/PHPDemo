<?php

namespace Admin\Controller;

use Admin\Model\AuthGroupModel;
use User\Api\UserApi as UserApi;

/**
 * 农药管理控制器
 * @author 房焜
 */
class BaseController extends AdminController
{

    /**
     * 后台首页
     * @author 房焜
     */
    public function index()
    {
         $map['status'] = array('egt', 0);

         $list = $this->lists('Pesticide', $map);
         int_to_string($list);
         $this->assign('_list', $list);
         $this->meta_title = L('_INDEX_MANAGE_');
         $this->display();
     }
     /**
      * 农药状态修改
      * @author 房焜
      */
     public function changeStatus($method = null)
     {
         $id = array_unique((array)I('id', 0));
         if (count(array_intersect(explode(',', C('USER_ADMINISTRATOR')), $id)) > 0) {//管理员验证
             $this->error('_DO_NOT_ALLOW_THE_SUPER_ADMINISTRATOR_TO_PERFORM_THE_OPERATION_');
         }
         $id = is_array($id) ? implode(',', $id) : $id;
         if (empty($id)) {
             $this->error('PLEASE_CHOOSE_TO_OPERATE_THE_DATA');
         }
         $map['pesticideId'] = array('in', $id);
         switch (strtolower($method)) {
             case 'forbidp':
                 $this->forbid('Pesticide', $map);
                 break;
             case 'resumep':
                 $this->resume('Pesticide', $map);
                 break;
             case 'deletep':
                 $this->delete('Pesticide', $map);
                 break;
             default:
                 $this->error(L('_ILLEGAL_'));
                 
         }
         
     }
     /**
      * 创建农药
      */
     public function createPesticide()
     {
         $id = array_unique((array)I('id', 0));
         if (count(array_intersect(explode(',', C('USER_ADMINISTRATOR')), $id)) > 0) {//管理员验证
             $this->error('_DO_NOT_ALLOW_THE_SUPER_ADMINISTRATOR_TO_PERFORM_THE_OPERATION_');
         }
         $id = is_array($id) ? implode(',', $id) : $id;
         if (empty($id)) {
             $this->meta_title = '新增农药';
             $this->assign('pesticide', array('pesticideId' => null, 'pesticideName' => null, 'useNumber' => null, 'activePrinciple' => null,'activePrinciple_p' => null,'adsorptionCoeff' => null,'halfTime' => null));
             $this->assign('title','新增农药');
             }else{
             $pesticide=D('Pesticide')->where(array('pesticideId' => $id))->select();
             $pesticide=$pesticide[0];
             $this->meta_title = '编辑农药';
             $this->assign('pesticide',$pesticide);
         }
         $this->display('editpesticide');
     }
     
     /**
      * 编辑农药
      *
      */
     public function writePesticide()
     {
         $Pesticide = D('Pesticide');
         $data = $Pesticide->create();
         if ($data) {
             $data->pesticideId=I('post.pesticideId');
             $data->pesticideName=I('post.pesticideName');
             $data->useNumber=I('post.useNumber');
             $data->activePrinciple=I('post.activePrinciple');
             $data->activePrinciple_p=I('post.activePrinciple_p');
             $data->adsorptionCoeff=I('post.adsorptionCoeff');
             $data->halfTime=I('post.halfTime');
             $data->createTime=date("Y-m-d H:i:s",time());
             if (empty($data['pesticideId'])) {
                 $r = $Pesticide->add($data);
             } else {
                 $r = $Pesticide->save($data);
             }
             if ($r === false) {
                 $this->error(L('_FAIL_OPERATE_') . $Pesticide->getError());
             } else {
                 $this->success('操作成功!');
             }
         } else {
             $this->error(L('_FAIL_OPERATE_') . $Pesticide->getError());
         }
     }


}
