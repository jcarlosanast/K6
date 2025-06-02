import { check, group } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '3s',
    //ajuda a identificar o testes em caso de um classe muito grande de requests
    tags:{
        name: 'Meu Teste'
    },
    //criando um pareametor para havaliar apenas uma Tag - Onde [p] é de percentil - podemos definir um limite por tag
    thresholds:{
        'http_req_duration{tipo:busca-todos}':['p(95) < 500']
    }
}

export default function () {
    group('exemple post', function () {
        const res = http.get('http://test-api.k6.io/public/crocodiles/', {
            //passando Tags no request, a tag ajuda a definir uma determinada metrica
            //a TAG pode ser utilizada em todos os parametros
            tags: {
                tipo: "busca-Todos"
            }
        });
        check(res, {
            'is status 200': (r) => r.status === 200
        });
    });

    //grupo para identificar em um report ou arquivo salvo quais requisição pertece
    group('exemple post id', function () {
        const res2 = http.get('http://test-api.k6.io/public/crocodiles/1/');
        check(res2, {
            'status code 200 get all': (r) => r.status === 200
        });

    });


}