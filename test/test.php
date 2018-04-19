<?php
    if(!empty($_FILES)){
        //echo "来了";
       // moveFile();
       // print_r($_FILES);
        $arr = array();
        foreach ($_FILES as $value) {
            # code...
            //print_r($value['name'].'aaaa');
            //print_r($value['tmp_name']);

            $path = 'fonts/'.$value['name'];
            
            if(move_uploaded_file($value['tmp_name'], $path)){
                array_push($arr, $path);
            }else{
                print_r(11111);
            }
        }
        print_r(json_encode($arr));
    }

?>