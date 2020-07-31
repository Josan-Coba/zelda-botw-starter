const s3 = require('@auth0/s3')

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = process.env

var client = s3.createClient({
  s3Options: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1',
  },
})

const uploader = client.uploadDir({
  deleteRemoved: true,
  localDir: './build',
  s3Params: {
    Bucket: BUCKET_NAME,
    Prefix: '',
  },
})

uploader.on('error', function (err) {
  console.error(err)
})

uploader.on('end', function () {
  console.log('Finished deploy')
})
