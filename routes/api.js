var express = require('express');
var app = express();
var router = express.Router();
var pool = require('../config/dbPool');
var main_buttons = require('../models/main_buttons');
var bd = require('../models/bridge');
var menu = require('../models/restaurant_buttons')

// 사용자가 최초로 채팅방에 들어올 때 키보드 영역에 표시될 자동 응답 명령어 목록 호출
router.get('/keyboard', function(req, res){
 main_buttons.mb(function(err,result){
      if(err){
        res.status(500).json({
        message : "error"
        });
      }else{
        res.status(200).json({
          type : "buttons",
          buttons : result
        });
    }
  })
});

// 사용자의 입력을 처리하여 응답
router.post('/message', function(req, res){
  // var user_key = req.body.user_key;
  // var type = req.body.type;
  var content = req.body.content;
  // 버튼 선택 옵션 정리
  console.log('1content',content)
  bd.bridge(content,function(err, result){
    console.log('2content',content)
    if(err){
      res.status(500).json({
        message : "error"
        });
    }else{
      res.status(200).json(result);
    }
  })

});
/*
// 사용자가 친구추가 했을 경우
router.post('/friend', function(req, res){
  var user_key = req.body.user_key;

  res.status(200).json();
});

// 사용자가 친구삭제 했을 경우
router.delete('/friend/:user_key', function(req, res){
  var user_key = req.params.user_key;
  //console.log(user_key + "가 친구 삭제");

  res.status(200).json();
});

// 사용자가 채팅방을 나갔을 경우
router.delete('/chat_room/:user_key', function(req, res){
  var user_key = req.params.user_key;
  //console.log(user_key + "가 채팅방 나감");

  res.status(200).json();
});
*/
module.exports = router;