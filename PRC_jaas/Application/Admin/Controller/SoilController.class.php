<?php

namespace Admin\Controller;

use Admin\Model\AuthGroupModel;
use User\Api\UserApi as UserApi;

/**
 * 土壤管理控制器
 * @author 房焜
 */
class SoilController extends AdminController
{

    /**
     * 后台首页
     * @author 房焜
     */
    public function index()
    {
         $map['status'] = array('egt', 0);

         $list = $this->lists('Soil', $map);
         int_to_string($list);
         $this->assign('_list', $list);
         $this->meta_title = L('_INDEX_MANAGE_');
         $this->display();
     }
     /**
      * 土壤状态修改
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
         $map['soilId'] = array('in', $id);
         switch (strtolower($method)) {
             case 'forbidp':
                 $this->forbid('Soil', $map);
                 break;
             case 'resumep':
                 $this->resume('Soil', $map);
                 break;
             case 'deletep':
                 $this->delete('Soil', $map);
                 break;
             default:
                 $this->error(L('_ILLEGAL_'));
                 
         }
         
     }
     /**
      * 创建土壤
      */
     public function createSoil()
     {
         $id = array_unique((array)I('id', 0));
         if (count(array_intersect(explode(',', C('USER_ADMINISTRATOR')), $id)) > 0) {//管理员验证
             $this->error('_DO_NOT_ALLOW_THE_SUPER_ADMINISTRATOR_TO_PERFORM_THE_OPERATION_');
         }
         $id = is_array($id) ? implode(',', $id) : $id;
         if (empty($id)) {
             $this->meta_title = '新增土壤';
             $this->assign('soil', array('soilId' => null, 'soilName' => null,'soilCoeff' => null,'soilDensity' => null));
             $this->assign('title','新增土壤');
             }else{
             $soil=D('Soil')->where(array('soilId' => $id))->select();
             $soil=$soil[0];
             $this->meta_title = '编辑土壤';
             $this->assign('soil',$soil);
         }
         $this->display('editsoil');
     }
     
     /**
      * 编辑土壤
      *
      */
     public function writeSoil()
     {
         $Soil = D('Soil');
         $data = $Soil->create();
         if ($data) {
             $data->soilId=I('post.soilId');
             $data->soilName=I('post.soilName');
             $data->soilCoeff=I('post.soilCoeff');
             $data->soilDensity=I('post.soilDensity');
             $data->createTime=date("Y-m-d H:i:s",time());
             if (empty($data['soilId'])) {
                 $r = $Soil->add($data);
             } else {
                 $r = $Soil->save($data);
             }
             if ($r === false) {
                 $this->error(L('_FAIL_OPERATE_') . $Soil->getError());
             } else {
                 $this->success('操作成功!');
             }
         } else {
             $this->error(L('_FAIL_OPERATE_') . $Soil->getError());
         }
     }


}
