<?php

namespace Admin\Model;
use Think\Model;

/**
 * 农药模型
 * @author 房焜
 */

class SoilModel extends Model {

    protected $_validate = array(
        array('soilName', 'require', '土壤名称不能为空。'),
        
        array('soilCoeff', 'require', '土壤系数不能为空。'),
        array('soilCoeff', 'number', '土壤系数应为数字。'),
        array('soilDensity', 'require', '土壤密度不能为空。'),
        array('soilDensity', 'number', '土壤密度例应为数字。'),
        
    );
    
    protected $_auto = array(
        array('create_time', NOW_TIME, self::MODEL_INSERT),
        array('status', '1', self::MODEL_BOTH),
    );
    
    public function lists($status = 1, $order = 'uid DESC', $field = true){
        $map = array('status' => $status);
        return $this->field($field)->where($map)->order($order)->select();
    }

    
    public function getNickName($uid){
        return $this->where(array('uid'=>(int)$uid))->getField('nickname');
    }


}
