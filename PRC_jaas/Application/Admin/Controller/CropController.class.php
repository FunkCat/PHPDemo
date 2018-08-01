<?php

namespace Admin\Controller;

use Admin\Model\AuthGroupModel;
use User\Api\UserApi as UserApi;

/**
 * 作物管理控制器
 * @author 房焜
 */
class CropController extends AdminController
{

    /**
     * 后台首页
     * @author 房焜
     */
    public function index()
    {
         $map['status'] = array('egt', 0);

         $list = $this->lists('Crop', $map);
         int_to_string($list);
         $this->assign('_list', $list);
         $this->meta_title = L('_INDEX_MANAGE_');
         $this->display();
     }
     /**
      * 作物状态修改
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
         $map['cropId'] = array('in', $id);
         switch (strtolower($method)) {
             case 'forbidp':
                 $this->forbid('Crop', $map);
                 break;
             case 'resumep':
                 $this->resume('Crop', $map);
                 break;
             case 'deletep':
                 $this->delete('Crop', $map);
                 break;
             default:
                 $this->error(L('_ILLEGAL_'));
                 
         }
         
     }
     /**
      * 创建作物
      */
     public function createcrop()
     {
         $id = array_unique((array)I('id', 0));
         if (count(array_intersect(explode(',', C('USER_ADMINISTRATOR')), $id)) > 0) {//管理员验证
             $this->error('_DO_NOT_ALLOW_THE_SUPER_ADMINISTRATOR_TO_PERFORM_THE_OPERATION_');
         }
         $id = is_array($id) ? implode(',', $id) : $id;
         if (empty($id)) {
             $this->meta_title = '新增作物';
             $this->assign('crop', array('cropId' => null, 'cropName' => null, 'projectedArea' => null, 'remarks' => null));
             $this->assign('title','新增作物');
             }else{
             $crop=D('crop')->where(array('cropId' => $id))->select();
             $crop=$crop[0];
             $this->meta_title = '编辑作物';
             $this->assign('crop',$crop);
         }
         $this->display('editcrop');
     }
     
     /**
      * 编辑作物
      *
      */
     public function writecrop()
     {
         $crop = D('crop');
         $data = $crop->create();
         if ($data) {
             $data->cropId=I('post.cropId');
             $data->cropName=I('post.cropName');
             $data->projectedArea=I('post.projectedArea');
             $data->remarks=I('post.remarks');
             $data->createTime=date("Y-m-d H:i:s",time());
             if (empty($data['cropId'])) {
                 $r = $crop->add($data);
             } else {
                 $r = $crop->save($data);
             }
             if ($r === false) {
                 $this->error(L('_FAIL_OPERATE_') . $crop->getError());
             } else {
                 $this->success('操作成功!');
             }
         } else {
             $this->error(L('_FAIL_OPERATE_') . $crop->getError());
         }
     }


}
