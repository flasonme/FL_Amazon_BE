// import cluster from 'cluster'
// import * as os from 'os'

import App from '@/app';
import {AuthRoute, ImageRoute, IndexRoute, UsersRoute} from '@/routes';
import { validateEnv } from '@/utils';

new validateEnv();

// const cpuCount = os.cpus().length;
// const webWorkers: any[] = [];
// if (cluster.isPrimary) {
    // Create a worker for each CPU
    // for (let i = 0; i < cpuCount; i += 1) {
        // addJobWorker();
    //     addWebWorker();
    // }
    // cluster.on('exit', (worker, code, signal) => {
        // if (jobWorkers.indexOf(worker.id) != -1) {
        //     console.log('job worker ' + worker.process.pid + ' died. Trying to respawn...');
        //     removeJobWorker(worker.id);
        //     addJobWorker();
        // }
    //     if (webWorkers.indexOf(worker.id) != -1) {
    //         logger.info('Worker ' + worker.process.pid + ' died. Trying to respawn...');
    //         removeWebWorker(worker.id.toString());
    //         addWebWorker();
    //     }
    // });
// } else {
    // if (process.env.job) {
    //     console.log('start job server: ' + cluster.worker.id);
    //     require('./worker');//initialize the agenda here
    // }
    // if (process.env.web) {
        const app = new App([
            new IndexRoute(),
            new UsersRoute(),
            new AuthRoute(),
            new ImageRoute()
        ]);
        app.listen();
        // logger.info('Worker ' + cluster.worker.id + ' started');
    // }
// }
// function addWebWorker() {
//     webWorkers.push(cluster.fork({web: 1}).id);
// }
// function removeWebWorker(id: string) {
//     webWorkers.splice(webWorkers.indexOf(id), 1);
// }
// function addJobWorker() {
//     webWorkers.push(cluster.fork({job: 1}).id);
// }
// function removeJobWorker(id: string) {
//     webWorkers.splice(webWorkers.indexOf(id), 1);
// }
//
// const app = new App([new AuthRoute(), new UsersRoute(), new IndexRoute()]);
//
// app.listen();
