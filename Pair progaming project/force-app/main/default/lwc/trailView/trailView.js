import { api, LightningElement, wire } from 'lwc';
import trail from '@salesforce/apex/jsController.trail';
import {calcularProgreso} from './trailViewProgreso';

export default class TrailView extends LightningElement {
    @api recordId;
    name;
    time;
    description;
    points;
    progress = 0;
    error = undefined;
    modulos;
    checkmodule;
    checkunit;

    @wire(trail, { idTr: '$recordId' })
    trail(Result) {
        const { data, error } = Result;
        if (data) {
            //console.log(data);
            this.name = data.trail.Name;
            this.time = data.trail.Tiempo_Total__c;
            this.description = data.trail.Description__c;
            this.points = data.trail.Puntos_Total__c;
            this.progress = calcularProgreso(data.passedUnitIds, data.trail.CantU__c);
            this.modulos = data.modules;
            this.checkmodule = data.passedModuleIds;
            this.checkunit = data.passedUnitIds;
        } else if (error) {
            this.trailWrapper = undefined;
            this.error = error;
        }
    }
}