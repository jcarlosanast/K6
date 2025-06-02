import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    threshold4git: {
        //Limite que a requisição atenda
        http_req_failed: ['rate <0.01'],
        // valor de limite /intervalor esperado que a requisição atenda
        // http_req_duration: ['p(95) < 200']

        // aborta quando for diferente do valor esperado
        // http_req_duration: [{ threshold: 'p(95) < 200', abortOnFail: true }]

        // aborta quando for diferente do valor esperado com Delay para não ser abortado diretamente
        http_req_duration: [{ threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10s' }],
        //podemos colocar checks também no delay
        checks: ['rate > 0.99']

    }
}

export default function () {
    const req = http.get('http://test.k6.io/')

    check(req, {
        'status code é 200': (r) => r.status === 200
    });

}