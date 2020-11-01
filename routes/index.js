var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const ExamModel = require('./models/exams');

/* GET home page. */
router.get('/get-configs/:id', function(req, res, next) {
  ExamModel.findOne({examId: req.params.id}, (err, data) => {
    if(err) {
      res.status(404).jsonp({success: false});
    } else {
      if (data) {
        res.status(200).jsonp({
          success: true,
          nameSelector: '.d-inline-block.dropdown-toggle.icon-no-margin',
          ...data._doc
        })
      } else {
        res.status(404).jsonp({success: false});
      }
    }
  });
});

router.post('/push-images', function(req, res, next) {
  const ext = req.body.base64.split(';')[0].match(/jpeg|png|gif/)[0];
  const data = req.body.base64.replace(/^data:image\/\w+;base64,/, '');
  const name = req.body.name;

  fs.writeFile(path.join(__dirname, '../public/images/' + name + '.' + ext), data, 'base64', (err) => {
    console.log('image save', err);
  });
  res.jsonp({success: true});
});

router.post('/create-exam', (req, res, next) => {
  const exam = new ExamModel(req.body);
  ExamModel.find({examId: req.body.examId}, (err, data) => {
    if(err || data.length > 0) {
      res.status(400).jsonp({success: false, err, data});
    } else {
      exam.save((err, data) => {
        if(err) {
          res.status(400).jsonp({success: false, err});
        } else {
          res.status(200).jsonp({success: true, newExam: data});
        }
      })
    }
  })
});

router.get('/get-exams', (req, res, next) => {
  ExamModel.find((err, data) => {
    if(err) {
      res.jsonp({success: false, data: []});
    } else {
      res.jsonp({success: true, data});
    }
  })
});

router.delete('/delete-exam/:id', (req, res, next) => {
  ExamModel.findByIdAndDelete(req.params.id, {}, (err, data)=> {
    if(err) {
      res.status(400).jsonp({success: false});
    } else {
      res.status(200).jsonp({success: true});
    }
  } );
});

router.get('/all-images', (req, res, next) => {
  fs.readdir(path.join(__dirname, '../public/images/'), function(err, filenames) {
    if (err) {
      res.status(500).jsonp({success: false});
      return;
    }
    res.status(200).jsonp({success: true, filenames})
    // filenames.forEach(function(filename) {
    //   fs.readFile(dirname + filename, 'utf-8', function(err, content) {
    //     if (err) {
    //       onError(err);
    //       return;
    //     }
    //     onFileContent(filename, content);
    //   });
    // });
  });
})

module.exports = router;
