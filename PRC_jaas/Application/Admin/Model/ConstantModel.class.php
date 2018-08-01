<?php

namespace Admin\Model;
use Think\Model;

/**
 * 农药模型
 * @author 房焜
 */

class ConstantModel extends Model {
    protected $_validate = array(

        array('useCount', 'require', '默认农药使用次数不能为空。'),
        array('useCount', 'number', '默认农药使用次数应为数字。'),
        
        array('estimateDays', 'require', '默认估算天数不能为空。'),
        array('estimateDays', 'number', '默认估算天数应为数字。'),
       
        
    );
    
    protected $_auto = array(
        array('create_time', NOW_TIME, self::MODEL_INSERT),
        array('status', '1', self::MODEL_BOTH),
    );
    public function lists(){
        return $this->select();
    }
    
}
