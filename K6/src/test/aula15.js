//default
import http from 'k6/http';

//remoto
//https://jslib.k6.io/
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js'

//local
import runTest from './test1.js'

export default function () {
    const req = http.get('http://test.k6.io/');
    sleep(1);

    check(req, {
        'status é 200': (r) => r.status === 200
    });
}