import http from 'k6/http';
import { check } from 'k6';

// inclusão de métricas personalizadas
//https://grafana.com/docs/k6/latest/using-k6/metrics/create-custom-metrics/
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const myRate = new Rate('taxa_req_200')
const myTrend = new Trend('taxa_de_espera')

export default function () {
    const req = http.get('http://test.k6.io/')
    chamadas.add(1);
    myGauge.add(req.timings.blocked);
    myRate.add(req.status === 200)
    // quando tmepo a requisição esperou para ser realizada
    myTrend.add(req.timings.waiting)
}