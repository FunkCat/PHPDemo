<?php

namespace Admin\Model;
use Think\Model;

/**
 * 农药模型
 * @author 房焜
 */

class PesticideModel extends Model {
    protected $_validate = array(

        array('useCount', 'require', '使用量不能为空。'),
        array('useNumber', 'number', '使用量应为数字。'),
        
        array('activePrinciple', 'require', '有效成分名不能为空。'),
        
        array('activePrinciple_p', 'require', '有效成分比例不能为空。'),
        array('activePrinciple_p', 'number', '有效成分比例应为数字。'),
        
        array('adsorptionCoeff', 'require', '土壤系数不能为空。'),
        array('adsorptionCoeff', 'number', '土壤系数应为数字。'),
        
        array('halfTime', 'require', '土壤半衰期不能为空。'),
        array('halfTime', 'number', '土壤半衰期应为数字。'),
        
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
