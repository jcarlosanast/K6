import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    threshold4git : {
        //Limite que a requisição atenda
        http_req_failed: ['rate <0.01'],
        // valor de limite /intervalor esperado que a requisição atenda
        http_req_duration: ['p(95) < 200']
    }
}

export default function () {
    const req = http.get('http://test.k6.io/')

    check(res, {
        'status code é 200': (r) => r.status === 200
    });

}