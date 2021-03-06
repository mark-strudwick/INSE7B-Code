'use scrict';

const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

app.use(express.static(path.join(__dirname + '/webpages')));

var sqlconnect =  mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'inseDB'
  });

// starts the server
app.listen(8080, (err) => {
  if (err) console.error('Error starting server', err);
  else console.log('Server started on port 8080');
});

app.get('/longitude', function (req, res) {
        sqlconnect.query('select shop_Longitude from inseDB.Shop', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });

app.get('/latitude', function (req, res) {
        sqlconnect.query('select shop_Latitude from inseDB.Shop', function(err, recordset) {
          if(err) console.log(err);
          res.end(JSON.stringify(recordset)); // Result in JSON format
      });
  });

app.get('/barber/:barbid', function (req, res) {
        sqlconnect.query('SELECT * FROM inseDB.Shop where shopID = ?', req.params.barbid, function(err, recordset) {
          if(err) console.log(err);
          res.end(JSON.stringify(recordset)); // Result in JSON format
      });
  });
app.get('/custAdd/:barbid', function (req, res) {
        sqlconnect.query('UPDATE Shop SET shop_Customers = shop_Customers + 1 WHERE shopID = ?', req.params.barbid, function(err, recordset) {
          if(err) console.log(err);
          res.end(JSON.stringify(recordset)); // Result in JSON format
      });
  });

app.get('/custRem/:barbid', function (req, res) {
        sqlconnect.query('UPDATE Shop SET shop_Customers = shop_Customers - IF(shop_Customers > 0, 1, 0) WHERE shopID = ?', req.params.barbid, function(err, recordset) {
          if(err) console.log(err);
          res.end(JSON.stringify(recordset)); // Result in JSON format
      });
  });
app.get('/workAdd/:barbid', function (req, res) {
        sqlconnect.query('UPDATE Shop SET shop_Barbers = shop_Barbers + 1 WHERE shopID = ?', req.params.barbid, function(err, recordset) {
          if(err) console.log(err);
          res.end(JSON.stringify(recordset)); // Result in JSON format
      });
  });

app.get('/workRem/:barbid', function (req, res) {
        sqlconnect.query('UPDATE Shop SET shop_Barbers = shop_Barbers - IF(shop_Barbers > 0, 1, 0) WHERE shopID = ?', req.params.barbid, function(err, recordset) {
          if(err) console.log(err);
          res.end(JSON.stringify(recordset)); // Result in JSON format
      });
  });
// var result = [];
// var  getLatitudeFromDB = function(callback) {
//
// sqlconnect.query('SELECT shop_Latitude FROM Shop', function(err, res, fields)
// {
//     if (err)  return callback(err);
//      if(res.length){
//     for(var i = 0; i<res.length; i++ ){
//                     result.push(res[i]);
//         }
//      }
//    callback(null, result);
// });
// };
// var  getLongitudeFromDB = function(callback) {
// sqlconnect.query('SELECT shop_Longitude FROM Shop', function(err, res, fields)
// {
//     if (err)  return callback(err);
//      if(res.length){
//     for(var i = 0; i<res.length; i++ ){
//                     result.push(res[i]);
//         }
//      }
//    callback(null, result);
// });
// };
//
// console.log("Call shop_Latitude");
// getLatitudeFromDB(function (err, result) {
//   if (err) console.log("Database error!");
//   else console.log(result);
// });


//console.log("Call shop_Longitude");
//getLongitudeFromDB(function (err, result) {
//  if (err) console.log("Database error!");
//  else console.log(result);
//});
