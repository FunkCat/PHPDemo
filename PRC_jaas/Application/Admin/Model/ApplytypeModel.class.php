<?php

namespace Admin\Model;
use Think\Model;

/**
 * 施药方式模型
 * @author 房焜
 */

class ApplytypeModel extends Model {

    public function lists($status = 1, $order = 'applyId DESC', $field = true){
        $map = array('status' => $status);
        //$result=$this->field($field)->where($map)->order($order)->select();
        $result=$this->select();
        return $result;
    }


}
