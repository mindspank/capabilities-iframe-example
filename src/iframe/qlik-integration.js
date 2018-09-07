import qlik from 'qlik'
import queryString from 'query-string'

const parsed = queryString.parse(location.search);

if(parsed.app && parsed.object) {
    const app = qlik.openApp(parsed.app, {
        host: 'branch.qlik.com',
        isSecure: true,
        port: 443,
        prefix: '/anon/'
    })

    app.visualization.get(parsed.object)
    .then((objectModel) => {
        objectModel.show('qlikobject')
    })
    .catch(error => {
        // do something
    })

}