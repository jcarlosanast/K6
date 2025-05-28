// execucação codigo
export default function () {
    console.log('testando o k6')
    sleep(1);
}

//desmontagem
export function teardown(data) {
    console.log(data)
}

