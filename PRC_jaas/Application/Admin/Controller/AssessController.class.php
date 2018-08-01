<?php

namespace Admin\Controller;



/**
 * 农药管理控制器
 * @author 房焜
 */
class AssessController extends AdminController
{

    /**
     * 后台首页
     * @author 房焜
     */
    public function index()
    {
        /*          $map['status'] = array('egt', 0);

         $list = $this->lists('Assess', $map);
         int_to_string($list);
         $this->assign('_list', $list); */
         $this->meta_title = L('_INDEX_MANAGE_');
         $this->display();
     }




}
