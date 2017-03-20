var Color = require('color');
var mp = require('material-palette');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var router = express.Router();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'bower_components')));

app
    .get("/colors/:color", function (req,res,next) {
        var primary = req.params.color;
        if(primary){
           var color = Color("#"+primary);
           var newColor = color;
            while(mp(newColor.hsl().object())["50"].l == 100){
                newColor = newColor.darken(0.05);
            }
            while(mp(newColor.hsl().object())["900"].l < 10){
                newColor = newColor.lighten(0.1);
            }
           var palette = mp(newColor.hsl().object());
           palette.accent = newColor.rotate(180).object();
           palette.accentDark = newColor.rotate(180).darken(0.4).object();
           palette.primaryText = Color("#212121").hsl().object();
           palette.secondaryText = Color("#757575").hsl().object();
           palette.divider = Color("#bdbdbd").hsl().object();
           palette.text = Color("#ffffff").hsl().object();
           res.json(palette);
        }
    });

app.listen('8080', function () {
   console.log('colorizr is running on http://localhost:8080');
});