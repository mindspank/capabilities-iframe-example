import angular from 'angular'
import enigma from 'enigma.js'
import schema from '../../node_modules/enigma.js/schemas/12.170.2.json'


let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
}

class AppCtrl {
  constructor() {
    this.qlikConfig = {
        host: 'branch.qlik.com/anon',
        app: 'daee0772-57ce-4767-a200-f3ffafcf71aa'
    },
    // enigma connection
    this.engine = enigma.create({
        schema,
        url: `wss://${this.qlikConfig.host}/app/${this.qlikConfig.app}`,
        createSocket: url => new WebSocket(url),
    })
    .open()
    .then(global => {
        return global.openDoc(this.qlikConfig.app)
    })
    // execute a simple action to the engine
    this.action = (method) => {
        return this.engine.then(app => {
            return app[method]()
        })
    }
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;