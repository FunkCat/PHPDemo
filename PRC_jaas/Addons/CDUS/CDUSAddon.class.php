<?php

namespace Addons\CDUS;
use Common\Controller\Addon;

/**
 * 基础数据管理插件
 * @author 房焜
 */

    class CDUSAddon extends Addon{

        public $info = array(
            'name'=>'CDUS',
            'title'=>'基础数据管理',
            'description'=>'对于基础数据进行增删改查。',
            'status'=>1,
            'author'=>'房焜',
            'version'=>'0.1'
        );

        public function install(){
            return true;
        }

        public function uninstall(){
            return true;
        }

        //实现的report钩子方法
        public function report($param){

        }

    }