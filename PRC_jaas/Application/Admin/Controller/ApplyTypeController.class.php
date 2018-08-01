<?php

namespace Admin\Controller;

use Admin\Model\AuthGroupModel;
use User\Api\UserApi as UserApi;

/**
 * 施药方式管理控制器
 * @author 房焜
 */
class ApplyTypeController extends AdminController
{

    /**
     * 后台首页
     * @author 房焜
     */
    public function index()
    {
         $map['status'] = array('egt', 0);
         $list = $this->lists('Applytype', $map);//初首字母外都小写
         int_to_string($list);
         $this->assign('_list', $list);
         $this->meta_title = L('_INDEX_MANAGE_');
         $this->display();
     }
     /**
      * 施药方式状态修改
      * @author 房焜
      */
     public function changeStatus($method = null)
     {
         $id = array_unique((array)I('id', 0));
         $id = is_array($id) ? implode(',', $id) : $id;
         if (empty($id)) {
             $this->error('PLEASE_CHOOSE_TO_OPERATE_THE_DATA');
         }
         $map['applyId'] = array('in', $id);
         switch (strtolower($method)) {
             case 'forbidp':
                 $this->forbid('Applytype', $map);
                 break;
             case 'resumep':
                 $this->resume('Applytype', $map);
                 break;
             case 'deletep':
                 $this->delete('Applytype', $map);
                 break;
             default:
                 $this->error(L('_ILLEGAL_'));
                 
         }
         
     }
     /**
      * 创建施药方式
      */
     public function createApplyType()
     {
         $id = array_unique((array)I('id', 0));
         if (count(array_intersect(explode(',', C('USER_ADMINISTRATOR')), $id)) > 0) {//管理员验证
             $this->error('_DO_NOT_ALLOW_THE_SUPER_ADMINISTRATOR_TO_PERFORM_THE_OPERATION_');
         }
         $id = is_array($id) ? implode(',', $id) : $id;
         if (empty($id)) {
             $this->meta_title = '新增施药方式';
             $this->assign('applyType', array('applyId' => null, 'applyName' => null, 'deepth' => null));
             $this->assign('title','新增施药方式');
             }else{
             $applyType=D('Applytype')->where(array('applyId' => $id))->select();
             $applyType=$applyType[0];
             $this->meta_title = '编辑施药方式';
             $this->assign('applyType',$applyType);
         }
         $this->display('editapplyType');
     }
     
     /**
      * 编辑施药方式
      *
      */
     public function writeApplyType()
     {
         $ApplyType = D('Applytype');
         $data = $ApplyType->create();
         if ($data) {
             $data->applyId=I('post.applyId');
             $data->applyName=I('post.applyName');
             $data->deepth=I('post.deepth');
             $data->createTime=date("Y-m-d H:i:s",time());
             if (empty($data['applyId'])) {
                 $r = $ApplyType->add($data);
             } else {
                 $r = $ApplyType->save($data);
             }
             if ($r === false) {
                 $this->error(L('_FAIL_OPERATE_') . $ApplyType->getError());
             } else {
                 $this->success('操作成功!');
             }
         } else {
             $this->error(L('_FAIL_OPERATE_') . $ApplyType->getError());
         }
     }


}
