module.exports = {
   "development": {
     "username": process.env.DB_USER,
     "password": process.env.DB_PASS,
     "database": "face_recognitionDB",
     "host": "127.0.0.1",
     "dialect": "mysql"
   },
  "test": {
    "username": "root",
    "password": "rafa",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": 'mysql://toj1ammqdwc2hcm1:s3zrzd30wq7e5upf@g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/v4kmzvc0u5khw6r3',
    "dialect": "mysql"
  }
}
