import {
    computed,
    observable,
    observe,
} from 'mobx';
import Reader from '~caml-js/Reader';
import RecordsFactory from '~caml-js/RecordsFactory';
import Record from '~caml-js/Record';
import * as util from '~caml-js/util';

export default class {
    reader: Reader;
    records: any;
    disposer: any;
    @observable reducers: any = [];

    constructor() {
        this.reader = new Reader();
        this.records = RecordsFactory.create();
        this.disposer = observe(this.reader.lines, (delta: any) => {
            this.records.load(delta.object);
        });
    }
    close() {
        this.disposer();
    }
    @computed get currentRecords() {
        let records: any[] = this.records;
        for(let reducer of this.reducers) {
            records = reducer(records);
        }
        return records; 
    }
    @computed get lines() {
       let lines: string[] = [];
        for(let record of this.currentRecords) {
            const htmlLines = record.lines.map((line: string) => {
                const uris = util.matchUris(line);
                return uris.reduce((line: any, uri: any) => {
                    return line.replace(
                        uri,
                        '<a ' +
                        'target="blank" ' +
                        'rel="noopener noreferrer" ' +
                        `href=${uri}>${uri}</a>`
                    );
                }, line);
            });
            for(let img of record.images) {
                htmlLines.unshift(
                    '<img ' +
                    `style="display: block; margin: 20px" ` +
                    'width="400px" ' +
                    `src=${img} />`
                );
            }
            for(let uri of record.videos) {
                htmlLines.unshift(
                    '<video ' +
                    `style="display: block; margin: 20px" ` +
                    'controls ' +
                    'loop ' +
                    'width="480px" ' +
                    `src=${uri} />`
                );
            }
            lines = lines.concat(htmlLines);
        } 
        return lines;
    }
    readText(text: string) {
        for(let i = 0; i < text.length; i++) {
            const char = text.substr(i, 1);
            this.reader.read(char);
        }
        this.reader.end();
    }
    addReducer(reducer: any) {
        this.reducers.push(reducer);
    }
}
